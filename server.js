// Same-origin API and local web server. Run with `npm start`.
// The live scan reads only the employer career links in app.js and links from those pages.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const root = __dirname;
const port = Number(process.env.PORT || 8787);
const ttlMs = 5 * 60 * 1000;
const minRefreshIntervalMs = 60 * 1000;
let cache = { checkedAt: null, checkedSources: 0, failedSources: 0, checkedRecruitmentLinks: 0, employers: [], jobs: [], note: 'No live check has run yet.' };
let refreshPromise = null;

function unescapeHtml(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function plainText(value) {
  return unescapeHtml(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ').trim();
}

function appData() {
  const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const jobsStart = source.indexOf('const snapshotJobs = [');
  const jobsEnd = source.indexOf('\n];', jobsStart);
  const groupStart = source.indexOf('const groups = [');
  const groupEnd = source.indexOf('\n];', groupStart);
  const jobText = source.slice(jobsStart, jobsEnd);
  const groupText = source.slice(groupStart, groupEnd);
  const field = (line, name) => {
    const match = line.match(new RegExp(`\\b${name}:'((?:\\\\.|[^'])*)'`));
    return match ? match[1].replace(/\\'/g, "'") : '';
  };
  const jobs = jobText.split('\n').filter(line => line.includes("{ org:'")).map(line => ({
    org:field(line, 'org'), employer:field(line, 'employer'), title:field(line, 'title'),
    type:field(line, 'type'), place:field(line, 'place'), area:field(line, 'area'),
    contract:field(line, 'contract'), deadline:field(line, 'deadline'), deadlineDate:field(line, 'deadlineDate'),
    id:field(line, 'id'), url:field(line, 'url'), source:field(line, 'source')
  })).filter(job => job.title && job.url);

  const groups = [];
  const groupRe = /\{ title:'([^']+)'[\s\S]*?items:\[([\s\S]*?)\]\s*\}/g;
  let match;
  while ((match = groupRe.exec(groupText))) {
    const type = /United Nations/i.test(match[1]) ? 'UN' : /NGO/i.test(match[1]) ? 'NGO' : 'IGO';
    const entries = [];
    const itemRe = /\['((?:\\.|[^'])*)','(https?:\/\/[^']+)'\]/g;
    let item;
    while ((item = itemRe.exec(match[2]))) entries.push({ name:item[1], url:item[2], type });
    groups.push(...entries);
  }
  return { jobs, groups };
}

const internWords = /\b(intern(?:ship)?s?|trainee(?:ship)?s?|stagiaire|stage|practicum|apprentice|graduate internship)\b/i;
const explicitInternshipType = /\b(?:employment|position|job|contract)\s+type\s*:?\s*(?:intern(?:ship)?|trainee(?:ship)?|stagiaire|stage)\b|\btype of contract\s*:?\s*(?:intern(?:ship)?|trainee(?:ship)?|stagiaire|stage)\b/i;
const nonVacancyTitles = /\b(testimonials?|internship positions?|internship vacancies|internship programmes?|internship programs?|(?:internship|traineeship) (?:programme|program) (?:manager|specialist|officer|coordinator)|administrative instruction|internship agreement|factsheet|what'?s new|explore (?:the )?internship|career coaching|opportunities for young professionals|internships? abroad|how to apply|programme information|program information|apply now|learn more|view (?:job|vacancy)|job details|read more)\b/i;
const detailPath = new RegExp('(?:/job(?:s)?/|/requisition/|/vacanc(?:y|ies)/|/jobdetail(?:\\.ftl|/)|/jobopeningdescription/|/jobsearchdescription/|/posting/|/job-details?/|/jobdetails?/|/positiondetails?/)', 'i');
const detailQuery = /(?:[?&](?:job|jobid|requisition|req|postingid|vacancyid)=)/i;
const regionLocations = {
  Switzerland:/\b(switzerland|suisse|schweiz|geneva|gen[eè]ve|bern|berne|zurich|z[üu]rich|basel|b[âa]le|lausanne|nyon|fribourg|neuch[âa]tel|montreux|lugano|winterthur|lucerne|luzern|st[\s.-]?gallen|zug)\b/i
};
const remoteWork=/\b(remote|home[- ]based|home based|work from anywhere|distributed)\b/i;
const otherCountryLocations=/\b(nairobi|new york|montreal|toronto|washington(?:,? dc)?|bangkok|paris|rome|brussels|london|vienna|madrid|singapore|beijing|addis ababa|amman|cairo|dakar|maputo|kabul|dhaka|jerusalem|spain|france|united states|united kingdom|kenya|thailand|india|germany|italy|belgium|austria|netherlands|canada|senegal|bangladesh)\b/i;
const closedWords = /job opening is no longer available|vacancy is closed|this job has expired|position has been filled|job is closed|404 not found/i;
const concurrency = 24;

async function mapLimit(items, limit, worker) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length:Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      try { out[index] = await worker(items[index], index); }
      catch (error) { out[index] = { error:String(error) }; }
    }
  }));
  return out;
}

