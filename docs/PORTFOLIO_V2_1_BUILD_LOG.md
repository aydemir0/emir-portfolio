# Portfolio V2.1 Build Log

## Planned Iterations
- Refactoring `page.tsx` for cleaner filtering and semantic numbering.
- Ensuring tests capture strict requirements like "no fake ATS" explicitly.
- Designing for print directly in the component structure instead of monolithic overrides.

*Log will be updated as iterations reveal real issues.*

## Navigation Regression
- **Issue**: Manual browser verification discovered hash/scroll mismatch. Navigating to 'Experience' or 'Skills' updated the URL hash but the viewport remained stuck around Contact. The active indicator was also broken.
- **Root Cause**: The sections with \id=\
experience\\ and \id=\skills\\ did not actually exist in \page.tsx\. 'About & Experience' was a single section (\#about\), and 'Skills' was mistakenly named \id=\proof\\.
- **Fix**: Split About and Experience into separate \<section id=\
about\>\ and \<section id=\experience\>\ wrappers. Renamed \#proof\ to \#skills\. Wrote RED/GREEN \portfolio-v2-1-bugfixes.test.tsx\ to ensure these IDs strictly exist.

## Selected Work Visual Regression
- **Issue**: Manual review showed V2.1 flattened the V2 project hierarchy. Hit.AI and Emir's Galaxy lacked the distinctive card visuals and looked identical to smaller projects.
- **Root Cause**: The refactoring to \ilteredProjects.map()\ homogenized all projects into standard text rows, dropping the specialized featured layouts for flagship projects.
- **Fix**: Conditionally rendered custom CSS grid cards inside the map. Restored a 2-column abstract visualization for Hit.AI showing Streaming/Structured/Resilience capabilities. Built a CSS-only space orbit for Emir's Galaxy with \prefers-reduced-motion\ support. Enforced RED/GREEN tests for the capabilities and animation rules.
