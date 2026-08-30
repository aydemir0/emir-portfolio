export const portfolioData = {
  hero: {
    availability: "Open to internships & junior software / AI opportunities",
    eyebrow: "COMPUTER ENGINEERING · AI · PRODUCT DEVELOPMENT",
    name: "Muhammed Emir Aydın",
    headline: "I build software products from idea to production.",
    subcopy: "Computer Engineering student, founder and developer working across full-stack applications, AI products, mobile systems and interactive software.",
    ctas: {
      primary: { label: "View My Work", href: "#work" },
      secondary: { label: "View CV", href: "/Muhammed-Emir-Aydin-CV.pdf" },
      compact: { label: "Book a Call", href: "https://calendar.app.google/bQPjLoWdk7Fq3bHg6" }
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/",
      github: "https://github.com/aydemir0",
      email: "muhammedeira@gmail.com"
    }
  },
  quickProfile: {
    role: "Full-Stack & AI Product Developer",
    education: "B.Sc. Computer Engineering, Kütahya Dumlupınar University, Expected 2027",
    status: "Open to internships & junior opportunities",
    currentFocus: "AI products · Full-stack systems",
    currentlyBuilding: "Hit.AI"
  },
  currentlyBuilding: {
    name: "Hit.AI",
    status: "Active development",
    description: "AI career assistant combining streaming, structured analysis, tool-driven workflows and job application prioritization.",
    url: "/projects/hit-ai" // points to case study now
  },
  proof: [
    { skill: "AI product engineering", projects: [{ name: "Hit.AI", href: "/projects/hit-ai" }] },
    { skill: "React / Next.js", projects: [{ name: "Hit.AI", href: "/projects/hit-ai" }, { name: "Emir's Galaxy", href: "/projects/emirs-galaxy" }] },
    { skill: "Mobile development", projects: [{ name: "Campus-Social", href: "#work" }] },
    { skill: "Game development", projects: [{ name: "Master of the Sands", href: "#work" }] },
    { skill: "IoT / hardware", projects: [{ name: "Kinetic Energy Conversion System", href: "#work" }] },
    { skill: "Industrial automation", projects: [{ name: "SBA Mühendislik", href: "#experience" }] },
    { skill: "Founder / delivery", projects: [{ name: "Nef Ajans", href: "#experience" }] }
  ],
  differentiators: [
    {
      title: "Founder & Developer",
      description: "Owns both technical implementation and product/client delivery through Nef Ajans."
    },
    {
      title: "AI Product Engineering",
      description: "Builds AI features using structured outputs, tool calling, streaming, provider fallback and resilience patterns.",
      anchor: { label: "Hit.AI →", href: "/projects/hit-ai" }
    },
    {
      title: "Cross-Disciplinary Engineering",
      description: "Experience across web, mobile, games, IoT and industrial automation."
    },
    {
      title: "Ship, Test, Improve",
      description: "Focuses on getting software running in real environments, testing failure states and iterating from real feedback."
    }
  ],
  featuredWork: [
    {
      slug: "hit-ai",
      title: "Hit.AI",
      subtitle: "AI Career Assistant",
      status: "Active Development",
      stack: ["Next.js", "TypeScript", "AI SDK", "Groq", "Anthropic", "Vercel"],
      githubUrl: "https://github.com/aydemir0/Hit-the-Target---Hit.AI",
      caseStudyUrl: "/projects/hit-ai",
      description: "Implemented streaming AI chat, structured job-posting analysis, generative UI, Groq / Anthropic provider support, deterministic fallback, resilience and retry states, job application prioritizer agent, evidence-based Apply / Maybe / Skip reasoning, and prompt-injection guardrails.",
      featured: true
    },
    {
      slug: "emirs-galaxy",
      title: "Emir's Galaxy",
      subtitle: "Interactive 3D Portfolio",
      status: "Experimental Portfolio",
      stack: ["Next.js", "React Three Fiber"],
      githubUrl: "https://github.com/aydemir0/emirin-galaksisi",
      caseStudyUrl: "/projects/emirs-galaxy",
      description: "An interactive space-themed 3D portfolio / project exploration experience.",
      featured: true // Elevated to featured for V2
    },
    {
      title: "Master of the Sands (Kumların Hakimi)",
      subtitle: "RPG Game Project",
      status: "Project",
      stack: ["Unity", "C#", "ElevenLabs API"],
      description: "RPG project with cinematic sequences, dynamic animation transitions and an interactive AI voice system using ElevenLabs.",
      featured: false
    },
    {
      title: "Campus-Social & Youth Network",
      status: "Project",
      stack: ["Flutter", "Firebase"],
      description: "A campus-focused social mobile application for university students.",
      featured: false
    }
  ],
  moreProjects: [
    {
      title: "Kinetic Energy Conversion System",
      stack: ["Arduino", "C++", "IoT"]
    },
    {
      title: "University Club Management",
      stack: ["C#", ".NET", "MS SQL Server"]
    }
  ],
  now: [
    "Building Hit.AI (AI career assistant).",
    "Developing AI product engineering skills.",
    "Completing FlyRank AI internship work."
  ],
  about: [
    "I'm a 3rd-year Computer Engineering student at Kütahya Dumlupınar University, but I've always approached my education with a builder's mentality. As a founder and developer, I've spent my time building end-to-end products rather than just completing coursework.",
    "My curiosity spans multidisciplinary software and hardware engineering. Recently, I've been focused heavily on AI product development—moving beyond simple chat wrappers to build resilient, agentic workflows with structured data and fallback patterns."
  ],
  experience: [
    {
      company: "Nef Ajans",
      role: "Founder & Developer",
      date: "Jan 2026 - Present",
      points: [
        "End-to-end web/digital project delivery",
        "Managing client requirements through production",
        "Built the Ada Tarım website and established SEO foundation",
        "Technical and operational ownership"
      ]
    },
    {
      company: "SBA Mühendislik",
      role: "Engineering Intern",
      location: "Antalya",
      date: "Jan 2026 - Feb 2026",
      points: [
        "PLC industrial automation",
        "Software/hardware optimization",
        "Troubleshooting and hardware communication"
      ]
    }
  ],
  education: {
    university: "Kütahya Dumlupınar University",
    degree: "B.Sc. Computer Engineering",
    date: "2023 - 2027 Expected"
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Dart", "C#", "C++", "SQL", "Assembly"],
    web: ["Next.js", "React", "Node.js", ".NET", "Flutter", "Firebase"],
    ai: ["AI SDK", "Groq", "Anthropic API", "ElevenLabs API", "structured outputs", "tool calling", "REST APIs"],
    engineering: ["Git", "GitHub", "Vercel", "testing", "responsive UI", "accessibility basics"],
    hardware: ["Arduino", "IoT", "PLC"]
  },
  learning: [
    { name: "FlyRank AI Internship", detail: "General AI Fluency & Front-end AI Engineering", status: "In progress" },
    { name: "Anthropic Academy", detail: "AI Fluency training", status: "Completed" },
    { name: "Google Cybersecurity Certificate", detail: "Coursera", status: "Completed" },
    { name: "BTK Akademi", detail: "Web Development with HTML5, Introduction to AI, C# Programming & SQL with Applications", status: "Completed" },
    { name: "Turkcell Geleceği Yazanlar", detail: "Java, C#", status: "Completed" }
  ],
  beyondCode: {
    achievements: [
      "Inter-High School Scrabble Tournament — 2nd Place",
      "Eastern Anatolia Regional Trivia Competition — 3rd Place",
      "Eastern Anatolia Article Writing Competition — 52nd Place"
    ],
    languages: ["Turkish — Native", "English — B2", "German — A2"],
    interests: ["sci-fi", "retro console games", "skiing", "design", "language learning", "exploring new places"],
    sports: ["volleyball", "handball", "badminton", "skiing"],
    music: ["guitar", "flute"]
  }
};
