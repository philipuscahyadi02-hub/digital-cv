// Builds the résumé as a Word file: single column (ATS-safe), 2 pages, metrics in bold, builds near the top.
//
//   npm run cv            -> tools/out/Philipus-Cahyadi-Resume.docx, then public/Philipus-Cahyadi-Resume.pdf
//   node tools/make-cv.js [out.docx]
//
// The PDF step (tools/docx-to-pdf.ps1) uses Microsoft Word, so it runs on Windows with Word installed.
// Content mirrors data/resume.ts but is worded for print; update both when the CV changes.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, ExternalHyperlink, BorderStyle, TabStopType,
} = require("docx");

const out = process.argv[2] || path.join(__dirname, "out", "Philipus-Cahyadi-Resume.docx");
fs.mkdirSync(path.dirname(out), { recursive: true });
const FONT = "Arial";
const BLUE = "1A4FA0";
const GREY = "5F6368";
const TEXT = "202124";
const PAGE_W = 11906, MARGIN = 850;
const CONTENT = PAGE_W - MARGIN * 2;

// Every number is bold (one simple rule reads as consistent): 20+, 10%, 3, 50+ ...
const METRIC = /(\d+(?:[.,]\d+)?(?:\+|%)?)/g;

const r = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 19, color: o.color ?? TEXT, bold: o.bold, italics: o.italics });
const withMetrics = (text) => text.split(METRIC).map((part, i) => r(part, { bold: i % 2 === 1 }));
const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: 18, color: BLUE })] });
const p = (children, o = {}) => new Paragraph({
  children, alignment: o.align, keepNext: o.keepNext, keepLines: true,
  spacing: { before: o.before ?? 0, after: o.after ?? 0, line: o.line ?? 245 },
  tabStops: o.tabs,
});
const rightTab = [{ type: TabStopType.RIGHT, position: CONTENT }];
const bullet = (text) => new Paragraph({
  numbering: { reference: "dots", level: 0 }, children: withMetrics(text), keepLines: true,
  spacing: { after: 30, line: 245 },
});
// Plain text, no letter-spacing: PDF text extraction turns spacing into "S U M M A R Y" for ATS.
const section = (title) => new Paragraph({
  children: [new TextRun({ text: title, font: FONT, size: 21, bold: true, color: BLUE })],
  spacing: { before: 200, after: 90 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "C9D3E3", space: 3 } },
  keepNext: true,
});
/** "Title — Company ............ dates" on one line. */
const roleLine = (title, org, dates, o = {}) => p([
  r(title, { bold: true }), r(org ? `  ·  ${org}` : "", { color: GREY }), r(`\t${dates}`, { color: GREY, size: 18 }),
], { tabs: rightTab, keepNext: true, before: o.before ?? 0, after: 30 });

