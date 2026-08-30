# Personal Portfolio V2 Design Spec - 2026-08-30

## V2 Upgrades
- Upgrading to a recruiter-friendly engineering portfolio.
- Goal: Make the site clearly state availability and deeply explain technical depth through case studies.

## New Content & Sections
- **Availability Chip**: "Open to internships & junior software / AI opportunities" (in the hero).
- **Quick Profile**: 5 quick facts (Role, Education, Status, Current Focus, Currently Building).
- **Currently Building V2**: Enhancing Hit.AI display with an "Active Development" status.
- **Proof, Not Buzzwords**: Mapping raw skills to actual projects (e.g. AI product engineering → Hit.AI).
- **Now**: Compact section detailing current focus.
- **Notes & Capstone V2**: Structured empty states for future writing and capstone.
- **Case Studies**: 
  - `Hit.AI` (`/projects/hit-ai`) - Focus on architecture, structured output, error resilience.
  - `Emir's Galaxy` (`/projects/emirs-galaxy`) - Focus on experimental 3D/frontend design.
- **Contact V2**: Add "Copy email" button.

## Visual & Interaction Updates
- **Theme System**: Add Dark/Light/System theme toggle (Default: System). Dark mode remains signature.
- **Active Section Nav**: Subtle indication of current scroll position in the sticky navbar.
- **Motion System**: Subtle reveals, hover lifts. No noisy animations.
- **Case Study Flow**: Back links and "Next Project" links to avoid trapping users. Highly readable typography (max width 700-760px).
- **HTML/CSS Diagram**: A semantic CSS-based flow diagram for Hit.AI architecture (no images, no mermaid).

## Accessibility & SEO
- ARIA expanded, visible focus, contrast compliance.
- Reduced motion support.
- JSON-LD Person structured data.
- Case-study specific metadata titles and descriptions.
