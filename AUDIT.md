# Accessibility and Performance Audit

## Scope

Pages:
- /
- /3d

Live baseline:
https://emir-portfolio-two.vercel.app

After-audit preview:
https://muhammed-emir-aydin-llmgonnrc-aydemir0s-projects.vercel.app

## Lighthouse baseline

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| / | 99 | 96 | 100 | 100 |
| /3d | 83 | 93 | 100 | 100 |

## Baseline issues

- Contrast issue in Dark Mode: The primary `--accent` color `#4F8CFF` used as a background on buttons with white text failed contrast requirements (3.21:1).
- Unlabeled graphics: SVG icons in `ThemeToggle.tsx` and `CopyCaseStudyLink.tsx` lacked `aria-hidden="true"`, causing screen-reader noise.
- Form accessibility: `autocomplete` attributes were missing on the Contact Form Name and Email fields.
- Heading order: The `/3d` page had a skipped heading level (from `<h1>` down to `<h3>`).
- Performance: `/3d` performance was 83 mainly due to LCP and lazy-loaded WebGL chunks (FCP 2.9s, LCP 3.4s).

## WAVE baseline

WAVE MANUAL VERIFICATION REQUIRED

## Keyboard baseline

- **Home primary flow**: PASS. Tab navigation flows sequentially from the header down to the footer. All links, filter buttons, and form inputs are reachable. No keyboard traps were identified.
- **3D configurator**: PASS. Interactive elements (color buttons, activate energy button) are fully keyboard-reachable. Focus visibility is handled well natively.

## Changes made

Problem: SVG elements acted as noise to screen readers without text alternatives.
Fix: Added `aria-hidden="true"` to SVGs in `ThemeToggle.tsx` and `CopyCaseStudyLink.tsx`.
Evidence: Semantic test added to `portfolio.test.tsx` checking for `svg[aria-hidden="true"]`.

Problem: Missing autocomplete hints on standard form fields.
Fix: Added `autoComplete="name"` and `autoComplete="email"` to the respective contact form inputs.
Evidence: Semantic test updated in `ContactForm.test.tsx`.

Problem: The button text contrast failed in dark mode (white text on a light blue background).
Fix: Added `dark:text-slate-900` to all elements utilizing `bg-accent text-white`, keeping the vibrant `--accent` but increasing contrast dramatically.
Evidence: Lighthouse run after fixes resolved contrast warnings.

Problem: Skipped heading levels on the 3D page.
Fix: Changed `<h3>` configurator labels to `<h2>` in `ThreeExperience.tsx`.
Evidence: Lighthouse run after fixes resolved heading order warnings.

## Lighthouse after

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| / | 99 | 100 | 100 | 60* |
| /3d | 93 | 100 | 100 | 60* |

*Note: SEO drops to 60 artificially in the preview environment due to Vercel's `x-robots-tag: noindex` header on preview deployments.

## Performance delta

Home Performance:
99 → 99 (0)

/3d Performance:
83 → 93 (+10)

## Accessibility delta

Home Accessibility:
96 → 100 (+4)

/3d Accessibility:
93 → 100 (+7)

## WAVE after

WAVE MANUAL VERIFICATION REQUIRED (Expect 0 errors based on source audit and Lighthouse validation).

## Keyboard-only verification

Home primary flow: PASS
3D configurator: PASS
Focus visibility: PASS
Keyboard traps: NONE

## AI-specific accessibility

N/A — this portfolio does not contain a streamed AI chat interface, so streamed output aria-live and a stop-generation control do not apply.

## Performance notes

- **Homepage JS impact**: The React Three Fiber bundle is fully contained to the `/3d` route through the use of `next/dynamic`. The homepage bundle remains light, loading in ~0.9s FCP.
- **/3d bundle impact**: The `/3d` route loads the canvas asynchronously. Performance improved from 83 to 93 likely due to cache and asset delivery optimizations in the preview build. LCP remains somewhat constrained by the WebGL initialization pipeline.
- **CLS**: 0 for both pages. Layout shifts are entirely prevented.
- **reduced-motion behavior**: System-level `prefers-reduced-motion` suppresses both CSS animations and the 3D WebGL scene (falling back to a static notice) cleanly.

## Remaining justified alerts / limitations

- The 3D scene (Canvas) itself relies on mouse/pointer events for `OrbitControls`. The WebGL scene rendering cannot easily expose a keyboard alternative for camera orbiting without extreme custom ARIA roles and manual camera bindings. The HTML configurator beneath the canvas covers the required meaningful interaction for keyboard users.
- The Vercel Preview SEO score is flagged due to `noindex`. This is expected and not an issue on production.

## Evidence

Before screenshots/reports:
- `docs/audit/before/home-lighthouse.json`
- `docs/audit/before/3d-lighthouse.json`
- Lighthouse UI screenshots: MANUAL REQUIRED

After screenshots/reports:
- `docs/audit/after/home-lighthouse-final.json`
- `docs/audit/after/3d-lighthouse-final.json`
- Lighthouse UI screenshots: MANUAL REQUIRED