// ---------- content ----------
const jobs = [
  { title: "Senior Business Analyst & Presales Consultant", org: "PT Accelist Lentera Indonesia", dates: "06/2025 – 12/2025", bullets: [
    "Led the full Requirement Gathering phase for a new Lexus unit implementation, adapting Toyota’s existing business processes to the Lexus framework",
    "Conducted technical assessments for potential projects (small ERP for data management, Toyota ERP CR for Surat Jalan, Toyota ticketing for after-sales compliance) to define scope and solution proposals",
    "Acted as Technical Consultant in Presales, translating client needs into viable technology solutions and supporting internal tools integration design",
    "Redefined project scope and pre-requirement documentation, shaping early requirements for a streamlined, high-quality delivery",
    "Managed product delivery through UAT and Warranty phases: tracked issues, ensured bug fixes and led implementation training",
    "Headed project documentation and UI/UX design for cross-functional alignment, and supported development with test cases across sprints",
  ] },
  { title: "Project Manager", org: "PT Aplikasi Pekerja Indonesia (Jobseeker Company)", dates: "04/2024 – 12/2024", bullets: [
    "Delivered 20+ product demos to prospective clients, increasing demo-to-deal conversion by 10% within 3 quarters",
    "Analyzed feedback from 5 enterprise companies to identify 10+ customization needs, leading to a 15% boost in product satisfaction",
    "Implemented a new documentation standard (timelines, product specs, UI wireframes), achieving 100% on-time delivery across 5 milestones",
    "Led a team of 3 developers, improving sprint velocity by 20% over 2 quarters through standardized backlog documentation",
    "Collaborated with UI/UX on 30 custom features and personally designed 10 mockup screens, reducing revision time by 25%",
    "Maintained relationships with 5 key clients, achieving a 0% churn rate during the project period",
  ] },
  { title: "Freelance Associate Product Manager", org: "Ginantech", dates: "12/2023 – 06/2024", bullets: [
    "Benchmarked 5 competitor platforms to define business processes, reducing implementation complexity by 40%",
    "Managed a 30+ item product backlog in ClickUp with an 80% sprint completion rate; coordinated UI/UX on 12 screens",
    "Oversaw development of 3 MVP releases with 100% on-time deployment; delivered 9 test reports catching 45+ bugs before production",
  ] },
  { title: "Business Analyst", org: "PT Accelist Lentera Indonesia", dates: "02/2022 – 09/2023", bullets: [
    "Acted as liaison for 4 business-user teams across automotive and logistics, translating needs into 30+ technical user stories",
    "Joined 15 requirement-gathering workshops, improving requirement clarity and reducing rework by 20%",
    "Created 30+ UI/UX wireframes in Figma within FSD, SRS, TSD and BRD documents, reducing design-to-development handoff errors by 30%",
    "Conducted full-cycle testing for 3 enterprise modules, decreasing post-deployment bugs by 10%",
    "Trained 50+ end-users, achieving 70% system adoption within the first month of go-live",
  ] },
];

const builds = [
  { name: "Tama", tag: "Agentic AI desktop companion", status: "Shipped v1.0", url: ["github.com/philipuscahyadi02-hub/tama", "https://github.com/philipuscahyadi02-hub/tama"],
    desc: "Desktop companion that is a real agentic AI: chat with memory, a Claude Code terminal, Gmail/Calendar/Drive tools, a Telegram bot and productivity features, all running locally. Electron, Claude Agent SDK, MCP." },
  { name: "Onikiri", tag: "Two-thumb samurai reflex game", status: "Shipped · live", url: ["philipuscahyadi02-hub.github.io/onikiri", "https://philipuscahyadi02-hub.github.io/onikiri/"],
    desc: "Prototyped first as a Claude Artifact, then shipped as a static, serverless game: daily seeded waves, skill-card builds, an oni boss, unlockables, synthesized audio and offline play, with all progress saved in the browser. JavaScript, HTML5 Canvas, Web Audio, PWA." },
  { name: "SNITCH", tag: "Social bluffing party game", status: "Playable prototype", url: ["snitchbylip.vercel.app", "https://snitchbylip.vercel.app"],
    desc: "Phone-based party game for 4–8 players, designed end to end (game design doc, PRD, architecture, 21 screens) and built as a playable flow with a server-side Game Master. TypeScript, Supabase." },
  { name: "WangKu", tag: "Debt, subscription & paylater ledger", status: "Postponed", url: ["github.com/philipuscahyadi02-hub/wangku", "https://github.com/philipuscahyadi02-hub/wangku"],
    desc: "Personal finance ledger built as an experiment with gstack (Claude Code agent skills) for CEO, engineering and design reviews. Next.js, Supabase with row-level security." },
];

const projects = [
  ["PT Toyota Astra Motor", "Dealer Financing System: cross-system data mapping for credit transactions between manufacturer, dealers and banks; reporting dashboards"],
  ["PT Toyota Astra Motor", "Dealer Financing Improvement: integration with banks' customer systems for seasonal credit, removing manual process steps"],
  ["PT Toyota Astra Motor", "Networking System: employee data enhancement and reporting design"],
  ["PT Isuzu Astra Motor Indonesia", "MY isuzuID: led the service booking feature; operational dashboard specs with dealers and service providers"],
  ["Paramount Enterprise & Lion Super Indo", "Applicant Tracking System: product stability, user issues, feedback-driven upsell features"],
  ["Adarton Asia Pacific & Geprekin", "HRMS: payroll, compensation and attendance specs; custom UI; post-sales delivery timelines"],
  ["GinanTech · Accelist (internal)", "B2B Platform benchmarking and user research; Procurement Management module"],
];

