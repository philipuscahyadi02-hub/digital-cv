export const profile = {
  name: "Philipus Cahyadi",
  roles: ["Business Analyst", "Presales Consultant", "Product Manager"],
  tagline:
    "Bridging technology and purpose, IT Business Analyst passionate about product development and driving social innovation through impactful solutions.",
  location: "North Jakarta, Jakarta",
  email: "philipus.cahyadi02@gmail.com",
  phone: "+62 822 6932 2040",
  social: {
    linkedin: "https://www.linkedin.com/in/philipuscahyadi0211",
    instagram: "https://www.instagram.com/philipus_cahyadi/",
    github: "https://github.com/philipuscahyadi02-hub",
  },
  // Short version for the top of the site: recruiters skim, so lead with who and proof.
  pitch:
    "~4 years in business analysis, presales and product delivery, turning stakeholder needs into shipped software across Automotive, Logistics, HRMS and B2B — and now building my own products with Claude.",
  stats: [
    { value: "4 yrs", label: "BA, presales & product delivery" },
    { value: "20+", label: "client demos, +10% demo-to-deal" },
    { value: "100%", label: "on-time milestone delivery" },
    { value: "4", label: "products built with Claude" },
  ],
  summary:
    "A results-driven professional with a strong foundation in Information Systems and a dedication to continuous technological exploration and relevance. I thrive as the key interface, prioritizing direct stakeholder communication to champion innovation and translate strategic needs into practical, high-impact digital solutions. Proven in bridging the gap between presales discovery and technical execution—delivering across diverse sectors including Automotive, Logistics, HRMS, and B2B Platforms—my core strength lies in solutioning complex challenges into actionable roadmaps. I am committed to leading cross-functional teams and ensuring timely, high-quality delivery of every project.",
};

export const education = {
  school: "BINUS University",
  degree: "Bachelor of Information Systems",
  focus: "Business Intelligence",
  graduated: "2023",
  gpa: "3.49 / 4.00",
};

export type Experience = {
  period: string;
  title: string;
  company: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    period: "Jun 2025 — Dec 2025",
    title: "Senior Business Analyst & Presales Consultant",
    company: "PT Accelist Lentera Indonesia",
    highlights: [
      "Led full Requirement Gathering for a new Lexus unit implementation, adapting Toyota's existing business processes to the Lexus framework.",
      "Conducted technical assessments across multiple potential projects (ERP for data management, Toyota ERP CR for Surat Jalan, Toyota ticketing for after-sales compliance) to define scope and solution proposals.",
      "Acted as Technical Consultant in Presales, translating client needs into viable technology solutions and supporting internal tools integration design.",
      "Redefined project scope and pre-requirement documentation, shaping early requirements for streamlined, high-quality delivery.",
      "Managed product delivery through UAT and Warranty phases, tracking issues, ensuring bug fixes, and leading implementation training.",
      "Headed project documentation and UI/UX design for cross-functional alignment; supported development with test cases across sprints.",
    ],
  },
  {
    period: "Apr 2024 — Dec 2024",
    title: "Project Manager",
    company: "PT Aplikasi Pekerja Indonesia (Jobseeker Company)",
    highlights: [
      "Delivered 20+ product demos to prospective clients, lifting demo-to-deal conversion by 10% within 3 quarters.",
      "Analyzed feedback from 5 enterprise companies, surfacing 10+ customization needs and a 15% boost in product satisfaction.",
      "Implemented a new documentation standard (timelines, specs, wireframes), reaching 100% on-time delivery across 5 milestones.",
      "Led a team of 3 developers, improving sprint velocity by 20% over 2 quarters through standardized backlog documentation.",
      "Partnered with UI/UX on 30 custom features and personally designed 10 mockup screens, cutting revision time by 25%.",
      "Sustained 5 key client relationships with a 0% churn rate across the project period.",
    ],
  },
  {
    period: "Dec 2023 — Jun 2024",
    title: "Freelance Associate Product Manager",
    company: "Ginantech",
    highlights: [
      "Benchmarked 5 competitor platforms to define business processes, cutting implementation complexity by 40%.",
      "Managed a 30+ item product backlog in ClickUp with an 80% sprint completion rate.",
      "Coordinated with UI/UX to design 12 screens and oversaw 3 MVP release cycles, all shipped on time.",
      "Led QA across releases, delivering 9 detailed test reports and catching 45+ bugs before production.",
    ],
  },
  {
    period: "Feb 2022 — Sep 2023",
    title: "Business Analyst",
    company: "PT Accelist Lentera Indonesia",
    highlights: [
      "Served as liaison for 4 business-user teams across automotive and logistics, translating needs into 30+ technical user stories.",
      "Joined 15 requirement-gathering workshops, improving requirement clarity and cutting rework by 20%.",
      "Produced 30+ UI/UX wireframes in Figma embedded within FSD, SRS, TSD, and BRD docs, reducing design-to-dev handoff errors by 30%.",
      "Led full-cycle testing across 3 enterprise modules, decreasing post-deployment bugs by 10%.",
      "Trained 50+ end-users, reaching 70% system adoption within the first month of go-live.",
    ],
  },
];

