# Interactive Shader Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a custom interactive blue/violet/cyan fragment-shader background to the existing homepage hero while preserving semantic HTML, readability, accessibility, reduced-motion behavior, and production performance.

**Architecture:** Reuse the portfolio's existing React Three Fiber / Three.js stack. A focused client wrapper chooses between an animated WebGL shader and a static gradient fallback; one fullscreen plane renders the custom GLSL shader behind the existing hero HTML. Time, resolution, mouse, visibility, reduced-motion, and WebGL failure are handled without changing unrelated pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, three, @react-three/fiber, Vitest, React Testing Library

**Spec:** `docs/superpowers/specs/2026-08-30-shader-hero-design.md`

## Global Constraints

- Homepage hero only.
- Do not change `/3d`.
- Keep existing hero copy and CTA behavior.
- Use `u_time`, `u_resolution`, and `u_mouse`.
- DPR maximum is `1.5`.
- Hidden tabs must stop shader animation work.
- `prefers-reduced-motion: reduce` must skip animated WebGL entirely.
- WebGL failure must preserve usable hero content using a static gradient.
- Do not install another WebGL/shader framework.
- Do not add postprocessing, particles, models, textures, or noise packages.
- Shader source must remain explainable block-by-block.
- Existing tests must remain green.

---

## File Map

### Create

| File | Responsibility |
| ---- | -------------- |
| `src/components/shader/shader-source.ts` | Vertex + fragment GLSL source strings with plain-English comments |
| `src/components/shader/ShaderPlane.tsx` | R3F scene: one fullscreen plane, ShaderMaterial, per-frame uniform updates |
| `src/components/shader/ShaderHeroBackground.tsx` | Client wrapper: reduced-motion gate, DPR cap, pointer tracking, visibility pause, WebGL error boundary, static-gradient fallback |
| `src/__tests__/ShaderHeroBackground.test.tsx` | Behavioral tests (no WebGL rendering) |
| `docs/SHADER_HERO.md` | Developer documentation written in plain English |

### Modify

| File | Change |
| ---- | ------ |
| `src/app/page.tsx` | Insert `<ShaderHeroBackground />` inside the `<section id="hero">` block, positioned behind existing HTML via absolute/relative layering |

### Do NOT touch

- `src/components/three/*` (existing `/3d` stack)
- `src/lib/three-capabilities.ts` (used by `/3d` only; shader hero uses its own narrow reduced-motion check)
- Any other page, component, or test file

---

## Task 1 — Reduced-motion capability for the shader hero

**Goal:** A narrow, testable function that decides whether the hero should render animated WebGL or a static gradient. This is explicitly separate from `getThreeCapabilities()` because the hero has different semantics (no `lowPower` gate — the hero fallback is a CSS gradient, not a full 3D scene abort).

### Files

- **Create:** `src/components/shader/ShaderHeroBackground.tsx` (stub with decision logic only in this task; Canvas added in Task 4)
- **Test:** `src/__tests__/ShaderHeroBackground.test.tsx`

### Interface produced

```ts
// Internal decision function (not exported separately; inlined in ShaderHeroBackground)
function heroShouldAnimate(): boolean
// Returns false when window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
// Returns true otherwise (including SSR, where window is undefined)
```

### Implementation detail

The function reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` inside a `useEffect` (post-mount), exactly as `ThreeExperience` reads `getThreeCapabilities()`. It sets `shouldAnimate` state. Before mount, the component renders neither canvas nor fallback (avoids flash), matching the existing `mounted` pattern in `ThreeExperience`.

### Steps

- [ ] Write failing test in `src/__tests__/ShaderHeroBackground.test.tsx`:
  ```ts
  // Test: reduced-motion → static fallback rendered, data-testid="shader-static-fallback" present
  // Test: no reduced-motion → shader path rendered, data-testid="shader-canvas-wrapper" present
  // Mock window.matchMedia returning matches:true / matches:false
  // Mock next/dynamic (ThreeCanvas equivalent) to avoid real WebGL
  ```
- [ ] Run `npx vitest run src/__tests__/ShaderHeroBackground.test.tsx` → confirm it fails (component does not exist)
- [ ] Create `src/components/shader/ShaderHeroBackground.tsx` with `'use client'` directive, `useEffect`/`useState` for `matchMedia`, and two branches rendering `data-testid="shader-static-fallback"` and `data-testid="shader-canvas-wrapper"` respectively. Canvas import stubbed as `null` for now.
- [ ] Run `npx vitest run src/__tests__/ShaderHeroBackground.test.tsx` → confirm both tests pass
- [ ] Run `npx vitest run` → confirm all 66 existing tests still pass
- [ ] Commit: `git commit -m "feat(shader): add hero capability gate and reduced-motion branch"`

---

## Task 2 — GLSL shader source

**Goal:** Write the vertex shader and fragment shader in TypeScript as exported string constants. Every logical block must have a brief plain-English comment. The shader must implement all required uniforms and produce the blue/violet/cyan aurora effect.

### Files

- **Create:** `src/components/shader/shader-source.ts`

### Interface produced

```ts
export const vertexShader: string;
export const fragmentShader: string;
```

### Vertex shader structure

```glsl
// Pass UV coordinates through to the fragment shader.
// A standard passthrough — no vertex displacement needed for a fullscreen quad.
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment shader structure (block-by-block)

