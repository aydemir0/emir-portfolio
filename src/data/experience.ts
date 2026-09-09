// Experience — professional and internship history
// Ordered for the homepage journey: first professional milestone to latest.

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  date: string;
  points: string[];
  note?: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: "SBA Muhendislik",
    role: "Engineering Intern",
    location: "Antalya",
    date: "2026",
    points: [
      "PLC programming and industrial automation",
      "Hardware/software communication and diagnostics",
      "Industrial control troubleshooting",
    ],
  },
  {
    company: "Nef Ajans",
    role: "Founder & Developer",
    date: "Jan 2026 – Present",
    points: [
      "End-to-end digital project ownership — requirements through production deployment",
      "Technical and operational decision-making across client engagements",
      "Built Ada Tarim web presence: architecture, implementation, SEO foundation",
      "Client communication, scope definition, and delivery management",
    ],
  },
  {
    company: "FlyRank",
    role: "AI & Frontend Engineering",
    date: "2026",
    points: [
      "Applied AI fluency and general AI engineering concepts in a structured program",
      "Frontend AI integration work as part of assigned engineering tasks",
      "Completed capstone project — AI Fluency certification awarded",
    ],
  },
  {
    company: "Ditravo",
    role: "Information & Communication Technologies",
    date: "2026",
    points: [
      "Worked in information and communication technologies, contributing to applied technical processes, digital systems exposure, and operational support.",
    ],
  },
];
