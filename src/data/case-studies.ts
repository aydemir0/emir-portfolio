export type ProjectStatus = "active" | "project" | "experimental" | "archived";

export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  overview: string;
  problem?: string;
  goal?: string;
  architecture?: {
    description: string;
    flow: string[];
    providers?: string[];
  };
  features?: {
    title: string;
    description: string;
  }[];
  engineeringChallenges?: {
    title: string;
    issue: string;
    fix: string;
  }[];
  engineeringDecisions?: {
    decision: string;
    why: string;
    tradeoff?: string;
  }[];
  security?: string[];
  verification?: string[];
  learnings?: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: "hit-ai",
    title: "Hit.AI",
    subtitle: "AI Career Assistant",
    status: "active",
    overview: "An AI career assistant combining streaming, structured analysis, tool-driven workflows and job application prioritization.",
    problem: "Career tools often give generic advice and opaque scores, leaving candidates guessing why they weren't matched.",
    goal: "Build an evidence-based AI career assistant that can analyze structured career information reliably and provide useful UI states.",
    architecture: {
      description: "Server-side route handler receives user input and passes it through the Vercel AI SDK to Groq. Typed tool schemas define the output contract, which the model fills and the server returns as structured data rendered as Generative UI.",
      flow: [
        "User Input / Job Posting",
        "Next.js Server Action",
        "Vercel AI SDK",
        "Groq",
        "Tool Execution",
        "Structured Output",
        "Generative UI"
      ],
      providers: ["Groq (primary)", "Demo fallback"]
    },
    features: [
      {
        title: "Generative UI",
        description: "Structured tool outputs are rendered as typed UI rather than untrusted loose text, ensuring reliable visual state."
      },
      {
        title: "Job Application Prioritizer Agent",
        description: "Analyzes candidate profile data against job postings. Inspects requirements, compares via AI, and recommends Apply / Maybe / Skip with confirmed matches, gaps, and next actions."
      },
      {
        title: "Reliability Engineering",
        description: "Handles mid-stream failure states, rate limits, and slow-response states with deterministic sabotage testing, resilience mechanisms, and fallback behavior."
      }
    ],
    engineeringChallenges: [
      {
        title: "AI SDK v7 Tool Schema Issue",
        issue: "Old `parameters` usage caused real Groq tool-calling failure.",
        fix: "Fixed using the newer `tool({ inputSchema, execute })` pattern."
      },
      {
        title: "Next.js Server Action Schema Export",
        issue: "Exporting a Zod schema from a `'use server'` file triggered: \"A 'use server' file can only export async functions, found object.\"",
        fix: "Schema definition moved to a pure module outside the server action file."
      }
    ],
    engineeringDecisions: [
      {
        decision: "Structured output",
        why: "Predictable UI contracts"
      },
      {
        decision: "Provider fallback",
        why: "App remains usable without one specific provider"
      },
      {
        decision: "Server-side provider selection",
        why: "Keeps API credentials out of the browser"
      }
    ],
    security: [
      "Prompt injection protection from job-posting text",
      "Evidence-only candidate claims (no fabricated experience)",
      "No hiring prediction or fake score mechanisms"
    ],
    verification: [
      "Automated tests (Vitest)",
      "Linting and Type Checking",
      "Manual deployment scenarios"
    ],
    learnings: [
      "AI features still require ordinary software engineering discipline",
      "Structured interfaces make AI features more reliable",
      "Failure states need to be designed intentionally",
      "Testing real integration paths reveals issues mocks miss"
    ],
    links: {
      github: "https://github.com/aydemir0/Hit-the-Target---Hit.AI"
    }
  },
  {
    slug: "emirs-galaxy",
    title: "Emir's Galaxy",
    subtitle: "Interactive 3D Portfolio",
    status: "experimental",
    overview: "Explore a more experimental, spatial way of presenting software projects.",
    goal: "Explore a more experimental, spatial way of presenting software projects.",
    features: [
      {
        title: "3D Environment / Navigation",
        description: "An interactive spatial layout utilizing Next.js and React Three Fiber."
      }
    ],
    engineeringChallenges: [
      {
        title: "Performance & Usability",
        issue: "Balancing rich 3D interaction with usability and loading performance.",
        fix: "Optimized WebGL rendering and minimized unnecessary geometry."
      }
    ],
    learnings: [
      "Creative frontend experimentation",
      "3D web development constraints",
      "Interaction design in spatial contexts",
      "Technical curiosity"
    ],
    links: {
      github: "https://github.com/aydemir0/emirin-galaksisi"
    }
  }
];