```glsl
// --- Uniforms ---
// u_time: seconds elapsed since start, drives continuous animation
// u_resolution: canvas pixel dimensions, used to keep the pattern proportional
// u_mouse: normalized pointer position (0.0–1.0), gently shifts the flow field
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;
varying vec2  vUv;

void main() {

  // --- Block 1: Normalize UV from gl_FragCoord ---
  // gl_FragCoord.xy is in pixel space. Dividing by resolution gives 0→1 range.
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // --- Block 2: Center UV around origin ---
  // Shift 0→1 to -0.5→0.5 so waves are symmetric around screen center.
  uv -= 0.5;

  // --- Block 3: Aspect-ratio correction ---
  // Multiply x by width/height so circles stay circular on wide screens.
  uv.x *= u_resolution.x / u_resolution.y;

  // --- Block 4: Normalized mouse offset ---
  // u_mouse is 0→1. Re-center to -0.5→0.5, then scale by 0.15 so mouse
  // barely nudges the flow — decorative, not aggressive.
  vec2 mouse = (u_mouse - 0.5) * 0.15;

  // --- Block 5: Apply mouse influence to UV ---
  // Adding the offset moves the wave origin gently toward the pointer.
  uv += mouse;

  // --- Block 6: Flow layer A — slow diagonal wave ---
  // A large-scale sine driven by time and both UV axes.
  // Slow coefficient (0.4) keeps the hero calm.
  float waveA = sin(uv.x * 2.8 + u_time * 0.4) * cos(uv.y * 2.1 + u_time * 0.3);

  // --- Block 7: Flow layer B — perpendicular ripple ---
  // A second layer rotated 90° creates a crossing interference pattern.
  float waveB = sin(uv.y * 3.2 + u_time * 0.25) * cos(uv.x * 2.5 - u_time * 0.35);

  // --- Block 8: Flow layer C — diagonal accent ---
  // A third layer uses the diagonal (uv.x + uv.y) to break symmetry.
  float waveC = sin((uv.x + uv.y) * 2.0 + u_time * 0.2);

  // --- Block 9: Combine layers into a single flow value ---
  // Average the three waves; result is roughly -1→1.
  float flow = (waveA + waveB + waveC) / 3.0;

  // --- Block 10: Remap flow to 0→1 for color mixing ---
  float t = flow * 0.5 + 0.5;

  // --- Block 11: Blue/violet/cyan palette ---
  // Three anchor colors matching the portfolio accent palette.
  vec3 colBlue   = vec3(0.196, 0.388, 1.0);   // #324fff
  vec3 colViolet = vec3(0.545, 0.361, 0.965);  // #8b5cf6
  vec3 colCyan   = vec3(0.024, 0.714, 0.831);  // #06b6d4
  // Mix blue↔violet in the first half, violet↔cyan in the second half.
  vec3 color = t < 0.5
    ? mix(colBlue, colViolet, t * 2.0)
    : mix(colViolet, colCyan, (t - 0.5) * 2.0);

  // --- Block 12: Subtle grain ---
  // A deterministic hash of fragment position adds very slight texture.
  // fract(sin(dot(...)) * large_prime) produces a pseudo-random 0→1 value
  // per fragment that does not change with time (no flicker).
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5453);
  // Mix in 3% grain — enough to reduce the synthetic-gradient look.
  color = mix(color, vec3(grain), 0.03);

  // --- Block 13: Vignette for readability ---
  // Darken toward the hero edges so white headline text stays legible.
  float vignette = 1.0 - smoothstep(0.3, 0.85, length(vUv - 0.5) * 1.5);
  color *= vignette;

  // --- Block 14: Base darkness ---
  // Keep the overall hero dark so it does not overpower text.
  color *= 0.55;

  gl_FragColor = vec4(color, 1.0);
}
```

