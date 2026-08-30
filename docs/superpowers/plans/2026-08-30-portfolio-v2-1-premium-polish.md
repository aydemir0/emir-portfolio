# Premium Polish Implementation Plan V2.1

## Phase 1: Data Expansion & Shared Utilities
- Expand `portfolio.ts` with explicit project categories (`AI`, `Web`, `Mobile`, `Game`, `Hardware`) for filtering.
- Ensure status flags map exactly to required strings (`Active Development`, `Experimental Portfolio`, `Project`).
- Enhance case study data to support "Built/Learned/Next" blocks, deeper decision tracking (with tradeoffs).

## Phase 2: TDD Test Setup
- Write `TEST 1` through `TEST 18` in `portfolio-v2-1.test.tsx` capturing all constraints (recruiter rendering, no fake metrics, filters, TOC presence, etc).

## Phase 3: Recruiter Mode & 404
- Implement `src/app/recruiter/page.tsx`. Focus on dense information packing, print CSS stripping nav/theme controls.
- Implement `src/app/not-found.tsx` with a simple "Page not found" and returning links.

## Phase 4: Homepage Polish
- Add editorial numbering to sections (`01 Selected Work`, etc.).
- Add client-side `ProjectFilter` component to `<section id="work">`.
- Refine "How I Work" section and optionally "What I Care About".
- Enhance hero availability dot with gentle pulse.
- Introduce mobile sticky action strip.

## Phase 5: Case Study Upgrades
- Implement `CaseStudyTOC` (sticky on desktop, hidden/compact on mobile).
- Implement `ReadingProgress` component.
- Add "Copy Link" capability and structured "Real Engineering Issue" callouts.

## Phase 6: Noise Reduction, CSS, & Verification
- Simplify excessive styling. Add `print` media queries.
- Add central motion tokens to CSS variables.
- Execute full test suite, lint, build.
