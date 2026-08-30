# Personal Portfolio V2 Implementation Plan

## 1. Setup & Data Expansion
- **Action**: Create `src/data/case-studies.ts` and expand `src/data/portfolio.ts` with the new V2 data (Quick Profile, Proof mappings, Now section, Case Study content).
- **Testing**: Extend existing tests to ensure V2 required content (e.g. availability text, correct links) exists.

## 2. Global Theme & Styles
- **Action**: Update `src/app/globals.css` with light and dark theme CSS variables.
- **Action**: Implement a `ThemeProvider` component and a simple Theme Toggle in the navbar.
- **Action**: Ensure accessibility for the toggle and support system preference.

## 3. Component Refactoring
- **Action**: Move monolithic `page.tsx` sections into `src/components/` (Navbar, Hero, QuickProfile, Proof, Differentiators, Projects, Experience, Skills, Now, Notes, Contact).
- **Action**: Add `ActiveSectionNav` behavior to `Navbar` using `IntersectionObserver`.

## 4. Case Studies
- **Action**: Build dynamic `/projects/[slug]/page.tsx` or static routes for `hit-ai` and `emirs-galaxy`.
- **Action**: Implement `CaseStudyLayout` for consistent max-width and typography.
- **Action**: Implement `ArchitectureFlow` (CSS-based diagram) and `DecisionCard` components for the `hit-ai` case study.

## 5. Contact Section & Enhancements
- **Action**: Add "Copy email" functionality with accessible feedback.
- **Action**: Refine mobile layout constraints (ensure bento collapse cleanly and no overflow).
- **Action**: Add basic JSON-LD Person structured data to `layout.tsx` or `page.tsx`.

## 6. Testing & Quality Gate
- **Action**: Write tests for V2 behaviors (availability, theme toggle, case study routing, copy email).
- **Action**: Run `vitest`, `eslint`, and `next build` to verify integrity.