### Steps

- [ ] Create `src/components/shader/shader-source.ts` with `vertexShader` and `fragmentShader` exports matching the exact structure above
- [ ] Verify TypeScript compilation: `npx tsc --noEmit`
- [ ] Run `npx vitest run` → all 66 tests still pass (pure string constants, no side effects)
- [ ] Commit: `git commit -m "feat(shader): add GLSL vertex and fragment shader source"`

---

## Task 3 — Shader plane (R3F scene component)

**Goal:** A React Three Fiber component that renders one fullscreen plane with the custom `ShaderMaterial`, initializes uniforms, and updates them every frame.

### Files

- **Create:** `src/components/shader/ShaderPlane.tsx`

### Interface consumed

```ts
import { vertexShader, fragmentShader } from './shader-source';
```

### Interface produced

```ts
// No props — plane is always fullscreen and self-contained
export function ShaderPlane(): React.ReactElement
```

### Uniform TypeScript types

```ts
import * as THREE from 'three';

type ShaderUniforms = {
  u_time:       { value: number };
  u_resolution: { value: THREE.Vector2 };
  u_mouse:      { value: THREE.Vector2 };
};
```

### Time handling (hidden-tab resume)

`u_time` is accumulated using R3F `state.clock.elapsedTime`. When the tab is hidden and animation pauses (handled by `ShaderHeroBackground` setting `frameloop="never"` on the Canvas — see Task 4), `state.clock` also pauses via R3F's built-in behaviour. On resume the clock continues from where it stopped, so time does not jump.

### Implementation detail

```tsx
'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shader-source';

const uniforms: ShaderUniforms = {
  u_time:       { value: 0 },
  u_resolution: { value: new THREE.Vector2(1, 1) },
  u_mouse:      { value: new THREE.Vector2(0.5, 0.5) },
};

export function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    // u_mouse is updated externally via the uniform reference — see ShaderHeroBackground
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
```

`u_mouse` is updated from `ShaderHeroBackground` by mutating `uniforms.u_mouse.value` directly (no prop drilling; the uniforms object is module-level so pointer events in the wrapper can update it without re-rendering).

### Steps

- [ ] Create `src/components/shader/ShaderPlane.tsx` with the implementation above
- [ ] Verify TypeScript: `npx tsc --noEmit`
- [ ] Run `npx vitest run` → all 66 tests pass (component uses R3F hooks, not rendered in jsdom)
- [ ] Commit: `git commit -m "feat(shader): add ShaderPlane with uniform updates"`

---

## Task 4 — Hero shader wrapper

**Goal:** The client-facing component that owns the reduced-motion decision (from Task 1), creates the R3F `Canvas`, configures DPR, captures pointer position into `u_mouse`, manages visibility-based animation pause, and catches WebGL errors.

### Files

- **Modify:** `src/components/shader/ShaderHeroBackground.tsx` (add Canvas, pointer, visibility logic)

### Interface consumed

```ts
import { ShaderPlane } from './ShaderPlane';
// Canvas is next/dynamic with ssr:false, matching ThreeCanvas pattern exactly
```

### Interface produced

```tsx
// No props — self-contained hero background
export function ShaderHeroBackground(): React.ReactElement | null
```

### Visibility pause mechanism

R3F `Canvas` accepts a `frameloop` prop: `"always" | "demand" | "never"`.

When `document.visibilityState !== "visible"`, set `frameloop="never"` via React state. When visible again, set `frameloop="always"`. This is the simplest approach compatible with R3F — no custom `requestAnimationFrame` management needed, no clock jump.

```tsx
const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

useEffect(() => {
  const handleVisibility = () => {
    setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never');
  };
  document.addEventListener('visibilitychange', handleVisibility);
  return () => document.removeEventListener('visibilitychange', handleVisibility);
}, []);
```

### Pointer handling

```tsx
const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  // Normalize to 0→1, invert Y because WebGL Y is bottom-up
  uniforms.u_mouse.value.set(
    (e.clientX - rect.left) / rect.width,
    1.0 - (e.clientY - rect.top) / rect.height,
  );
};
```

