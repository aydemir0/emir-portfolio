# Break Your Own Site

## Scope
- /
- /3d
- Contact Form limits
- Links
- SEO & Metadata

## Where I Tried to Break It
1. **Contact Form**: Submitted entirely empty, with whitespace, invalid emails (`abc`, `abc@`), over 2000 characters, over 5000 characters, and rapid double-submissions. Also tested the hidden honeypot.
2. **Cross-Browser/Different Environment**: Rendered the layout and the interactive 3D WebGL element in Microsoft Edge to verify compatibility.
3. **Link Inventory**: Audited internal navigation, CV PDF links, LinkedIn/GitHub profiles, and external project links.
4. **Metadata & Crawlability**: Audited the head tags, `robots.txt`, and `sitemap.xml` (or lack thereof) to ensure indexing capability.

## Findings

### Fix Now
- Contact Form length limits in the `POST` route handler were slightly narrow for Edge cases (message length > 2000 was failing, while max safe limits could be up to 5000; name max was 80, updated to 100).
- Contact Form HTML input `minLength` and `maxLength` were out of sync with updated backend limits.
- The `contact-route.test.ts` integration tests relied on outdated validation bounds and hardcoded 'short' strings instead of testing actual whitespace rejections.
- The site lacked essential SEO tags (`metadataBase`, Open Graph, Twitter cards, `robots.txt`, `sitemap.xml`, and an `opengraph-image.tsx`).

### Known Limitations
- The React Three Fiber `<canvas>` component on `/3d` uses `OrbitControls`, which strictly relies on pointer/touch events. Keyboard-only users can interact meaningfully via the HTML configurator beneath the canvas, but orbiting is constrained to pointers.
- Automated link-checking scripts fail on LinkedIn profile links (HTTP 403 or 999) due to LinkedIn's aggressive bot-blocking measures, but the link works manually for human users.
- Search-engine indexing is an external process and might take time. Vercel preview environments purposefully return `x-robots-tag: noindex`.
- 3D Page performance is 85/100, which is expected due to the WebGL initialization pipeline constraints.

## Fixes Applied
- **Contact Form Validation**: Relaxed server-side string boundaries to 1-100 characters for names and 1-5000 characters for messages, and properly rejected whitespace-only submissions via `.trim()`. HTML validation was updated to mirror these constraints.
- **TDD Integration**: Updated `contact-route.test.ts` to strictly test the new >5000 character limits, whitespace-only messages, and malformed email patterns (`abc`, `abc@`).
- **Double Submit Check**: Confirmed that `ContactForm.tsx` correctly checks `status === 'submitting'` and sets the button to `disabled`, naturally preventing concurrent duplicate submissions. Test `ContactForm.test.tsx` accurately validates this.
- **SEO Elements**: Added a comprehensive `layout.tsx` metadata configuration including Open Graph properties, Twitter summary card, and canonical URLs.
- **Crawlability**: Implemented `src/app/robots.ts` and `src/app/sitemap.ts` pointing to the main `/` and `/3d` pages, as well as valid project routes.
- **Social Preview Image**: Generated an edge-compatible `opengraph-image.tsx` using `@vercel/og` to serve a readable branded social card.

## SEO / Metadata
Added the following metadata to `layout.tsx`:
```json
{
  "title": "Muhammed Emir Aydın | AI-Assisted Web Products",
  "description": "I build AI-assisted web products and turn ideas into working, deployed tools. Explore my projects, frontend experiments, and interactive web work.",
  "canonical": "https://emir-portfolio-two.vercel.app/",
  "openGraph": { ... },
  "twitter": { "card": "summary_large_image" }
}
```
Added `robots.ts` and `sitemap.ts`. Added dynamic `opengraph-image.tsx`.

## Findability Check
Search executed on DuckDuckGo using `site:emir-portfolio-two.vercel.app`.
Result: No results found for `site:emir-portfolio-two.vercel.app`.
Classification: **KNOWN LIMITATION** (Search-engine indexing is external and takes time).

## Speed Check
Lighthouse Mobile performance against Preview URL:
- `/` Score: 100
- `/3d` Score: 85 (Acceptable limit > 80 achieved).

## Cross-Browser / Device Check
Browser: Microsoft Edge.
- Layout: Properly retained Flex/Grid alignments.
- Contact form: Interactive and validation tooltips function correctly.
- 3D Fallback/Rendering: The WebGL canvas initializes cleanly and correctly responds to the configurator state changes without overflow or layout shift.

## Link Check

| Link | Destination | Result | Action |
| --- | --- | --- | --- |
| CV | `/Muhammed-Emir-Aydin-CV.pdf` | PASS | None |
| GitHub | `https://github.com/aydemir0` | PASS | None |
| LinkedIn | LinkedIn Profile URL | BOT BLOCKED, MANUAL PASS | Documented as limitation |
| Book a Call | Google Calendar | PASS | None |
| Hit.AI Case | `/projects/hit-ai` | PASS | None |
| Emir's Galaxy Case | `/projects/emirs-galaxy` | PASS | None |
| Hit.AI Repo | `https://github.com/aydemir0/Hit-the-Target---Hit.AI` | PASS | None |
| Emir's Galaxy Repo | `https://github.com/aydemir0/emirin-galaksisi` | PASS | None |
| 3D Experience | `/3d` | PASS | None |

## Hardening Review
COMPLETE

- Hardening review completed with a real reviewer.
- Reviewer feedback: “Her şey çok hoş.”
- The reviewer did not raise any additional broken/confusing flows or must-fix issues.
## Verification
All Vite unit tests and Next.js builds passing successfully. No lint warnings.
