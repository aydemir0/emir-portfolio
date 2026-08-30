# Shader Hero

This document explains the interactive fragment-shader hero background added to the portfolio homepage. It is written to be readable to a mentor or reviewer without requiring prior GLSL experience.

---

## Mental Model

The hero background is a WebGL fragment shader running on a single fullscreen quad behind the existing HTML. Every pixel on screen is colored individually by the fragment shader program. Three inputs — `u_time`, `u_resolution`, and `u_mouse` — drive the output.

### UV

```glsl
vec2 uv = gl_FragCoord.xy / u_resolution.xy;
```

`gl_FragCoord.xy` gives the current pixel's position in screen pixels (e.g., `(400, 300)` on a 1280×720 canvas). Dividing by `u_resolution.xy` converts it to the `0 → 1` range — so the top-right pixel becomes `(1.0, 1.0)` and the bottom-left becomes `(0.0, 0.0)`. These normalized coordinates are called UV.

After normalizing, the shader centers UV around zero (`uv -= 0.5`), so the range becomes `-0.5 → 0.5` with `(0, 0)` at screen center. It also corrects for aspect ratio by multiplying `uv.x` by `width / height` — this prevents the pattern from stretching horizontally on wide screens.

### u_time

`u_time` is the number of seconds since the animation started, provided by React Three Fiber's `state.clock.elapsedTime`. It is written to the shader uniform every frame inside `useFrame`. The time coefficients in the sine/cosine expressions are intentionally small (0.2 – 0.4) so the aurora evolves slowly and calmly rather than spinning aggressively.

### u_resolution

`u_resolution` holds the canvas pixel dimensions (`vec2(width, height)`). It serves two purposes:

1. **UV normalization** — converting pixel coordinates to 0–1 range.
2. **Aspect ratio correction** — keeping the wave pattern circular on any screen size.

It is updated every frame from `useThree().size` in `ShaderPlane.tsx`.

### u_mouse

`u_mouse` holds the normalized pointer position (`0 → 1` in both axes). It is updated on `onPointerMove` events in `ShaderHeroBackground.tsx` by mutating the shared `shaderUniforms` object directly (no React re-render needed). The Y axis is inverted because WebGL's Y=0 is at the bottom, whereas browser pointer events report Y=0 at the top.

The mouse influence is scaled to `0.15` — it gently shifts the wave origin toward the pointer without aggressively tracking it.

---

## Flow Field

The aurora effect is built from three layered sine/cosine waves combined into a single `flow` value.

### Layer A — slow diagonal wave

```glsl
float waveA = sin(uv.x * 2.8 + u_time * 0.4) * cos(uv.y * 2.1 + u_time * 0.3);
```

A large-scale pattern that varies along both axes. The product of `sin` and `cos` creates a banded grid that flows diagonally as time increases.

### Layer B — perpendicular ripple

```glsl
float waveB = sin(uv.y * 3.2 + u_time * 0.25) * cos(uv.x * 2.5 - u_time * 0.35);
```

Rotated 90° relative to layer A. Where layer A is bright, layer B may be dark, and vice versa — the interference creates organic aurora-like bands.

### Layer C — diagonal accent

```glsl
float waveC = sin((uv.x + uv.y) * 2.0 + u_time * 0.2);
```

Uses the diagonal sum `(uv.x + uv.y)` to break the horizontal/vertical symmetry of layers A and B, adding a third wave direction.

### Combining

```glsl
float flow = (waveA + waveB + waveC) / 3.0;
float t = flow * 0.5 + 0.5;  // remap -1→1 to 0→1
```

Averaging three waves and remapping to `0 → 1` gives a smooth scalar that drives the palette mix.

---

## Palette

Three anchor colors match the portfolio's existing accent palette (blue `#4F8CFF`, violet `#8b5cf6`, cyan `#06b6d4`):

```glsl
vec3 colBlue   = vec3(0.196, 0.388, 1.0);
vec3 colViolet = vec3(0.545, 0.361, 0.965);
vec3 colCyan   = vec3(0.024, 0.714, 0.831);

vec3 color = t < 0.5
  ? mix(colBlue, colViolet, t * 2.0)
  : mix(colViolet, colCyan, (t - 0.5) * 2.0);
```

For `t` values in the first half, the color interpolates from blue to violet. In the second half, from violet to cyan. This creates a smooth three-color gradient that follows the flow field.

---

## Grain

```glsl
float grain = fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5453);
color = mix(color, vec3(grain), 0.03);
```

A deterministic hash of each pixel's position produces a pseudo-random value that does not change frame-to-frame. This adds very subtle texture (3% blend) to the color field, breaking up the overly-perfect digital gradient look. Because the grain value is fixed per fragment (not animated), there is no per-frame flicker.

---

## Contrast

The hero uses three stacked layers:

| Layer | Implementation | Purpose |
| ----- | -------------- | ------- |
| 1. Shader | `<ShaderCanvasInner />` — `absolute inset-0` | Aurora visual |
| 2. Overlay | `<div className="absolute inset-0 bg-background/70">` | 70% dark veil for text readability |
| 3. Hero HTML | `<div className="relative z-10">` | Headline, CTA, profile |

The overlay ensures the `<h1>` headline and CTA buttons remain legible across all shader animation frames without modifying the heading's own color. The shader canvas has `pointer-events: none` so links and buttons beneath the overlay remain fully clickable.

---

## Reduced Motion

**"Reduced-motion users get the same visual palette as a static CSS gradient, while the animated WebGL canvas is skipped entirely."**

When `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is `true` (detected post-mount inside a `useEffect`), `ShaderHeroBackground` renders a static `<div>` with the Tailwind class:

```
bg-gradient-to-br from-[#080B12] via-[#1a1040] to-[#081830]
```

This CSS gradient uses the same dark blue/violet/cyan palette direction as the animated shader, so the visual palette is consistent. The R3F `Canvas` is never mounted — no WebGL context is created, no `requestAnimationFrame` loop is started.

---

## Hidden Tab Performance

When `document.visibilityState !== "visible"`, the `visibilitychange` event fires and the component sets:

```ts
setFrameloop('never');
```

The R3F `Canvas` receives `frameloop="never"`, which causes React Three Fiber to stop calling `useFrame` entirely — no GPU work, no CPU rAF loop. When the tab becomes visible again, `setFrameloop('always')` resumes animation.

Crucially, R3F's internal `clock` also pauses when `frameloop="never"`. When the tab is made visible again, `state.clock.elapsedTime` continues from where it stopped, so `u_time` does not jump — the aurora resumes smoothly without a visible discontinuity.

---

## DPR

```tsx
<Canvas dpr={[1, 1.5]} ...>
```

Device pixel ratio is capped between 1 and 1.5. This matches the existing `/3d` ThreeCanvas configuration. On a 3× retina display the canvas renders at 1.5× instead of 3×, significantly reducing fragment shader invocations without visible quality loss.

---

## FlyRank Deliverables

- **Live URL:** https://muhammed-emir-aydin.is-a.dev
- **Shader source:** `src/components/shader/shader-source.ts`
- **Fallback one-liner:** "Reduced-motion users get the same visual palette as a static CSS gradient, while the animated WebGL canvas is skipped entirely."
- **DPR capped:** `[1, 1.5]` in `src/components/shader/ShaderCanvasInner.tsx`
- **Hidden-tab animation pauses:** `frameloop="never"` set on `visibilitychange` in `ShaderHeroBackground.tsx`
- **Hero content readable:** `bg-background/70` overlay in `src/app/page.tsx` layer 2
- **No new dependencies installed** — reuses existing `three`, `@react-three/fiber`, `@react-three/drei`