`pointerEvents: 'none'` is applied to the canvas container so hero links and buttons remain fully interactive.

### Static gradient fallback (for reduced-motion and WebGL failure)

```tsx
// Tailwind class string producing the matching blue/violet/cyan aurora palette as CSS
const STATIC_GRADIENT_CLASS =
  'absolute inset-0 bg-gradient-to-br from-[#080B12] via-[#1a1040] to-[#081830]';
```

The same gradient is used for:
1. `prefers-reduced-motion: reduce` (detected in `useEffect` post-mount)
2. WebGL error (ErrorBoundary catch, identical to the pattern in `ThreeExperience`)

### DPR

```tsx
<Canvas dpr={[1, 1.5]} frameloop={frameloop} ...>
```

Matches the existing `ThreeCanvas.tsx` DPR configuration.

### Full component shape

```tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { uniforms } from './ShaderPlane'; // exported module-level uniforms ref

const ShaderCanvas = dynamic(() => import('./ShaderCanvasInner'), { ssr: false, loading: () => null });

class ErrorBoundary extends React.Component<...> { /* same pattern as ThreeExperience */ }

export function ShaderHeroBackground() {
  const [mounted, setMounted]         = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frameloop, setFrameloop]     = useState<'always' | 'never'>('always');

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () =>
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never');
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => { /* normalize mouse */ };

  if (!mounted) return null; // avoid SSR/hydration mismatch

  if (reducedMotion) {
    return <div aria-hidden="true" data-testid="shader-static-fallback" className={STATIC_GRADIENT_CLASS} />;
  }

  return (
    <div
      aria-hidden="true"
      data-testid="shader-canvas-wrapper"
      className="absolute inset-0 pointer-events-none"
      onPointerMove={handlePointerMove}
    >
      <ErrorBoundary fallback={<div className={STATIC_GRADIENT_CLASS} />}>
        <ShaderCanvas frameloop={frameloop} />
      </ErrorBoundary>
    </div>
  );
}
```

`ShaderCanvasInner` is a tiny non-dynamic file that renders `<Canvas dpr={[1,1.5]} frameloop={frameloop}>` with `<ShaderPlane />` inside. It is separated so `next/dynamic` with `ssr: false` can tree-shake it cleanly.

### Steps

- [ ] Update `src/__tests__/ShaderHeroBackground.test.tsx` to also test:
  - `frameloop` state changes on `visibilitychange` (mock `document.visibilityState`)
  - `data-testid="shader-canvas-wrapper"` is rendered for normal motion
  - `aria-hidden="true"` is present on both fallback and canvas wrapper
- [ ] Run `npx vitest run src/__tests__/ShaderHeroBackground.test.tsx` → confirm new tests fail
- [ ] Implement `ShaderHeroBackground.tsx` in full (Canvas, pointer, visibility, ErrorBoundary, fallback)
- [ ] Create `src/components/shader/ShaderCanvasInner.tsx` (thin Canvas wrapper, not dynamically-imported itself)
- [ ] Run `npx vitest run src/__tests__/ShaderHeroBackground.test.tsx` → confirm all pass
- [ ] Run `npx vitest run` → all 66 existing tests still pass
- [ ] Commit: `git commit -m "feat(shader): add ShaderHeroBackground with DPR, visibility, pointer, fallback"`

---

## Task 5 — Homepage hero integration

**Goal:** Insert `<ShaderHeroBackground />` into the existing `<section id="hero">` in `src/app/page.tsx` with correct layering, without moving or altering any hero copy or CTA.

### Files

- **Modify:** `src/app/page.tsx`

### Current hero DOM (from inspection, lines 31–69 of `src/app/page.tsx`)

```tsx
<section id="hero" className="scroll-mt-32">
  <div className="inline-flex ...">…availability badge…</div>
  <h1 className="text-4xl ...">…headline…</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
    …Quick Profile…
    …Currently Building…
  </div>
</section>
```

### Required change

Make `<section id="hero">` relatively positioned and insert `<ShaderHeroBackground />` as the first child in `absolute inset-0` position:

```tsx
<section id="hero" className="scroll-mt-32 relative">
  {/* Shader background — decorative, behind all hero content */}
  <ShaderHeroBackground />

  {/* Dark contrast overlay — ensures text readability across all shader frames */}
  <div aria-hidden="true" className="absolute inset-0 bg-background/70 pointer-events-none" />

  {/* Existing hero content — unchanged */}
  <div className="inline-flex ...">…</div>
  <h1 …>…</h1>
  <div className="grid …">…</div>
</section>
```

