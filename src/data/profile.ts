// Profile — identity, education, skills, beyond-code
// Single source of truth consumed by homepage, recruiter page, and metadata.

export const profile = {
  name: "Muhammed Emir Aydin",
  shortName: "Emir",
  title: "AI & Full-Stack Engineer",
  eyebrow: "4th-year Computer Engineering · AI · Full-Stack · Systems",
  headline: "I design and ship AI, web, and interactive systems end-to-end.",
  statement:
    "Computer Engineering student and founder who works across the full stack — from architecture to deployment. I build production-grade systems that combine AI capabilities, web, mobile, and hardware.",
  availability: "Open to software engineering internships, junior engineering roles, and international opportunities",
  location: "Kutahya, Turkey",
  currentlyBuilding: {
    name: "Hit.AI",
    description:
      "AI career assistant with streaming, structured job-posting analysis, tool-driven workflows, and application prioritization.",
    url: "/projects/hit-ai",
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/",
    github: "https://github.com/aydemir0",
    email: "muhammedeira@gmail.com",
    calendar: "https://calendar.app.google/bQPjLoWdk7Fq3bHg6",
    cv: "/Muhammed-Emir-Aydin-CV.pdf",
  },

  education: {
    university: "Kutahya Dumlupinar University",
    degree: "B.Sc. Computer Engineering",
    period: "2023 – 2027 (expected)",
    year: "4th year",
  },

  about: [
    "4th-year Computer Engineering student at Kutahya Dumlupinar University, building end-to-end software systems alongside coursework. As founder of Nef Ajans I own the full lifecycle: requirements, technical decisions, implementation, deployment, and client communication.",
    "My work spans AI product engineering, full-stack web, mobile (Flutter), and hardware/industrial systems. I am comfortable moving between architecture and implementation, and I care about building things that are reliable, tested, and maintainable.",
  ],

  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Dart", "C#", "C++", "SQL", "Assembly"],
    web: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs", ".NET"],
    ai: [
      "Vercel AI SDK",
      "Groq",
      "structured outputs",
      "tool calling",
      "streaming",
      "evaluation workflows",
      "guardrails",
    ],
    mobile: ["Flutter", "Firebase"],
    testing: ["Vitest", "Playwright", "axe", "Git", "GitHub Actions", "Vercel", "CI/CD"],
    hardware: ["Arduino", "IoT", "PLC", "hardware / software diagnostics"],
  },

  learning: [
    {
      name: "Anthropic Academy",
      detail: "AI Fluency training",
      status: "Completed",
    },
    {
      name: "Google Cybersecurity Certificate",
      detail: "Coursera",
      status: "Completed",
    },
    {
      name: "BTK Akademi",
      detail: "Web Development with HTML5, Introduction to AI, C# Programming and SQL with Applications",
      status: "Completed",
    },
    {
      name: "Turkcell Gelecegi Yazanlar",
      detail: "Java, C#",
      status: "Completed",
    },
  ],

  beyondCode: {
    achievements: [
      "Inter-High School Scrabble Tournament — 2nd Place",
      "Eastern Anatolia Regional Trivia Competition — 3rd Place",
      "Eastern Anatolia Article Writing Competition — 52nd Place",
    ],
    languages: ["Turkish — Native", "English — B2", "German — A2"],
    interests: ["sci-fi", "retro console games", "skiing", "design", "language learning"],
    sports: ["volleyball", "handball", "badminton", "skiing"],
  },
};
