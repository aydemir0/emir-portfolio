# Open It On Your Phone — Fix Log

## Audit

Date:
2026-08-30

Tested browser widths:
- 360px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px

Real-phone verification:
PENDING

## Problems Found and Fixed

### 1. Inadequate Mobile Touch Targets
Before:
The ThemeToggle button and mobile action strip links ("CV", "GitHub", "Book") had small padding (p-2, py-2), causing their touch targets to be under the recommended 44x44px minimum for mobile usage.

Why it mattered:
Small touch targets cause fat-finger errors where users accidentally click the wrong link or struggle to activate controls on small touch screens.

After:
Increased the padding and dimensions. ThemeToggle now uses `w-11 h-11`, and the mobile strip anchors and CopyEmailButton now use `py-3` to guarantee a minimum 44px touch height. 

Evidence:
Inspected the DOM element dimensions in devtools on a 390px viewport. The touch targets are now sufficiently sized.

### 2. "Book a 30-minute call" Button Alignment
Before:
The `w-full` class was applied to the anchor tag on mobile widths, but the text inside it remained left-aligned because there was no `text-center` utility class.

Why it mattered:
A full-width button looks broken when the text clings to the left edge; it should be centered for a standard mobile UI appearance.

After:
Added the `text-center` class to the anchor tag.

Evidence:
At 375px width, the text is now perfectly centered within the stretched anchor button.

### 3. Light Mode Accent Color Contrast
Before:
The `--accent` color in light mode was `#4F8CFF`, which has a contrast ratio of ~3.12:1 against the light background (`#F8FAFC`). 

Why it mattered:
This fails the WCAG AA requirement of 4.5:1 for normal-sized text. Users with visual impairments or on low-brightness screens would struggle to read standard text links.

After:
Adjusted the light mode `--accent` to `#2563EB` (Tailwind blue-600), restoring the contrast ratio above the 4.5:1 requirement.

Evidence:
Checked against standard WCAG contrast calculators. (The dark mode accent was left untouched as it had excellent contrast).

### 4. Stacked Card Border Consistency
Before:
Project cards (Hit.AI and Emir's Galaxy) used `border-l` to separate their left and right columns. When the cards stacked vertically on mobile, the right column retained a left border while missing a top border, visually breaking the separation.

Why it mattered:
A left border on a vertically stacked UI element looks like a misaligned line, disrupting the layout and card structure.

After:
Changed `border-l` to `border-t md:border-t-0 md:border-l` so the border dynamically swaps to the top when stacked on mobile, and to the left when side-by-side on desktop.

Evidence:
At 390px, the visual columns stack cleanly with a top separating line.

## Links Checked

| Link | Result | Notes |
| --- | --- | --- |
| CV | PASS | Verified PDF exists in `public/` |
| GitHub | PASS | Resolves 200 OK via curl |
| LinkedIn | PASS | Verified valid URL format |
| Book a Call | PASS | Resolves redirect to calendar.google.com |
| Hit.AI Repo | PASS | Resolves 200 OK via curl |
| Hit.AI Case Study | PASS | Internal anchor routing |
| Emir's Galaxy Repo | PASS | Resolves 200 OK via curl |
| Emir's Galaxy Study | PASS | Internal anchor routing |

## Images / Assets

No oversized or unoptimized raster images exist in `public/`. The folder strictly contains lightweight SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg) and the PDF CV. 
No optimization necessary.

## Accessibility / Readability

- **Contrast:** Restored Light Mode accent text to WCAG AA standards.
- **Touch Targets:** Adjusted `ThemeToggle`, `CopyEmailButton`, footer links, and the mobile action strip links to ensure all interactive elements hit a ~44px minimum vertical height.

## Browser Responsive Verification

Tested widths:
- 360px: Navigation and text scale cleanly. No horizontal overflow.
- 375px: Forms and buttons fully usable.
- 390px: Project cards stack perfectly with correct border lines.
- 430px: Text maintains readable lengths.
- 768px: Transitions to tablet grid.
- 1024px: Desktop layouts activate.
- 1280px/1440px: Content stays constrained within the max-width container cleanly.

## Real Phone Verification

Status: PENDING
Device: PENDING
Browser: PENDING
Result: PENDING

## Before / After Evidence

Real-phone before screenshot: PENDING
Real-phone after screenshot: PENDING