The existing hero content is wrapped in a `relative z-10` container so it sits above the `absolute` shader and overlay layers without layout shift.

No hero copy changes. No heading structure changes. CTA links are not touched.

### Steps

- [ ] Update `src/__tests__/portfolio.test.tsx` TEST A to also assert that the `<h1>` headline still renders after integration (it already does; verify no regression)
- [ ] Run `npx vitest run src/__tests__/portfolio.test.tsx` → confirm all tests pass (hero headline still found)
- [ ] Add `<ShaderHeroBackground />` import and update JSX in `src/app/page.tsx`
- [ ] Run `npx vitest run` → all tests still pass
- [ ] Run `npm run build` → build succeeds
- [ ] Commit: `git commit -m "feat(shader): integrate shader hero background into homepage"`

---

## Task 6 — Behavioral tests

**Goal:** Comprehensive behavioral test coverage for the shader hero. No real WebGL. No pixel assertions. No brittle class-string snapshots.

### Files

- **Modify:** `src/__tests__/ShaderHeroBackground.test.tsx`

### Tests to implement

```ts
describe('ShaderHeroBackground', () => {
  // Mock next/dynamic so ShaderCanvasInner renders a testid stub
  beforeEach(() => {
    vi.mock('../components/shader/ShaderCanvasInner', () => ({
      default: () => <div data-testid="mock-shader-canvas" />
    }));
  });

  it('renders nothing until mounted (avoids SSR flash)', () => {
    // Suppress useEffect by not flushing; component returns null before mount
    // Verify no testid present before act()
  });

  it('renders static fallback when prefers-reduced-motion is true', () => {
    // Mock window.matchMedia to return matches: true
    // render(<ShaderHeroBackground />)
    // expect(screen.getByTestId('shader-static-fallback')).toBeInTheDocument()
    // expect(screen.queryByTestId('shader-canvas-wrapper')).not.toBeInTheDocument()
  });

  it('renders shader canvas wrapper when reduced-motion is false', () => {
    // Mock window.matchMedia to return matches: false
    // render + act
    // expect(screen.getByTestId('shader-canvas-wrapper')).toBeInTheDocument()
  });

  it('static fallback has aria-hidden="true" (decorative)', () => {
    // reduced-motion mock
    // expect(getByTestId('shader-static-fallback')).toHaveAttribute('aria-hidden', 'true')
  });

  it('canvas wrapper has aria-hidden="true" (decorative)', () => {
    // normal-motion mock
    // expect(getByTestId('shader-canvas-wrapper')).toHaveAttribute('aria-hidden', 'true')
  });

  it('hides canvas when visibilitychange fires hidden', async () => {
    // render with normal motion
    // Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true })
    // fireEvent(document, new Event('visibilitychange'))
    // Verify frameloop state change leads to ShaderCanvasInner receiving frameloop="never"
    // (mock ShaderCanvasInner captures the prop and exposes it via data-frameloop)
  });

  it('existing hero headline is not replaced by shader', () => {
    // render <Home /> (full page)
    // expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    // expect(screen.getByText(/Hi, I'm Emir/i)).toBeInTheDocument()
  });
});
```

### matchMedia mock pattern (matching existing `portfolio-v2.test.tsx` pattern)

```ts
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};
```

### Steps

- [ ] Write all tests above in `src/__tests__/ShaderHeroBackground.test.tsx`
- [ ] Run `npx vitest run src/__tests__/ShaderHeroBackground.test.tsx` → confirm each fails for the expected reason
- [ ] Implement any missing behavior in components (from Tasks 1–5) until each test passes
- [ ] Run `npx vitest run` → all tests pass
- [ ] Commit: `git commit -m "test(shader): add behavioral tests for ShaderHeroBackground"`

---

## Task 7 — Developer documentation

**Goal:** Write `docs/SHADER_HERO.md` in the developer's own words, matching the actual final shader source from Task 2.

### Files

- **Create:** `docs/SHADER_HERO.md`

### Required sections (exact headings)

