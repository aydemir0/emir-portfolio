# Personal Portfolio Design Spec - 2026-08-30

## Positioning & Goal
- **Subject**: Muhammed Emir Aydın
- **Roles**: Computer Engineering Student, Full-Stack & AI Product Developer, Founder & Builder
- **Core Goal**: A polished, professional personal website for CV, LinkedIn, internship applications, and networking.
- **Key Impression**: Founder+Developer, AI Product Engineering, Multidisciplinary, Builder mentality.
- **Tone**: Professional first. Personality second. Visual effects third. No gimmicky animations or AI-generated SaaS aesthetics.

## Visual Direction
- **Theme**: Modern, premium, engineering-focused dark mode.
- **Background**: Deep ink/navy-black (e.g. `#080B12`, `#0B1020`, `#101624`). Subtle radial gradient, grid pattern, or soft glow.
- **Text**: Soft white (primary), muted slate (secondary).
- **Accents**: Clean electric blue (`#4F8CFF`), subtle cyan.
- **Typography**: Existing `Geist` and `Geist Mono` fonts. Tight tracking for headings, comfortable line-height for body.
- **Layout**: Centered max-width (1120-1200px), generous whitespace. Alternating section layouts (bento, cards, open areas).

## Content Architecture

### 1. Navigation
- **Left**: MEA or Muhammed Emir
- **Right**: Work, About, Experience, Skills, Contact
- **CTA**: Book a Call
- **Style**: Sticky, subtle backdrop blur.

### 2. Hero
- **Eyebrow**: COMPUTER ENGINEERING · AI · PRODUCT DEVELOPMENT
- **Name**: Muhammed Emir Aydın
- **Headline**: I build software products from idea to production.
- **Subcopy**: Computer Engineering student, founder and developer working across full-stack applications, AI products, mobile systems and interactive software.
- **CTAs**: View My Work, Download CV, Book a Call (compact).
- **Socials**: LinkedIn, GitHub.

### 3. Currently Building Strip
- Small high-signal strip.
- **Text**: Currently building → Hit.AI
- **Description**: An AI career assistant combining streaming, structured analysis, tool-driven workflows and job application prioritization.

### 4. What Sets Me Apart (Bento)
- 4 cards:
  1. Founder & Developer (Nef Ajans)
  2. AI Product Engineering (structured outputs, tool calling)
  3. Cross-Disciplinary Engineering (web, mobile, games, IoT)
  4. Ship, Test, Improve (focus on real environments and iteration)

### 5. Selected Work
- **Featured**: Hit.AI (AI Career Assistant) with large visual weight. Mention AI SDK, Groq, Anthropic, structured analysis, etc. Public GitHub link.
- **Project 2**: Master of the Sands (RPG Game Project). No fake link.
- **Project 3**: Campus-Social & Youth Network (Flutter/Firebase).
- **Project 4**: Emir's Galaxy (React Three Fiber). Public GitHub link.
- **More projects**: Kinetic Energy Conversion System, University Club Management.

### 6. About
- 2 concise paragraphs: 3rd-year CS student at Kütahya Dumlupınar University, founder/developer, interest in multidisciplinary products and AI.

### 7. Experience
- Vertical timeline.
  - **Nef Ajans**: Founder & Developer (Jan 2026 - Present)
  - **SBA Mühendislik**: Engineering Intern (Jan 2026 - Feb 2026)
- **Education**: Kütahya Dumlupınar University, B.Sc. Computer Engineering (2023 - 2027 Expected)

### 8. Skills
- Structured groups: Languages, Web / Frameworks, AI / APIs, Engineering, Hardware. No percentage bars.

### 9. Learning & Certifications
- In Progress: FlyRank AI Internship
- Completed: Anthropic Academy, Google Cybersecurity, BTK Akademi, Turkcell.
- **Placeholder**: FlyRank Completion Badge (clearly stated as "Will be added after capstone approval").

### 10. Beyond Code
- Achievements (Scrabble 2nd, Trivia 3rd, Article 52nd).
- Languages (TR, EN, DE).
- Interests & Sports & Music.

### 11. Notes & Capstone
- Empty states for future writing and capstone work.

### 12. Contact
- Headline: Let's build something useful.
- CTA: Book a 30-minute call
- Links: Booking URL, LinkedIn, GitHub, Email, DNS Walkthrough.

## Pages
- `/`: Main portfolio
- `/dns`: DNS walkthrough explanation page (simple learning note format).
- `/Muhammed-Emir-Aydin-CV.pdf`: Browser-viewable CV with download option.

## Interaction & Accessibility
- Interactions: Hover states, subtle border/background transitions, smooth scroll. Respect `prefers-reduced-motion`.
- Accessibility: Landmarks, heading hierarchy, keyboard focus, high contrast, aria attributes.

## Performance
- No heavy WebGL/Three.js on the main site.
- Use Server Components by default. Client components only when needed.

## SEO
- Title: Muhammed Emir Aydın | Full-Stack & AI Product Developer
- Description: Computer Engineering student, full-stack & AI product developer building end-to-end software solutions.
- Favicon: Simple MEA monogram SVG.
