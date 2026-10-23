const checkedOn = '22 October 2026';

// Only individual vacancies checked on the employer's own recruitment site are listed here.
const snapshotJobs = [
  { org:'IOC', employer:'International Olympic Committee · Olympic Foundation for Culture and Heritage', title:'Promotion Events Trainee', type:'IGO', place:'Lausanne, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Internship · 100%', deadline:'25 October 2026', deadlineDate:'2026-10-25', id:'IOC-6888', url:'https://ioc.jobs.hr.cloud.sap/job/Promotion-Events-Trainee/6888-en_GB/', source:'IOC Careers · Job 6888', priority:1 },
  { org:'UNOG', employer:'United Nations Office at Geneva', title:'Cultural diplomacy and knowledge outreach intern', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Internship · full-time', deadline:'7 November 2026', deadlineDate:'2026-11-07', id:'286398', url:'https://careers.un.org/jobSearchDescription/286398?language=en', source:'UN Careers · Job ID 286398', priority:1 },
  { org:'JIU', employer:'Joint Inspection Unit · UN Geneva', title:'JIU Research and Analysis Intern', type:'UN', place:'Geneva, Switzerland · hybrid or remote may be considered', area:'Confirmed Switzerland', contract:'Internship · candidate pool', deadline:'22 January 2027', deadlineDate:'2027-01-22', id:'281536', url:'https://careers.un.org/jobSearchDescription/281536?language=en', source:'UN Careers · Job ID 281536', priority:2 },
  { org:'IIIM', employer:'International, Impartial and Independent Mechanism for Syria', title:'Legal Research Intern', type:'UN', place:'Geneva, Switzerland · in-person, hybrid or remote', area:'Confirmed Switzerland', contract:'Internship · 2–6 months · unpaid', deadline:'29 October 2026', deadlineDate:'2026-10-29', id:'286563', url:'https://careers.un.org/jobSearchDescription/286563?language=en', source:'UN Careers · Job ID 286563', priority:1 },
  { org:'IIIM', employer:'International, Impartial and Independent Mechanism for Syria', title:'Internet Resources Intern (Candidate Pool)', type:'UN', place:'Geneva, Switzerland · remote or in-person', area:'Confirmed Switzerland', contract:'Internship candidate pool · unpaid', deadline:'5 March 2027', deadlineDate:'2027-03-05', id:'273246', url:'https://careers.un.org/jobSearchDescription/273246?language=en', source:'UN Careers · Job ID 273246', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Interns – Rights of Older Persons', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Internship · six months', deadline:'2 November 2026', deadlineDate:'2026-11-02', id:'286512', url:'https://careers.un.org/jobSearchDescription/286512?language=en', source:'UN Careers · Job ID 286512', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Intern – Human Rights', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · Human Rights Affairs', deadline:'3 November 2026', deadlineDate:'2026-11-03', id:'286531', url:'https://careers.un.org/jobSearchDescription/286531?language=en', source:'UN Careers · Job ID 286531', priority:1 },
  { org:'UNEP', employer:'UN Environment Programme', title:'Intern – Executive Office of the Basel, Rotterdam and Stockholm Conventions', type:'UN', place:'Geneva, Switzerland · see posting for work arrangement', area:'Confirmed Switzerland', contract:'Internship · I-1', deadline:'1 November 2026', deadlineDate:'2026-11-01', id:'286720', url:'https://careers.un.org/jobSearchDescription/286720?language=en', source:'UN Careers · Job ID 286720', priority:1 },
  { org:'UNEP', employer:'UN Environment Programme · Finance Initiative', title:'Pollution and Circular Economy Support Internship', type:'UN', place:'Geneva, Switzerland · remote or Geneva', area:'Confirmed Switzerland', contract:'Internship · I-1', deadline:'8 November 2026', deadlineDate:'2026-11-08', id:'286691', url:'https://careers.un.org/jobSearchDescription/286691?language=en', source:'UN Careers · Job ID 286691', priority:1 },
  { org:'UNEP', employer:'UN Environment Programme · Finance Initiative', title:'Sustainable Fiscal Policy and Public Finance Intern', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · six months', deadline:'24 October 2026', deadlineDate:'2026-10-24', id:'286121', url:'https://careers.un.org/jobSearchDescription/286121?language=en', source:'UN Careers · Job ID 286121', priority:1 },
  { org:'UNOG', employer:'United Nations Office at Geneva', title:'INTERN – NGO Liaison Unit, Political Affairs and Partnerships Section', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · deadline 22 October 2026', deadline:'22 October 2026', deadlineDate:'2026-10-22', id:'286123', url:'https://careers.un.org/jobSearchDescription/286123?language=en', source:'UN Careers · Job ID 286123', priority:1 },
  { org:'UN Tech Envoy', employer:'Office of the Secretary-General’s Envoy on Technology', title:'Intern – Programme Management (Event Coordination and Stakeholder Engagement)', type:'UN', place:'Geneva, Switzerland or remote', area:'Confirmed Switzerland', contract:'Internship · full-time or part-time', deadline:'22 October 2026', deadlineDate:'2026-10-22', id:'285590', url:'https://careers.un.org/jobSearchDescription/285590?language=en', source:'UN Careers · Job ID 285590', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Intern (Human Rights Affairs)', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · deadline 22 October 2026', deadline:'22 October 2026', deadlineDate:'2026-10-22', id:'286048', url:'https://careers.un.org/jobSearchDescription/286048?language=en', source:'UN Careers · Job ID 286048', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Internship with UPR Branch', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · deadline 22 October 2026', deadline:'22 October 2026', deadlineDate:'2026-10-22', id:'285297', url:'https://careers.un.org/jobSearchDescription/285297?language=en', source:'UN Careers · Job ID 285297', priority:1 },
  { org:'UNOG', employer:'United Nations Office at Geneva', title:'Outreach/Social Media Intern', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · public information', deadline:'29 October 2026', deadlineDate:'2026-10-29', id:'286113', url:'https://careers.un.org/jobSearchDescription/286113?language=en', source:'UN Careers · Job ID 286113', priority:1 },
  { org:'UNOG', employer:'United Nations Office at Geneva', title:'Social Media Intern', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · public information', deadline:'8 November 2026', deadlineDate:'2026-11-08', id:'286274', url:'https://careers.un.org/jobSearchDescription/286274?language=en', source:'UN Careers · Job ID 286274', priority:1 },
  { org:'UNOG', employer:'United Nations Office at Geneva', title:'Intern – Archivist', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · archives and records', deadline:'10 November 2026', deadlineDate:'2026-11-10', id:'286228', url:'https://careers.un.org/jobSearchDescription/286228?language=en', source:'UN Careers · Job ID 286228', priority:1 },
  { org:'UNCTAD', employer:'United Nations Conference on Trade and Development', title:'Nowcasts Intern', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · Statistics', deadline:'22 October 2026', deadlineDate:'2026-10-22', id:'286205', url:'https://careers.un.org/jobSearchDescription/286205?language=en', source:'UN Careers · Job ID 286205', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Intern, Special Procedures (Candidate Pool)', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship candidate pool · Human Rights Affairs', deadline:'30 December 2026', deadlineDate:'2026-12-30', id:'271235', url:'https://careers.un.org/jobSearchDescription/271235?language=en', source:'UN Careers · Job ID 271235', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Interns – Innovation & Analytics Hub (Candidate Pool)', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship candidate pool · Human Rights Affairs', deadline:'30 December 2026', deadlineDate:'2026-12-30', id:'279794', url:'https://careers.un.org/jobSearchDescription/279794?language=en', source:'UN Careers · Job ID 279794', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Human Rights Intern (Candidate Pool)', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship candidate pool · Human Rights Affairs', deadline:'1 January 2027', deadlineDate:'2027-01-01', id:'280477', url:'https://careers.un.org/jobSearchDescription/280477?language=en', source:'UN Careers · Job ID 280477', priority:1 },
  { org:'OHCHR', employer:'Office of the UN High Commissioner for Human Rights', title:'Intern – Sri Lanka Accountability Project (Candidate Pool)', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship candidate pool · Human Rights Affairs', deadline:'20 January 2027', deadlineDate:'2027-01-20', id:'281381', url:'https://careers.un.org/jobSearchDescription/281381?language=en', source:'UN Careers · Job ID 281381', priority:1 },
  { org:'WHO', employer:'World Health Organization', title:'Internship – Health Emergency Response Financing', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 24 weeks · full-time', deadline:'11 November 2026', deadlineDate:'2026-11-11', id:'2604626', url:'https://careers.who.int/careersection/intern/jobdetail.ftl?job=2604626&lang=en', source:'WHO Careers · Job ID 2604626', priority:1 },
  { org:'WHO', employer:'World Health Organization', title:'Internship – Environment, Climate Change and One Health', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 24 weeks · full-time', deadline:'11 November 2026', deadlineDate:'2026-11-11', id:'2604481', url:'https://careers.who.int/careersection/intern/jobdetail.ftl?job=2604481&lang=en', source:'WHO Careers · Job ID 2604481', priority:1 },
  { org:'WHO', employer:'World Health Organization', title:'Internship – Ethics Team in Foresight, Leadership & Ethics in Science', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 24 weeks · full-time', deadline:'23 October 2026', deadlineDate:'2026-10-23', id:'2604183', url:'https://careers.who.int/careersection/intern/jobdetail.ftl?job=2604183&lang=en', source:'WHO Careers · Job ID 2604183', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (Event Operations and Exhibition)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · starts 18 January 2027', deadline:'17 November 2026', deadlineDate:'2026-11-17', id:'2440', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28Event-Operations-and-Exhibition%29/1373492655/', source:'ITU Careers · Vacancy 2440', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (High-Level Track)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · starts 18 January 2027', deadline:'17 November 2026', deadlineDate:'2026-11-17', id:'2441', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28High-Level-Track%29/1373497655/', source:'ITU Careers · Vacancy 2441', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (Programme and Agenda)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · starts 18 January 2027', deadline:'16 November 2026', deadlineDate:'2026-11-16', id:'2442', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28Programme-and-Agenda%29/1373344555/', source:'ITU Careers · Vacancy 2442', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (Social Media and Digital Marketing)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · dates in notice need confirmation', deadline:'16 November 2026', deadlineDate:'2026-11-16', id:'2443', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28Social-Media-and-Digital-Marketing%29/1373345555/', source:'ITU Careers · Vacancy 2443', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (WSIS Stocktaking and Case Studies)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · dates in notice need confirmation', deadline:'17 November 2026', deadlineDate:'2026-11-17', id:'2444', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28WSIS-Stocktaking-and-Case-Studies%29/1373509155/', source:'ITU Careers · Vacancy 2444', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (Videography)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · dates in notice need confirmation', deadline:'17 November 2026', deadlineDate:'2026-11-17', id:'2445', url:'https://jobs.itu.int/job/Geneva-Unpaid-Internship-WSIS-Forum-2027-Junior-Project-Officer-%28Videography%29/1373508955/', source:'ITU Careers · Vacancy 2445', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – WSIS Forum 2027 Junior Project Officer (WSIS Prizes)', type:'UN', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Unpaid internship · six months · starts 18 January 2027', deadline:'17 November 2026', deadlineDate:'2026-11-17', id:'2446', url:'https://jobs.itu.int/job/Geneva-Unpaid-internship-WSIS-Forum-2027-Junior-Project-Officer-%28WSIS-Prizes%29/1373509955/', source:'ITU Careers · Vacancy 2446', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – Emergency Telecommunications Intern', type:'UN', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Unpaid internship · six months', deadline:'10 December 2026', deadlineDate:'2026-12-10', id:'2406', url:'https://jobs.itu.int/job/Geneva-Unpaid-internship-Emergency-Telecommunications-Intern/1367950855/', source:'ITU Careers · Vacancy 2406', priority:1 },
  { org:'ITU', employer:'International Telecommunication Union', title:'Unpaid Internship – Giga UX/UI Support Officer-Intern', type:'UN', place:'Remote · Swiss work location to discuss with employer', area:'Remote · confirm Swiss eligibility', contract:'Unpaid internship · six months · remote', deadline:'30 October 2026', deadlineDate:'2026-10-30', id:'2423', url:'https://jobs.itu.int/job/Home-Based-Unpaid-Internship-Giga-UXUI-Support-Officer-Intern/1371131955/', source:'ITU Careers · Vacancy 2423', priority:1 },
  { org:'WTO', employer:'World Trade Organization', title:'Intern (WTO Internship Programme candidate roster)', type:'IGO', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · roster posting', deadline:'31 December 2026', deadlineDate:'2026-12-31', id:'JR103985', url:'https://wto.wd103.myworkdayjobs.com/en-US/External/job/CWR/Intern_JR103985', source:'WTO Careers · JR103985', priority:1 },
  { org:'CERN', employer:'European Organization for Nuclear Research', title:'Short-Term Internship STAG 2026', type:'IGO', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Internship · 1–6 months · ideal start date to be discussed', deadline:'1 November 2026', deadlineDate:'2026-11-01', id:'STAG-2026', url:'https://careers.cern/jobs/short-term-internship/', source:'CERN Careers · STAG 2026', priority:1 },
  { org:'ICRC', employer:'International Committee of the Red Cross', title:'Associate Capacity Building', type:'IGO', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Paid traineeship · 12 months · starts 11 January 2027', deadline:'25 October 2026', deadlineDate:'2026-10-25', id:'33613', url:'https://careers.icrc.org/job/Geneva-%28GVA%29-Associate-Capacity-Building-33613/1447101733/', source:'ICRC Careers · Job 33613', priority:1 },
  { org:'ICRC', employer:'International Committee of the Red Cross', title:'Associate for General Archives', type:'IGO', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Paid traineeship · 12 months · starts 4 January 2027', deadline:'25 October 2026', deadlineDate:'2026-10-25', id:'33163', url:'https://careers.icrc.org/job/Geneva-%28GVA%29-Associate-for-General-Archives-33163/1445985333/', source:'ICRC Careers · Job 33163', priority:1 },
  { org:'ICRC', employer:'International Committee of the Red Cross', title:'Law and Policy Outreach Associate', type:'IGO', place:'Geneva, Switzerland · on-site', area:'Confirmed Switzerland', contract:'Paid traineeship · 12 months', deadline:'23 October 2026', deadlineDate:'2026-10-23', id:'33462', url:'https://careers.icrc.org/job/Geneva-%28GVA%29-Law-and-Policy-Outreach-Associate-33462/1444827433/', source:'ICRC Careers · Job 33462', priority:1 },
  { org:'IATA', employer:'International Air Transport Association', title:'Intern, Event Operations', type:'IGO', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 6 months, extendable to 11 months', deadline:'No deadline published', deadlineDate:'9999-12-31', id:'IATA-3849', url:'https://iata.csod.com/ux/ats/careersite/1/home/requisition/3849?c=iata&country=ch', source:'IATA Careers · req3849', priority:1 },
  { org:'IATA', employer:'International Air Transport Association', title:'Intern Training Center Geneva', type:'IGO', place:'Geneva, Switzerland · remote or hybrid possible', area:'Confirmed Switzerland', contract:'Internship · 6 months, extendable to 11 months', deadline:'No deadline published', deadlineDate:'9999-12-31', id:'IATA-3669', url:'https://iata.csod.com/ux/ats/careersite/1/home/requisition/3669?c=iata', source:'IATA Careers · req3669', priority:1 },
  { org:'MSF', employer:'Médecins Sans Frontières Switzerland', title:'Medical Technologies and Innovation Intern', type:'NGO', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 6–9 months', deadline:'2 November 2026', deadlineDate:'2026-11-02', id:'JR115864', url:'https://msf.wd3.myworkdayjobs.com/work-with-msf-ocg-hq-lhs/job/GENEVA/Medical-Technologies-and-Innovation-Intern_JR115864', source:'MSF Switzerland Careers · JR115864', priority:1 },
  { org:'MSF', employer:'Médecins Sans Frontières Switzerland', title:'Media Internship (German-language posting)', type:'NGO', place:'Zurich, Switzerland', area:'Confirmed Switzerland', contract:'Internship', deadline:'25 October 2026', deadlineDate:'2026-10-25', id:'JR115636', url:'https://msf.wd3.myworkdayjobs.com/work-with-msf-ocg-hq-lhs/job/ZURICH/Praktikant-in-fr-die-Medienarbeit_JR115636', source:'MSF Switzerland Careers · JR115636', priority:1 },
  { org:'IMPACT', employer:'IMPACT Initiatives', title:'Projects & Partnerships Support Intern for HQ', type:'NGO', place:'Geneva, Switzerland · hybrid up to 40%', area:'Confirmed Switzerland', contract:'Internship · 6 months · start date needs reconfirmation', deadline:'Open until filled', deadlineDate:'9999-12-31', id:'IMPACT-PP-HQ-2026', url:'https://www.impact-initiatives.org/work-with-us/vacancies/projects-partnerships-support-intern-for-hq-based-in-geneva/', source:'IMPACT Initiatives Careers · Vacancy', priority:1 },
  { org:'IMPACT', employer:'IMPACT Initiatives', title:'Accounting & Audit Intern for HQ', type:'NGO', place:'Geneva, Switzerland · hybrid up to 40%', area:'Confirmed Switzerland', contract:'Internship · 6 months · starts January 2027', deadline:'Open until filled', deadlineDate:'9999-12-31', id:'IMPACT-AA-HQ-2027', url:'https://www.impact-initiatives.org/work-with-us/vacancies/accounting-audit-intern-for-hq-based-in-geneva-link-for-external-applicants/', source:'IMPACT Initiatives Careers · Vacancy', priority:1 },
  { org:'HELVETAS', employer:'Helvetas Swiss Intercooperation', title:'Intern, Partnerships & Philanthropy Department (80–100%)', type:'NGO', place:'Geneva, Switzerland', area:'Confirmed Switzerland', contract:'Internship · 12 months · starts 15 January 2027', deadline:'8 November 2026', deadlineDate:'2026-11-08', id:'15331', url:'https://www.helvetas.org/en/switzerland/who-we-are/jobs/Stagiaire-pour-le-Departement-Partenariats-Philanthropie-80-100_job_15331', source:'Helvetas Careers · Vacancy 15331', priority:1 }
];
let jobs = [...snapshotJobs];

const searchEngines = [
  { name:'UN Careers', label:'OFFICIAL · UN SECRETARIAT', url:'https://careers.un.org/jobopening?language=en', desc:'Official job and internship vacancy search for the UN Secretariat.' },
  { name:'Geneva International · Jobs', label:'GENEVA ORGANIZATION DIRECTORY', url:'https://www.geneve-int.ch/jobs', desc:'Search roles from Geneva-based international organizations and NGOs.' },
  { name:'UNjobnet · Switzerland', label:'UN & INTERNATIONAL JOBS', url:'https://www.unjobnet.org/countries/switzerland', desc:'Search UN and international vacancies by Swiss duty station.' },
  { name:'UN Talent · Geneva', label:'UN SYSTEM JOBS', url:'https://untalent.org/in/geneva/work', desc:'Geneva openings grouped by internship and other career levels.' },
  { name:'UNjobs · Switzerland', label:'UN & NGO VACANCIES', url:'https://unjobs.org/duty_stations/switzerland', desc:'Vacancies by Swiss duty station, including Geneva and Bern.' },
  { name:'ReliefWeb Jobs', label:'HUMANITARIAN VACANCIES', url:'https://reliefweb.int/jobs', desc:'Humanitarian and emergency-response roles; verify Swiss duty station on the employer page.' }
];

const groups = [
  { title:'United Nations system', icon:'✳', count:'Official career portals', items:[
    ['UN Careers','https://careers.un.org/jobopening?language=en'],
    ['UN Geneva','https://www.ungeneva.org/en/about/careers'],
    ['OHCHR','https://www.ohchr.org/en/about-us/jobs'],
    ['IIIM','https://iiim.un.org/who-we-are/recruitment/'],
    ['UNHCR','https://unhcr.wd3.myworkdayjobs.com/External'],
    ['IOM','https://fa-evlj-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/jobs'],
    ['WHO','https://careers.who.int/careersection/intern/jobsearch.ftl?lang=en'],
    ['ILO','https://jobs.ilo.org/go/Internships/9589701/'],
    ['WIPO','https://www.wipo.int/en/web/working-at-wipo/internship-program'],
    ['ITU','https://jobs.itu.int/go/Internship/8943055/'],
    ['WMO','https://estm.fa.em2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_5001/jobs'],
    ['UNAIDS','https://unaids.org/en/vacanciesandtenders/vacancies'],
    ['UNITAR','https://unitar.org/vacancy-announcements'],
    ['UNIDIR','https://unidir.org/who-we-are/join-our-team/'],
    ['UNRISD','https://www.geneve-int.ch/jobs'],
    ['UNECE','https://careers.un.org/jobopening?language=en'],
    ['International Trade Centre','https://careers.un.org/jobopening?language=en'],
    ['UNCTAD','https://careers.un.org/jobopening?language=en'],
    ['OCHA','https://careers.un.org/jobopening?language=en'],
    ['UNDRR','https://careers.un.org/jobopening?language=en'],
    ['UNICEF','https://jobs.unicef.org/'],
    ['UNDP','https://jobs.undp.org/cj_view_jobs.cfm'],
    ['UNEP','https://www.unep.org/en/who-we-are/about-us/work-us'],
    ['UN Women','https://www.unwomen.org/en/jobs/unwomen?search='],
    ['UNFPA','https://www.unfpa.org/jobs'],
    ['WFP','https://wd3.myworkdaysite.com/recruiting/wfp/job_openings'],
    ['FAO','https://jobs.fao.org/careersection/fao_external/jobsearch.ftl?lang=en'],
    ['UN-Habitat','https://unhabitat.org/uni/opportunities']
  ]},
  { title:'IGOs and international institutions', icon:'◎', count:'Official career portals', items:[
    ['ICRC','https://careers.icrc.org/search/?createNewAlert=false&q=&optionsFacetsDD_customfield1=&optionsFacetsDD_dept=&optionsFacetsDD_customfield4=&optionsFacetsDD_facility=&optionsFacetsDD_shifttype='],
    ['IFRC','https://careers.ifrc.org/lumesse_jobsearch.html'],
    ['ICDO','https://www.geneve-int.ch/jobs'],
    ['GICHD','https://www.gichd.org/about/work-with-us/job-opportunities/'],
    ['CERN','https://careers.cern/jobs/'],
    ['ISO','https://iso.csod.com/ats/careersite/search.aspx?site=5&c=iso'],
    ['EFTA','https://efta.teamtailor.com/#jobs'],
    ['EBU','https://www.ebu.ch/careers'],
    ['Gavi','https://fs-2662.my.salesforce-sites.com/recruit/fRecruit__ApplyJobList?portal=Global'],
    ['The Global Fund','https://theglobalfund.wd1.myworkdayjobs.com/External'],
    ['GAIN','https://gainhealth.occupop-careers.com/'],
    ['GARDP','https://gardp.org/work-with-us/'],
    ['FIND','https://finddx.intranet.digital/external/en/companies/37147673-4fa9-4747-8148-e8f7720fbd7d/jobs'],
    ['World Economic Forum','https://weforum.wd3.myworkdayjobs.com/Forum_Careers'],
    ['IUCN','https://hrms.iucn.org/iresy/index.cfm?event=vac.showOpenList'],
    ['Inter-Parliamentary Union','https://www.ipu.org/about-ipu/work-with-us/vacancies'],
    ['GCSP','https://www.gcsp.ch/work-with-us'],
    ['Centre for Humanitarian Dialogue','https://hdcentre.org/careers/'],
    ['IATA','https://iata.csod.com/ux/ats/careersite/1/home?c=iata'],
    ['DCAF','https://www.dcaf.ch/vacancies#/'],
    ['BIS','https://www.bis.org/careers/index.htm'],
    ['International Olympic Committee','https://olympics.com/ioc/careers'],
    ['WADA','https://www.wada-ama.org/en/careers'],
    ['Universal Postal Union','https://careers.un.org/jobopening?language=en'],
    ['WTO','https://www.wto.org/english/thewto_e/vacan_e/vacan_e.htm']
  ]},
  { title:'International NGOs and humanitarian organizations', icon:'♡', count:'Official career portals', items:[
    ['Amnesty International','https://careers.amnesty.org/jobs/vacancy/find/results/'],
    ['Human Rights Watch','https://www.hrw.org/careers'],
    ['International Commission of Jurists','https://www.icj.org/about/jobs-internships/'],
    ['International Service for Human Rights','https://ishr.ch/work-with-us/internships/'],
    ['Association for the Prevention of Torture','https://www.apt.ch/jobs'],
    ['Center for Civilians in Conflict','https://civiliansinconflict.org/about-us/careers/'],
    ['Child Rights Connect','https://childrightsconnect.org/work-with-us/'],
    ['Center for International Environmental Law','https://cielorg.bamboohr.com/careers'],
    ['MSF Switzerland','https://www.msf.ch/en/work-with-us/working-headquarters'],
    ['Norwegian Refugee Council','https://www.nrc.no/careers/'],
    ['Danish Refugee Council','https://drc.ngo/about-us/careers/'],
    ['CARE International','https://www.care-international.org/careers'],
    ['Humanity & Inclusion','https://apply.workable.com/hi-jobs/?lng=en'],
    ['Geneva Call','https://www.genevacall.org/careers/'],
    ['FSD','https://fsd.ch/en/about-us/job-offers/'],
    ['Save the Children','https://www.savethechildren.net/careers/apply'],
    ['World Vision International','https://worldvision.wd1.myworkdayjobs.com/WorldVisionInternational'],
    ['Aga Khan Foundation','https://the.akdn/en/our-agencies/aga-khan-foundation/careers'],
    ['Helvetas','https://www.helvetas.org/en/switzerland/who-we-are/jobs'],
    ['Terre des hommes','https://jobs.tdh.org/en-GB/jobs'],
    ['Biovision','https://www.biovision.ch/en/jobs/'],
    ['Impact Initiatives','https://www.impact-initiatives.org/work-with-us/'],
    ['WWF Switzerland','https://jobs.dayforcehcm.com/en-GB/wwfint/EXTERNAL'],
    ['Greenpeace Switzerland','https://workfor.international.greenpeace.org/'],
    ['Gold Standard','https://www.goldstandard.org/careers/career-opportunities-archive'],
    ['Better Cotton','https://ats.rippling.com/en-GB/better-cotton-careers/jobs'],
    ['Global Footprint Network','https://www.footprintnetwork.org/jobs/'],
    ['World Organisation Against Torture','https://www.omct.org/en/who-we-are/careers']
  ]}
];

let category='all';
const allowedLocation=/\b(switzerland|suisse|schweiz|geneva|gen[eè]ve|bern|berne|zurich|z[üu]rich|basel|b[âa]le|lausanne|nyon|fribourg|neuch[âa]tel|montreux|lugano|winterthur|lucerne|luzern|st[\s.-]?gallen|zug)\b/i;
const remoteEligible=/\bremote\b/i;
const otherCountry=/\b(nairobi|new york|montreal|toronto|washington(?:,? dc)?|bangkok|paris|rome|brussels|london|vienna|madrid|singapore|beijing|addis ababa|amman|cairo|dakar|maputo|kabul|dhaka|jerusalem|spain|france|united states|united kingdom|kenya|thailand|india|germany|italy|belgium|austria|netherlands|canada|senegal|bangladesh)\b/i;
let savedOnly=false;
const saved=new Set(JSON.parse(localStorage.getItem('swissmission-saved')||'[]'));
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function renderJobs(){
  const query=$('#search').value.trim().toLowerCase();
  const today=new Date();
  const todayKey=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const activeJobs=jobs.filter(job=>job.deadlineDate>=todayKey);
  let list=activeJobs.filter(job=>{
    const haystack=[job.org,job.employer,job.title,job.place,job.contract].join(' ').toLowerCase();
    const matchesText=!query||haystack.includes(query);
    const matchesCategory=category==='all'||category==='saved'||job.type===category;
    const matchesSaved=!savedOnly||saved.has(job.id);
    const locationMatches=allowedLocation.test(job.place)||(remoteEligible.test(job.place)&&!otherCountry.test(job.place));
    return matchesText&&matchesCategory&&matchesSaved&&locationMatches;
  });
  const sort=$('#sort').value;
  if(sort==='name') list.sort((a,b)=>a.employer.localeCompare(b.employer));
  else if(sort==='type') list.sort((a,b)=>a.type.localeCompare(b.type));
  else list.sort((a,b)=>a.deadlineDate.localeCompare(b.deadlineDate));
  $('#jobs-grid').innerHTML=list.map(job=>`<article class="job-card"><div class="card-top"><div class="org-logo ${escapeHTML(job.type.toLowerCase())}">${escapeHTML(job.org)}</div><div class="card-title"><h3>${escapeHTML(job.title)}</h3><span>${escapeHTML(job.employer)}</span></div><button class="save-btn ${saved.has(job.id)?'saved':''}" data-save="${escapeHTML(job.id)}" aria-label="Save ${escapeHTML(job.title)}">${saved.has(job.id)?'♥':'♡'}</button></div><div class="card-tags"><span class="tag">${escapeHTML(job.contract)}</span><span class="tag deadline">Apply by ${escapeHTML(job.deadline)}</span><span class="tag location">⌖ ${escapeHTML(job.place)}</span></div><div class="card-foot"><span class="source-name">${escapeHTML(job.source)}</span><a class="open-link" href="${escapeHTML(job.url)}" target="_blank" rel="noopener">Official vacancy <span>↗</span></a></div></article>`).join('');
  $('#empty-state').hidden=list.length>0;
  $('#result-count').textContent=`${list.length} listed openings`;
  $('#nav-count').textContent=activeJobs.length;
  $('#saved-count').textContent=saved.size;
  $('#all-num').textContent=activeJobs.length;
}

function renderGroups(){
  $('#org-groups').innerHTML=groups.map(group=>`<article class="org-group"><div class="group-head"><span class="group-icon">${group.icon}</span>${group.title}<small>${group.count}</small></div><div class="org-list">${group.items.map(([name,url])=>`<a class="org-link" href="${url}" target="_blank" rel="noopener">${name} ↗</a>`).join('')}</div></article>`).join('');
}

function renderSources(){
  $('#source-cards').innerHTML=searchEngines.map(source=>`<a class="source-card" href="${source.url}" target="_blank" rel="noopener"><span class="source-kicker">${source.label}</span><b>${source.name}</b><span>${source.desc} ↗</span></a>`).join('');
}

async function refreshLiveJobs(){
  const button=$('#live-refresh');
  const status=$('#live-status');
  if(location.protocol==='file:'){
    status.innerHTML='<i></i> Snapshot mode · use the web server for live checks';
    return;
  }
  button.disabled=true;
  status.innerHTML='<i></i> Checking official career pages…';
  try{
    const response=await fetch('/api/jobs?refresh=1',{cache:'no-store'});
    if(!response.ok)throw new Error(`Request failed (${response.status})`);
    const data=await response.json();
    if(Array.isArray(data.jobs))jobs=data.jobs;
    const checked=data.checkedAt?new Date(data.checkedAt).toLocaleString():'just now';
    const failures=Number(data.failedSources||0);
    const found=(data.employers||[]).filter(item=>item.openingsFound>0).length;
    const suffix=failures?` · ${failures} need manual review`:'';
    status.innerHTML=`<i></i> Checked ${data.checkedSources||0}/${data.checkedRecruitmentLinks||0} recruitment links · ${found} with internship links · ${checked}${suffix}`;
    if(data.note)$('#coverage-note').textContent=`Search results are for reference only. Verify the role, location, eligibility and deadline on the official employer posting before applying. ${data.note}`;
    if(Array.isArray(data.employers))$('#employer-results').innerHTML=data.employers.map(item=>{
      let safeUrl='#';try{const parsed=new URL(item.url);if(parsed.protocol==='https:'||parsed.protocol==='http:')safeUrl=parsed.href}catch{}
      const titles=(item.titles||[]).map(escapeHTML).join(' · ');
      return `<div class="audit-row"><a href="${escapeHTML(safeUrl)}" target="_blank" rel="noopener">${escapeHTML(item.name)} ↗</a><span>${escapeHTML(item.status)}${titles?` · ${titles}`:''}${item.detail?` · ${escapeHTML(item.detail)}`:''}</span></div>`
    }).join('');
    renderJobs();
  }catch(error){
    status.innerHTML='<i></i> Live check unavailable · showing saved snapshot';
    $('#coverage-note').textContent='Search results are for reference only. The live service did not respond, so the saved snapshot may be out of date. Confirm each opening on the official employer site before applying.';
  }finally{button.disabled=false;}
}

$('#search').addEventListener('input',renderJobs);
$('#live-refresh').addEventListener('click',refreshLiveJobs);
$('#sort').addEventListener('change',renderJobs);
$('#category-chips').addEventListener('click',event=>{
  const button=event.target.closest('[data-category]');
  if(!button)return;
  category=button.dataset.category;
  savedOnly=category==='saved';
  $$('.chip').forEach(chip=>chip.classList.toggle('active',chip===button));
  renderJobs();
});
$('#jobs-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-save]');
  if(!button)return;
  const id=button.dataset.save;
  if(saved.has(id))saved.delete(id);else saved.add(id);
  localStorage.setItem('swissmission-saved',JSON.stringify([...saved]));
  renderJobs();
});
$('#saved-nav').addEventListener('click',()=>{
  category='saved';savedOnly=true;
  $$('.chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.category==='saved'));
  $('#opportunities').scrollIntoView();renderJobs();
});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#search').focus();}
});

$('#stat-orgs').textContent=groups.reduce((total,group)=>total+group.items.length,0);
$('#stat-sources').textContent=searchEngines.length;
renderJobs();renderGroups();renderSources();
if(location.protocol!=='file:')refreshLiveJobs();else $('#live-status').innerHTML='<i></i> Snapshot mode · use the web server for live checks';
