# Personal Portfolio Plan - 2026-08-30

## 1. Setup & Pre-requisites
- Locate and copy `Muhammed_Emir_Aydin_CV_Professional_v3.pdf` to `public/Muhammed-Emir-Aydin-CV.pdf`.
- Create a simple SVG favicon for `public/favicon.ico` or `icon.svg`.
- Setup simple test environment (`vitest` and `@testing-library/react`).

## 2. Architecture & Data
- Create `src/data/portfolio.ts` to centralize all textual content, links, and structured info.
- This separates content from presentation and allows strict TDD for content verification.

## 3. Component Structure
- `src/components/portfolio/`
  - `Navbar.tsx`
  - `Hero.tsx`
  - `CurrentlyBuilding.tsx`
  - `Differentiators.tsx`
  - `Projects.tsx` (and `ProjectCard.tsx`)
  - `About.tsx`
  - `Experience.tsx`
  - `Skills.tsx`
  - `Learning.tsx`
  - `BeyondCode.tsx`
  - `NotesCapstone.tsx`
  - `Contact.tsx`
  - `Footer.tsx`

## 4. Design Implementation
- Update `tailwind.config` or global variables in `src/app/globals.css` with the deep dark theme (`#080B12`), primary text, and accents.
- Make all layouts responsive and adhere to max-width ~1120px.

## 5. DNS Page
- Create `src/app/dns/page.tsx` for the DNS walkthrough.
- Create `docs/DNS_WALKTHROUGH.md`.

## 6. Testing Strategy (Strict TDD)
- Test A (Content): Verify name, positioning, and "Hit.AI" appear.
- Test B (Links): Verify LinkedIn, GitHub, Booking, and CV links exactly match requirements.
- Test C (Projects): Verify Hit.AI public URL; check no fake links for private projects.
- Test D (FlyRank): Verify badge is marked as "Will be added after capstone approval".
- Test E (DNS Page): Verify DNS concepts are mentioned.
- Test F (Nav): Verify anchor navigation and CTAs.

## 7. Execution Order
1. Tests Setup
2. Data & Content Models
3. Implement Components (Red -> Green -> Refactor)
4. Pages Assembly (`/` and `/dns`)
5. Visual Polish
6. Final Verification (Lint, Build, Tests)
