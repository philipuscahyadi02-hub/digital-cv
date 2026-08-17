export const profile = {
  name: "Philipus Cahyadi",
  roles: ["Business Analyst", "Presales Consultant", "Product Manager"],
  tagline:
    "Bridging technology and purpose, IT Business Analyst passionate about product development and driving social innovation through impactful solutions.",
  location: "North Jakarta, Jakarta",
  email: "philipus.cahyadi02@gmail.com",
  phone: "+62 822 6932 2040",
  summary:
    "A results-driven professional with a strong foundation in Information Systems and a dedication to continuous technological exploration and relevance. I thrive as the key interface, prioritizing direct stakeholder communication to champion innovation and translate strategic needs into practical, high-impact digital solutions. Proven in bridging the gap between presales discovery and technical execution—delivering across diverse sectors including Automotive, Logistics, HRMS, and B2B Platforms—my core strength lies in solutioning complex challenges into actionable roadmaps. I am committed to leading cross-functional teams and ensuring timely, high-quality delivery of every project.",
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
};

export type Project = {
  client: string;
  name: string;
  description: string;
};

export const projects: Project[] = [
  {
    client: "PT Accelist Lentera Indonesia — Internal",
    name: "Procurement Management Module",
    description: "Developing a new module to streamline the procurement process.",
  },
  {
    client: "PT Toyota Astra Motor",
    name: "Dealer Financing System",
    description:
      "Designed data mapping across systems to manage credit transactions between manufacturer, dealer, and banks. Delivered transaction reporting dashboards.",
  },
  {
    client: "PT Toyota Astra Motor",
    name: "Dealer Financing Improvement",
    description:
      "Built a new feature integrating TAM with banking customer systems for seasonal credit features, cutting manual business process steps via system integration.",
  },
  {
    client: "PT Toyota Astra Motor",
    name: "Networking System",
    description: "Contributed to employee data enhancement and reporting system design.",
  },
  {
    client: "PT Isuzu Astra Motor Indonesia",
    name: "Customer Application — MY isuzuID",
    description:
      "Led service booking feature development; created operational dashboard specs and coordinated with service providers and dealers.",
  },
  {
    client: "GinanTech — Internal",
    name: "B2B Platform",
    description:
      "Conducted product benchmarking and user research interviews; managed development backlog in ClickUp and coordinated UI/UX-developer alignment.",
  },
  {
    client: "Paramount Enterprise International & Lion Super Indo",
    name: "Applicant Tracking System (ATS)",
    description: "Maintained product stability, resolved user issues, and drove upsell features based on feedback.",
  },
  {
    client: "Adarton Asia Pacific & Geprekin",
    name: "Human Resource Management System (HRMS)",
    description:
      "Translated client needs into technical specs (Payroll, Compensation, Attendance), co-designed custom UI, and led post-sales delivery timelines.",
  },
];
