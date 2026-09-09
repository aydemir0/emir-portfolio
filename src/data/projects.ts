// Projects — three-tier hierarchy for homepage selected work.

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeaturedProject {
  slug?: string;
  title: string;
  subtitle: string;
  status: string;
  stack: string[];
  description: string;
  links: ProjectLink[];
  level: 1 | 2 | 3;
  categories: string[];
}

export const projects: FeaturedProject[] = [
  // Level 1 — Flagship
  {
    slug: "hit-ai",
    title: "Hit.AI",
    subtitle: "AI Career Assistant",
    status: "Active Development",
    stack: ["Next.js", "TypeScript", "AI SDK", "Groq", "Vercel"],
    description:
      "AI career assistant combining streaming chat, structured job-posting analysis, tool-driven workflows, and evidence-based application prioritization (Apply / Maybe / Skip). Built with server-side secrets, prompt-injection guardrails, deterministic fallback, and resilience patterns.",
    links: [
      { label: "Case Study", href: "/projects/hit-ai" },
      { label: "GitHub", href: "https://github.com/aydemir0/Hit-the-Target---Hit.AI", external: true },
    ],
    level: 1,
    categories: ["AI", "Web"],
  },

  // Level 2 — Strong Selected
  {
    title: "Master of the Sands (Kumlarin Hakimi)",
    subtitle: "RPG Game Project",
    status: "Project",
    stack: ["Unity", "C#", "ElevenLabs API"],
    description:
      "RPG with cinematic sequences, dynamic animation transitions, and an interactive AI voice system using ElevenLabs. Designed and implemented game mechanics, combat, and narrative flows.",
    links: [],
    level: 2,
    categories: ["Game", "AI"],
  },
  {
    title: "Campus Social & Youth Network",
    subtitle: "Mobile Application",
    status: "Project",
    stack: ["Flutter", "Firebase"],
    description:
      "Campus-focused social mobile application for university students — event discovery, community feeds, and student network features.",
    links: [],
    level: 2,
    categories: ["Mobile"],
  },
  {
    title: "Ada Tarim",
    subtitle: "Agricultural Web Platform",
    status: "Delivered",
    stack: ["Next.js", "TypeScript"],
    description:
      "Production website built and delivered through Nef Ajans. Full ownership from architecture through deployment and SEO foundation.",
    links: [],
    level: 2,
    categories: ["Web"],
  },
  {
    slug: "emirs-galaxy",
    title: "Emir's Galaxy",
    subtitle: "Interactive 3D Portfolio Experiment",
    status: "Experimental",
    stack: ["Next.js", "React Three Fiber", "Three.js"],
    description:
      "Separate experimental 3D portfolio project — procedural geometry, spatial navigation, WebGL capability detection, and reduced-motion fallback. A demonstration of creative frontend engineering.",
    links: [
      { label: "View Case Study", href: "/projects/emirs-galaxy" },
      { label: "GitHub", href: "https://github.com/aydemir0/emirin-galaksisi", external: true },
    ],
    level: 2,
    categories: ["Web", "3D"],
  },

  // Level 3 — Archive
  {
    title: "Kinetic Energy Conversion System",
    subtitle: "Hardware / IoT Project",
    status: "Project",
    stack: ["Arduino", "C++", "IoT"],
    description: "Energy harvesting system using kinetic input — sensor integration, power management, embedded control.",
    links: [],
    level: 3,
    categories: ["Hardware"],
  },
  {
    title: "University Club Management",
    subtitle: "Desktop Application",
    status: "Project",
    stack: ["C#", ".NET", "MS SQL Server"],
    description: "Desktop management system for university club administration — member tracking, event scheduling, database layer.",
    links: [],
    level: 3,
    categories: ["Web"],
  },
];

// Engineering Evidence Index
export const evidenceIndex = [
  {
    domain: "AI Systems",
    description: "Streaming, structured outputs, tool calling, guardrails",
    proof: { label: "Hit.AI", href: "/projects/hit-ai" },
  },
  {
    domain: "Production Delivery",
    description: "End-to-end ownership, client delivery, deployment",
    proof: { label: "Nef Ajans / Ada Tarim", href: "#experience" },
  },
  {
    domain: "Mobile",
    description: "Flutter, Firebase, campus social application",
    proof: { label: "Campus Social", href: "#work" },
  },
  {
    domain: "3D / Interaction",
    description: "React Three Fiber, WebGL, spatial interfaces",
    proof: { label: "Emir's Galaxy", href: "/projects/emirs-galaxy" },
  },
  {
    domain: "Systems / Hardware",
    description: "Arduino, PLC, IoT, industrial automation",
    proof: { label: "SBA Muhendislik / Kinetic Energy", href: "#experience" },
  },
  {
    domain: "Testing / Reliability",
    description: "Vitest, Playwright, axe, failure-state engineering",
    proof: { label: "Hit.AI verification", href: "/projects/hit-ai" },
  },
];