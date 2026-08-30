# Portfolio V2 Build Log

## Initial Architecture
- Next.js 16 (App Router), Tailwind CSS v4, basic Vitest setup.
- Everything was in `page.tsx` and statically typed in `src/data/portfolio.ts`. No separate components directory existed.

## Upgrades Planned
- Refactor monolithic `page.tsx` into modular `src/components/`.
- Add dark/light theme support using Next.js compatible strategies.
- Add dynamic routing for case studies.