async function fetchPage(url) {
  const response = await fetch(url, {
    redirect:'follow',
    signal:AbortSignal.timeout(6500),
    headers:{ 'User-Agent':'Mozilla/5.0 (compatible; SwissInternJob/1.0; internship vacancy discovery)', 'Accept':'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8' }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { url:response.url, text:await response.text() };
}

function locationFrom(text) {
  for (const [country, pattern] of Object.entries(regionLocations)) {
    const match=text.match(pattern);
    if (match) return { place:`${match[0]}, ${country}`, area:`Confirmed ${country}` };
  }
  if (remoteWork.test(text) && !otherCountryLocations.test(text)) return { place:'Remote · Swiss work location to discuss with employer', area:'Remote · confirm Swiss eligibility' };
  return null;
}

function locationAllowed(job) {
  const place=job?.place||'';
  return Object.values(regionLocations).some(pattern => pattern.test(place)) || (/\bremote\b/i.test(place) && !otherCountryLocations.test(place));
}

function internshipEvidence(title, text) {
  // A keyword elsewhere on a career page (or in a neighboring card) is not evidence
  // that this specific vacancy is an internship. Require it in the title or a labeled type field.
  return internWords.test(title) || explicitInternshipType.test(text);
}

function vacancyContext(html, anchorStart, anchorEnd) {
  const stack=[];
  const tagRe=/<\/?([a-z][\w:-]*)\b([^>]*)>/gi;
  let tag;
  while ((tag=tagRe.exec(html)) && tag.index < anchorStart) {
    const name=tag[1].toLowerCase();
    if (tag[0][1] === '/') {
      for (let i=stack.length-1;i>=0;i--) if (stack[i].name===name) { stack.length=i; break; }
      continue;
    }
    if (/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(name) || /\/$/.test(tag[2].trim())) continue;
    const card=name==='article'||name==='li'||name==='tr'||(name==='div'&&/\b(?:job|vacancy|position|requisition|opening|card|tile)\b/i.test(tag[2]));
    stack.push({name,start:tag.index,card});
  }
  const parent=[...stack].reverse().find(item=>item.card);
  if (!parent) return plainText(html.slice(Math.max(0,anchorStart-180),Math.min(html.length,anchorEnd+260)));
  const closeRe=new RegExp(`<\\/${parent.name}\\s*>`,'ig');
  closeRe.lastIndex=anchorEnd;
  const close=closeRe.exec(html);
  return plainText(html.slice(parent.start,close ? close.index : Math.min(html.length,parent.start+5000)));
}

function findCandidates(source, html) {
  const candidates = [];
  const anchorRe = /<a\b([^>]*?)href\s*=\s*(['"])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRe.exec(html))) {
    const title = plainText(match[5]);
    if (title.length < 4 || title.length > 150 || nonVacancyTitles.test(title)) continue;
    let url;
    try { url = new URL(unescapeHtml(match[3]), source.url); } catch { continue; }
    if (!/^https?:$/.test(url.protocol) || url.href === source.url || /\.(?:pdf|docx?|xlsx?)(?:$|\?)/i.test(url.href)) continue;
    if (!detailPath.test(url.pathname) && !detailQuery.test(url.href)) continue;
    const context = vacancyContext(html, match.index, anchorRe.lastIndex);
    if (!internshipEvidence(title, context)) continue;
    const location = locationFrom(`${title} ${context}`);
    if (!location) continue;
    const host = url.hostname.replace(/^www\./, '');
    candidates.push({
      org:source.name.replace(/\s*[·|].*$/, ''), employer:source.name.replace(/\s*[·|].*$/, ''),
      title, type:source.type, place:location.place, area:location.area, contract:'Internship · confirm details in official notice',
      deadline:'See official notice', deadlineDate:'9999-12-31', id:`live-${Buffer.from(url.href).toString('base64url').slice(0,22)}`,
      url:url.href, source:`Official employer page · ${host}`, liveStatus:'candidate'
    });
  }
  return candidates;
}

async function verifySnapshot(job) {
  try {
    const page = await fetchPage(job.url);
    if (closedWords.test(plainText(page.text))) return { ...job, liveStatus:'closed' };
    const body = plainText(page.text).toLowerCase();
    const titleSeen = body.includes(job.title.toLowerCase()) || (job.id && body.includes(job.id.toLowerCase()));
    return { ...job, liveStatus:titleSeen?'verified':'check details', liveCheckedAt:new Date().toISOString() };
  } catch {
    return { ...job, liveStatus:'check failed', liveCheckedAt:new Date().toISOString() };
  }
}

function isPostingDetail(job, body) {
  const titleSeen = body.toLowerCase().includes(job.title.toLowerCase());
  const vacancyEvidence = /apply(?: now| for this (?:job|position))|submit (?:your )?application|job description|employment type|contract duration|requisition(?: number| id)?|job (?:number|id)|application deadline|closing date|responsibilities/i.test(body);
  return titleSeen && vacancyEvidence && internshipEvidence(job.title, body.slice(0, 5000));
}

async function verifyCandidate(job) {
  try {
    const page = await fetchPage(job.url);
    const body = plainText(page.text);
    if (closedWords.test(body)) return null;
    if (!isPostingDetail(job, body)) return null;
    return { ...job, liveStatus:'verified', liveCheckedAt:new Date().toISOString() };
  } catch {
    return { ...job, liveStatus:'check details', liveCheckedAt:new Date().toISOString() };
  }
}

async function refresh() {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    const { jobs:snapshot, groups } = appData();
    const sourceSeen = new Set();
    const handledByUnCareers = new Set(['UN Geneva','OHCHR','UNECE','International Trade Centre','UNCTAD','OCHA','UNDRR','Universal Postal Union']);
    const sources = groups.filter(source => !handledByUnCareers.has(source.name)).filter(source => {
      try {
        const key = `${source.name}|${source.url}`;
        if (sourceSeen.has(key)) return false;
        sourceSeen.add(key);
        return true;
      } catch { return false; }
    });
    const [sourceResults, jobResults] = await Promise.all([
      mapLimit(sources, concurrency, async source => {
        const page = await fetchPage(source.url);
        return { source, candidates:findCandidates(source, page.text) };
      }),
      mapLimit(snapshot, concurrency, verifySnapshot)
    ]);
    const sourceCandidates = sourceResults.flatMap(result => result?.candidates || []);
    const today = new Date().toISOString().slice(0,10);
    const openSnapshot = jobResults.filter(job => job && locationAllowed(job) && job.liveStatus !== 'closed' && job.deadlineDate >= today);
    const seen = new Set(openSnapshot.map(job => job.url));
    const newCandidates = sourceCandidates.filter(job => !seen.has(job.url));
    const verifiedCandidates = await mapLimit(newCandidates, concurrency, verifyCandidate);
    const activeCandidates = verifiedCandidates.filter(Boolean);
    const employers = sourceResults.map((result, index) => {
      const source = result?.source || sources[index];
      const candidates = activeCandidates.filter(job => job.org === source.name);
      const recorded = source.name === 'UN Careers'
        ? openSnapshot.filter(job => job.source.startsWith('UN Careers'))
        : openSnapshot.filter(job => job.org.toLowerCase() === source.name.toLowerCase() || job.employer.toLowerCase().includes(source.name.toLowerCase()));
      const postings = [...new Map([...recorded, ...candidates].map(job => [job.url,job])).values()];
      if (result?.error) return { name:source.name, type:source.type, url:source.url, status:postings.length?'specific postings retained · source check blocked':'source blocked or unavailable', openingsFound:postings.length, titles:postings.map(job=>job.title), detail:result.error };
      if (postings.length) return { name:source.name, type:source.type, url:source.url, status:'specific vacancy postings in the board', openingsFound:postings.length, titles:postings.map(job=>job.title) };
      return { name:source.name, type:source.type, url:source.url, status:'no specific vacancy link detected on this page', openingsFound:0, titles:[] };
    });
    const failures = employers.filter(item => item.status.includes('blocked or unavailable')).length;
    const merged = [...openSnapshot, ...activeCandidates];
    const deduped = [...new Map(merged.map(job => [job.url, job])).values()];
    const checkedAt = new Date().toISOString();
    cache = {
      checkedAt, checkedSources:sources.length - failures, totalSources:sources.length,
      checkedRecruitmentLinks:sources.length, failedSources:failures, employers,
      jobs:deduped,
      note:`Checked ${sources.length - failures} of ${sources.length} recruitment links. Results are limited to international organizations and specific internship vacancies located in Switzerland, plus remote vacancies where a Swiss work location may be discussed with the employer. A vacancy must identify itself as an internship, intern, trainee or traineeship in its title or in a labeled employment-type field on the official posting; keywords elsewhere on a career page are not enough. UN Geneva, OHCHR, UNECE, ITC, UNCTAD, OCHA, UNDRR and UPU are grouped under UN Careers and are not scanned separately. General programmes and postings tied to other countries are excluded. “No vacancy link detected” does not mean the employer has no internships. Some systems require manual review.`
    };
    return cache;
  })().finally(() => { refreshPromise = null; });
  return refreshPromise;
}

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (requestUrl.pathname === '/healthz') {
    response.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8', 'Cache-Control':'no-store' });
    response.end('ok');
    return;
  }
  if (requestUrl.pathname === '/api/jobs') {
    try {
      const age=cache.checkedAt ? Date.now() - Date.parse(cache.checkedAt) : Infinity;
      const forced=requestUrl.searchParams.get('refresh') === '1';
      if (!cache.checkedAt || age > ttlMs || (forced && age > minRefreshIntervalMs)) await refresh();
      response.writeHead(200, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store' });
      response.end(JSON.stringify(cache));
    } catch (error) {
      response.writeHead(500, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store' });
      response.end(JSON.stringify({ error:'Live employer check failed', detail:String(error), ...cache }));
    }
    return;
  }
  const requestedPath = requestUrl.pathname === '/' ? '/index.html' : decodeURIComponent(requestUrl.pathname);
  const filePath = path.resolve(root, `.${requestedPath}`);
  if (!filePath.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
  fs.readFile(filePath, (error, body) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    if (filePath === path.join(root, 'index.html') && process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN) {
      const token = JSON.stringify({ token:process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN });
      const beacon = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${token}'></script>`;
      body = Buffer.from(body.toString('utf8').replace('<!-- ANALYTICS_BEACON -->', beacon));
    }
    response.writeHead(200, { 'Content-Type':mime[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(body);
  });
});

server.listen(port, '0.0.0.0', () => console.log(`SwissInternJob listening on http://localhost:${port}`));
