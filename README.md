# Swiss internship discovery board

An English-language job discovery site for specific internship and trainee vacancies at international organizations located in Switzerland. A listing must show a Swiss location; the employer's headquarters alone does not qualify. Remote roles are also included when Swiss work location may be discussed. Vacancy links lead directly to the employer's recruitment page whenever available.

## Run with live checks

Install Node.js 20 or newer, then run `npm start` in this folder and open [http://localhost:8787](http://localhost:8787). The site checks its recruitment links when the page opens and whenever a visitor presses **Refresh**. Opening `index.html` as a local file only shows the saved snapshot; a web server is required for live checks.

Each refresh checks saved vacancy detail pages for closure signals and scans the listed recruitment pages for links to individual vacancy detail pages. It accepts `intern`, `internship`, `trainee`, `traineeship`, `stagiaire`, `stage`, and related terms only when the keyword appears in that vacancy's title or a labeled employment-type field; internship-related text elsewhere on the career page does not qualify. It then checks the linked page for job-specific evidence such as an application action, job description, employment type or deadline. It excludes general programmes, news, testimonials, agreements and PDFs. Roles located in Switzerland are included; remote roles are also surfaced with a note to confirm whether the employer permits work from Switzerland. Roles explicitly tied to other countries are excluded. UN Geneva, OHCHR, UNECE, ITC, UNCTAD, OCHA, UNDRR and UPU are represented through UN Careers rather than duplicated as separate live scans. The server caches results for up to five minutes; manual refreshes are rate-limited to one per minute.

## Publish on Render

The project includes a Render Blueprint in `render.yaml`. Push the project to a GitHub repository, connect that repository to Render, then create a new Blueprint from it. Render will use the included Node.js service settings and publish an `onrender.com` URL. The Blueprint uses the free web service plan in the Frankfurt region. Free services can spin down after inactivity, so the first visit after a quiet period may take longer while the service starts.

## Coverage and limits

This is a best-effort discovery service, not a complete live feed. The current general scanner reads HTML links and nearby text; it does not yet have a dedicated integration for every employer's applicant-tracking system, JavaScript-only listing, API, or anti-bot page. A page marked “no internship link detected” may still have internships elsewhere in its system. A page the server cannot read is marked for manual review. Job detail pages that block the server or omit their title are retained for a person to check rather than silently removed. Automatic checks also cannot guarantee that a recruiter has not closed a role moments earlier.

For a dependable public service, the next engineering step is a dedicated source connector for each major recruitment platform (including UN Careers, WHO, IATA Cornerstone, Workday and ITU), with per-source status, retries, and scheduled checks. A hosted deployment also needs a public Node.js runtime; the static files alone cannot fetch dozens of employer sites from a visitor's browser because of cross-origin restrictions.

Saved vacancies are stored in each visitor's browser. Applications go directly to employers.
