# Premium Polish Design Spec V2.1

## Core Goals
- Intentional, polished, recruiter-friendly
- Retain existing strong visual identity; subtraction rather than addition
- Build /recruiter mode tailored for fast parsing and printing

## Structure & Architecture
- Maintain server components, only using `use client` when necessary (e.g. filters, TOC, sharing, active nav).
- Create a dedicated `/recruiter` page mirroring the printable quick-scan requirements.
- Create `/not-found.tsx` to handle 404s gracefully.
- Introduce sticky Table of Contents (TOC) and subtle reading progress on Case Study pages.
- Add project filters to the main homepage's `Selected Work` section.

## Typography & Presentation
- Editorial numbering (`01`, `02`, etc.) in muted tones for sections.
- Premium typography scaling across 375px through 1440px.
- Subtle `prefers-reduced-motion` compatible animations for interactions (pulse, hover arrows).

## Technical Case Studies
- Refine Case Study layout adding:
  - Reading progress line (1-2px, top of viewport)
  - Copy Case Study link
  - Next Project links
  - Decision / Why / Tradeoff blocks
  - Real Engineering Issue callouts

## Accessibility & SEO
- ARIA for filter buttons and active navs.
- `metadata` specifically for `/projects/hit-ai`, `/projects/emirs-galaxy`, and `/recruiter`.
- Print stylesheets (`@media print`) targeting recruiter mode and case studies to strip interactive controls.