export const skills = {
  business: [
    "Requirement Gathering",
    "Process Mapping",
    "User Story Writing",
    "UI/UX Collaboration",
    "Stakeholder Management",
    "UAT & Manual Testing",
    "Documentation (SOP, Functional Specs)",
    "Agile & Scrum",
  ],
  tools: [
    "JIRA",
    "Confluence",
    "ClickUp",
    "Figma / Adobe XD",
    "Notion",
    "Microsoft 365",
    "Google Workspace",
    "SQL (DBMS)",
    "API (JSON)",
  ],
  // What I've actually built with Claude: Tama, WangKu, SNITCH and this site.
  claude: [
    "Claude Code (agentic coding)",
    "Claude Agent SDK",
    "MCP tool integration",
    "Claude Design (UI prototyping)",
    "Claude Artifacts (rapid prototypes)",
    "gstack skills (CEO, eng & design reviews)",
    "AGENTS.md / CLAUDE.md project rules",
    "AI-assisted PRD, architecture & decision logs",
    "Prompt & persona design",
    "Human-in-the-loop approval gates",
  ],
};

export type Sector = "Automotive" | "HR Tech" | "Internal & B2B";

export type Project = {
  sector: Sector;
  client: string;
  name: string;
  description: string;
};

export type Build = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Public repo link; omit for private repos. */
  repo?: string;
  /** Live demo link (opens in a new tab). */
  live?: string;
  /** A playable web app: a "Play" button that opens the live site in a new tab. */
  play?: string;
  /** Optional status badge, e.g. "Postponed". */
  status?: string;
  /** Optional animated preview at the top of the card. */
  preview?: "tama" | "snitch" | "wangku" | "onikiri";
};

export const builds: Build[] = [
  {
    name: "Tama",
    tagline: "Agentic AI desktop companion",
    description:
      "A chibi-anime desktop companion that is also a real agentic AI: chat with memory, a Claude Code terminal, Gmail/Calendar/Drive integration, a Telegram bot, and productivity tools — all running locally with the user's own accounts. Shipped v1.0 with full documentation.",
    stack: ["Electron", "JavaScript", "Claude Code", "Google APIs", "Telegram Bot"],
    repo: "https://github.com/philipuscahyadi02-hub/tama",
    preview: "tama",
  },
  {
    name: "Onikiri",
    tagline: "Two-thumb samurai reflex game",
    description:
      "Enemies rush in from both sides; you strike, parry and unleash. Prototyped first as a Claude Artifact, then shipped as a static, serverless game: daily seeded waves, skill-card builds, an oni boss, unlockable characters, synthesized audio, offline play, and all progress saved in the browser.",
    stack: ["JavaScript", "HTML5 Canvas", "Web Audio", "PWA", "Claude Artifacts", "GitHub Pages"],
    repo: "https://github.com/philipuscahyadi02-hub/onikiri",
    play: "https://philipuscahyadi02-hub.github.io/onikiri/",
    preview: "onikiri",
  },
  {
    name: "SNITCH",
    tagline: "Social bluffing party game",
    description:
      "A 5-minute-per-round bluffing game for 4–8 players on their own phones: one player did it, everyone else knows the truth. Designed end to end — game design doc, PRD, architecture and 21 screen artboards — then built as a playable flow with a server-side Game Master edge function.",
    stack: ["TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Vercel"],
    play: "https://snitchbylip.vercel.app",
    preview: "snitch",
  },
  {
    name: "WangKu",
    tagline: "Personal debt, subscription & paylater ledger",
    description:
      "A personal finance ledger for debts, subscriptions, day-to-day expenses and credit/paylater tracking. Built as an experiment with gstack, a Claude Code agent skill suite; row-level security as the sole security boundary.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/philipuscahyadi02-hub/wangku",
    status: "Postponed",
    preview: "wangku",
  },
];

export const projects: Project[] = [
  {
    sector: "Internal & B2B",
    client: "PT Accelist Lentera Indonesia — Internal",
    name: "Procurement Management Module",
    description: "Developing a new module to streamline the procurement process.",
  },
  {
    sector: "Automotive",
    client: "PT Toyota Astra Motor",
    name: "Dealer Financing System",
    description:
      "Designed data mapping across systems to manage credit transactions between manufacturer, dealer, and banks. Delivered transaction reporting dashboards.",
  },
  {
    sector: "Automotive",
    client: "PT Toyota Astra Motor",
    name: "Dealer Financing Improvement",
    description:
      "Built a new feature integrating TAM with banking customer systems for seasonal credit features, cutting manual business process steps via system integration.",
  },
  {
    sector: "Automotive",
    client: "PT Toyota Astra Motor",
    name: "Networking System",
    description: "Contributed to employee data enhancement and reporting system design.",
  },
  {
    sector: "Automotive",
    client: "PT Isuzu Astra Motor Indonesia",
    name: "Customer Application — MY isuzuID",
    description:
      "Led service booking feature development; created operational dashboard specs and coordinated with service providers and dealers.",
  },
  {
    sector: "Internal & B2B",
    client: "GinanTech — Internal",
    name: "B2B Platform",
    description:
      "Conducted product benchmarking and user research interviews; managed development backlog in ClickUp and coordinated UI/UX-developer alignment.",
  },
  {
    sector: "HR Tech",
    client: "Paramount Enterprise International & Lion Super Indo",
    name: "Applicant Tracking System (ATS)",
    description: "Maintained product stability, resolved user issues, and drove upsell features based on feedback.",
  },
  {
    sector: "HR Tech",
    client: "Adarton Asia Pacific & Geprekin",
    name: "Human Resource Management System (HRMS)",
    description:
      "Translated client needs into technical specs (Payroll, Compensation, Attendance), co-designed custom UI, and led post-sales delivery timelines.",
  },
];