const skills = [
  ["Business & Analysis", "Requirement Gathering, Process Mapping, User Story Writing, Stakeholder Management, UI/UX Collaboration, UAT & Manual Testing, Documentation (SOP, FSD, SRS, BRD), Agile & Scrum"],
  ["Tools", "JIRA, Confluence, ClickUp, Figma / Adobe XD, Notion, Microsoft 365, Google Workspace, SQL, REST APIs (JSON)"],
  ["Building with Claude", "Claude Code, Claude Agent SDK, MCP tool integration, Claude Design, Claude Artifacts, gstack skills, AGENTS.md / CLAUDE.md project rules, AI-assisted PRDs & decision logs, human-in-the-loop approval gates"],
];

// ---------- layout ----------
const body = [];
body.push(p([new TextRun({ text: "Philipus Cahyadi", font: FONT, size: 46, bold: true, color: "111111" })], { after: 20 }));
body.push(p([r("Business Analyst  ·  Presales Consultant  ·  Product Manager", { size: 22, color: BLUE, bold: true })], { after: 60 }));
body.push(p([
  r("+62 822 6932 2040   |   philipus.cahyadi02@gmail.com   |   North Jakarta   |   ", { size: 18, color: GREY }),
  link("LinkedIn", "https://www.linkedin.com/in/philipuscahyadi0211"),
  r("   |   ", { size: 18, color: GREY }),
  link("GitHub", "https://github.com/philipuscahyadi02-hub"),
], { after: 0 }));

body.push(section("SUMMARY"));
body.push(p([r("IT Business Analyst and Presales Consultant with ~4 years bridging stakeholders and engineering across Automotive, Logistics, HRMS and B2B platforms. I run requirement gathering, turn complex needs into clear specs and roadmaps, and lead cross-functional teams to on-time delivery. I also build my own products end to end, directing Claude as a coding agent from PRD to shipped code.")], { align: AlignmentType.JUSTIFIED }));

body.push(section("EXPERIENCE"));
jobs.forEach((j, n) => {
  body.push(roleLine(j.title, j.org, j.dates, { before: n ? 110 : 0 }));
  j.bullets.forEach((b) => body.push(bullet(b)));
});

body.push(section("PERSONAL BUILDS  (WITH CLAUDE)"));
builds.forEach((b, n) => {
  body.push(p([
    r(b.name, { bold: true }), r(`  ·  ${b.tag}  ·  `, { color: GREY }), link(b.url[0], b.url[1]), r(`\t${b.status}`, { color: GREY, size: 18 }),
  ], { tabs: rightTab, keepNext: true, before: n ? 80 : 0, after: 20 }));
  body.push(p([r(b.desc)], { align: AlignmentType.JUSTIFIED }));
});

body.push(section("KEY CLIENT PROJECTS"));
projects.forEach(([client, what]) => body.push(new Paragraph({
  numbering: { reference: "dots", level: 0 }, keepLines: true, spacing: { after: 30, line: 245 },
  children: [r(client + ": ", { bold: true }), r(what)],
})));

body.push(section("EDUCATION"));
body.push(p([
  r("Bachelor of Information Systems", { bold: true }), r("  ·  BINUS University", { color: GREY }), r("\t2023", { color: GREY, size: 18 }),
], { tabs: rightTab, keepNext: true, after: 30 }));
body.push(p([r("Focus: Business Intelligence  ·  GPA: "), r("3.49", { bold: true }), r(" / 4.00")]));

body.push(section("SKILLS"));
skills.forEach(([h, t]) => body.push(p([r(h + ": ", { bold: true }), r(t)], { after: 40 })));

const doc = new Document({
  creator: "Philipus Cahyadi",
  title: "Philipus Cahyadi — Resume",
  styles: { default: { document: { run: { font: FONT, size: 19, color: TEXT } } } },
  numbering: { config: [{ reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 300, hanging: 220 } } } }] }] },
  sections: [{ properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 760, bottom: 700, left: MARGIN, right: MARGIN } } }, children: body }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote", buf.length); });