```markdown
# Shader Hero

## Mental Model

### UV
Explanation of `gl_FragCoord.xy / u_resolution.xy` and what "UV coordinates" mean.

### u_time
What it does: drives continuous animation. How it is accumulated (R3F `state.clock.elapsedTime`).

### u_resolution
What it does: keeps the pattern non-stretched. How it is updated each frame from `useThree().size`.

### u_mouse
What it does: gently shifts the wave origin toward the pointer. Why the influence is capped at 0.15.

## Flow Field
Explanation of waveA, waveB, waveC — what each sine/cosine combination produces visually and why.

## Palette
How blue, violet, and cyan are defined as vec3 and blended using `mix()` with `t` as the control.

## Grain
Why grain is added (reduces synthetic gradient look). How the deterministic hash works. Why low opacity (0.03) prevents flicker.

## Contrast
The three-layer stack: shader → overlay (`bg-background/70`) → hero HTML. Why the overlay exists.

## Reduced Motion
"Reduced-motion users get the same visual palette as a static CSS gradient, while the animated WebGL canvas is skipped entirely."
How it is detected (post-mount `window.matchMedia`). What the static gradient CSS looks like.

## Hidden Tab Performance
How `frameloop="never"` on the R3F Canvas stops all frame work when `document.visibilityState !== "visible"`. Why the clock does not jump on resume.

## DPR
`dpr={[1, 1.5]}` — same cap as the `/3d` Canvas. Prevents unnecessary pixel density on high-DPR displays.

## FlyRank Deliverables
- Live URL: (to be filled after production deployment)
- Shader source: `src/components/shader/shader-source.ts`
- Fallback one-liner: "Reduced-motion users get the same visual palette as a static CSS gradient, while the animated WebGL canvas is skipped entirely."
- DPR capped: yes, `[1, 1.5]`
- Hidden-tab animation pauses: yes, via `frameloop="never"`
- Hero content readable: yes, via `bg-background/70` contrast overlay
```

### Steps

- [ ] Create `docs/SHADER_HERO.md` with all sections completed
- [ ] Confirm all explanations match the actual shader source in `shader-source.ts`
- [ ] Commit: `git commit -m "docs: add shader hero developer documentation"`

---

## Task 8 — Full verification and deploy checkpoint

**Goal:** Confirm all tests pass, build succeeds, no whitespace errors, and the feature works correctly in manual checks before committing and deploying.

### Automated verification

```bash
npm test
npm run lint
npm run build
git diff --check
git status
```

All 66 + new tests must pass. Build must include `/opengraph-image`, `/robots.txt`, `/sitemap.xml` (unchanged). No lint errors.

### Manual verification checklist

- [ ] Desktop: shader aurora visible in hero background
- [ ] Pointer movement: flow field gently shifts (not aggressive tracking)
- [ ] Hero `<h1>` "Hi, I'm Emir." headline readable above shader
- [ ] CTA "Book a 30-minute call" is clickable (pointer-events not blocked)
- [ ] Browser resize: canvas resizes without layout shift
- [ ] Mobile (375 px): hero readable, no overflow
- [ ] Reduced-motion: enable via DevTools → static gradient renders, no WebGL canvas
- [ ] Hidden tab: switch to another tab → animation stops (no CPU spin); switch back → resumes smoothly
- [ ] WebGL failure simulation: disable hardware acceleration in DevTools → fallback gradient renders, hero still usable
- [ ] `/3d` page: completely unchanged

### Final commit

```bash
git add -A
git commit -m "feat: add interactive shader hero"
```

### Production deployment checkpoint (separate from code commit)

```bash
npx vercel --prod
```

**Do not run `npx vercel --prod` before all automated and manual checks pass.**

---

## Spec Coverage Verification

| Acceptance criterion | Task |
| -------------------- | ---- |
| Homepage hero uses fragment shader | T5 |
| Real hero HTML above shader | T5 |
| `u_time` affects shader | T2, T3 |
| `u_resolution` affects shader | T2, T3 |
| `u_mouse` affects shader | T2, T4 |
| Shader source is commented | T2 |
| Blue/violet/cyan palette visible | T2 |
| Mouse influence gentle | T2, T4 |
| Text remains readable | T5 |
| DPR capped at 1.5 | T4 |
| Hidden tabs stop animating | T4, T6 |
| Reduced-motion uses static gradient | T1, T4, T6 |
| WebGL failure preserves hero | T4 |
| Existing tests pass | T1–T8 |
| Production build succeeds | T8 |
| Feature deployed | T8 |
