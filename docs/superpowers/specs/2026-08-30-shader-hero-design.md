# Interactive Shader Hero Design

## Goal

Add a personalized fragment-shader visual signature to the existing portfolio homepage hero while preserving the current hero content, accessibility, readability, and production reliability.

The shader should feel like an AI/neural aurora rather than a generic template effect.

## Scope

This feature affects only the homepage hero.

It must not redesign or alter:

- `/3d`
- project pages
- recruiter page
- contact flow
- navigation
- existing hero copy or CTA behavior

The existing homepage headline and content remain real HTML rendered above the shader.

## Visual Direction

The hero background is a flowing neural-aurora field using a restrained:

- blue
- violet
- cyan

palette.

The animation should feel calm and premium, not like a game or screensaver.

The shader will include:

1. normalized UV coordinates
2. aspect-ratio correction using resolution
3. layered sine/cosine flow distortion
4. time-driven movement
5. gentle mouse influence
6. palette mixing
7. subtle grain
8. dark vignette / readability treatment

Mouse movement should gently lean or attract the flow field rather than making the shader aggressively follow the cursor.

## Shader Uniforms

The implementation must use all three core concepts:

### `u_time`

Controls slow continuous animation.

Time must be accumulated in seconds and should move slowly enough that the hero remains calm.

### `u_resolution`

Contains the current canvas pixel width and height.

It is used to correct UV coordinates so the pattern does not stretch on wide or tall screens.

### `u_mouse`

Stores normalized pointer position.

The pointer influences the local flow field with restrained strength.

Mouse interaction must remain decorative and must never affect page navigation or HTML interaction.

## UV Mental Model

The fragment shader starts with:

`uv = gl_FragCoord.xy / u_resolution.xy`

This converts each fragment from pixel coordinates into approximately `0.0 → 1.0` coordinates.

The coordinates are then centered around zero and corrected using the screen aspect ratio before being used for the procedural flow.

The mentor explanation should be:

- UV tells the shader where the current pixel is.
- Resolution keeps the shape proportional on different screens.
- Time changes the field from frame to frame.
- Mouse provides another coordinate that gently changes the field.

## Flow Field

The effect should use a small number of understandable sine/cosine layers rather than opaque copied GLSL.

A conceptual structure:

1. center and aspect-correct UV
2. calculate normalized mouse coordinates
3. offset the UV slightly toward the mouse
4. create two or three wave layers using combinations of:
   - `sin()`
   - `cos()`
   - UV axes
   - `u_time`
5. combine the layers into a flow value
6. use that flow value to blend the blue/violet/cyan palette

No shader block should remain in the final source unless it can be explained in plain language.

Avoid large shader utility libraries, noise packages, or unexplained magic functions.

## Grain

Add very subtle procedural grain after the main color field.

The grain exists only to reduce the overly-perfect digital gradient appearance.

It must:

- be inexpensive
- have low opacity
- not flicker aggressively
- not reduce text readability

A small deterministic hash based on fragment position is acceptable if it is clearly commented.

## Contrast and HTML Layer

The current hero content stays above the WebGL layer.

Layer order:

1. shader / fallback background
2. dark contrast overlay / vignette
3. existing hero HTML content

The overlay should ensure the headline and CTA remain readable across every shader frame.

Do not turn the headline into a canvas texture.

Do not change semantic heading structure.

## Component Architecture

Preferred structure:

### `src/components/shader/ShaderHeroBackground.tsx`

Client-facing wrapper responsible for:

- reduced-motion detection
- WebGL/fallback selection
- canvas sizing
- pointer capture for `u_mouse`
- visibility lifecycle

### `src/components/shader/ShaderPlane.tsx`

Responsible for:

- fullscreen plane
- shader material
- uniform initialization
- per-frame uniform updates

### `src/components/shader/shader-source.ts`

Contains:

- vertex shader source
- fragment shader source

Shader source must include brief comments written in plain language describing each logical block.

### Optional focused helpers

A small helper or hook may be created only if existing project patterns justify it for:

- `prefers-reduced-motion`
- document visibility

Do not create a general animation framework.

## Existing Three.js Stack

The project already contains:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

Reuse the existing stack.

Do not install another WebGL framework.

Do not add:

- regl
- pixi
- shader libraries
- noise packages
- postprocessing libraries

unless implementation proves they are strictly necessary.

The design assumes they are not necessary.

## Render Strategy

Render one fullscreen plane with a custom `ShaderMaterial`.

The canvas fills the hero area only.

No geometry complexity is needed.

The canvas must:

- stay behind hero HTML
- not intercept links/buttons
- resize with the hero
- avoid causing layout shift

Use pointer events carefully so the visual can read pointer position without blocking normal page interaction.

## Performance

### Device Pixel Ratio

Cap render DPR at:

`[1, 1.5]`

Do not render at unrestricted native DPR.

### Hidden Tabs

When `document.visibilityState !== "visible"`:

- shader animation must stop
- unnecessary frame work must stop

When the tab becomes visible again:

- animation resumes normally
- time must not jump wildly

Use the simplest mechanism compatible with React Three Fiber.

### Heavy Effects

Do not add:

- shadows
- postprocessing
- textures
- external models
- particle systems
- multiple canvases

The shader itself is the visual.

## Reduced Motion

If:

`prefers-reduced-motion: reduce`

is active:

- do not run animated WebGL for the hero
- render a static CSS gradient using the same blue/violet/cyan visual palette

This fallback must still support the same text contrast treatment.

Reduced-motion behavior should be testable without requiring a real WebGL context.

Deliverable one-liner:

"Reduced-motion users get the same visual palette as a static CSS gradient, while the animated WebGL canvas is skipped entirely."

## Error Fallback

If WebGL initialization fails:

- hero content must still render
- use the same static gradient fallback
- do not show a technical error message to the visitor

WebGL failure must never make the homepage unusable.

## Accessibility

The shader is decorative.

It must:

- not appear in the accessibility tree as meaningful content
- not affect keyboard navigation
- not replace semantic HTML
- not create focusable elements
- not block hero links/buttons

Text contrast is part of feature acceptance.

## Testing Strategy

Tests should validate behavior rather than shader pixels.

Add focused tests for:

1. existing hero headline still renders
2. reduced-motion preference selects the static fallback
3. normal motion mode selects the shader path
4. decorative background does not replace hero content

Do not snapshot WebGL pixels.

Do not create brittle tests for exact Tailwind class strings unless necessary.

Existing test suites must remain green.

## Verification

Before completion run:

- `npm test`
- `npm run lint`
- `npm run build`
- `git diff --check`

Manual verification:

- desktop pointer interaction
- mobile layout
- headline and CTA readability
- browser resize
- reduced-motion simulation
- tab hidden → animation stops
- tab visible → animation resumes
- production deployment

## Documentation Deliverable

Create:

`docs/SHADER_HERO.md`

during implementation.

It must explain in the developer's own words:

- what UV coordinates represent
- what `u_time` does
- what `u_resolution` does
- what `u_mouse` does
- how the flow field is built
- how palette mixing works
- why grain exists
- how reduced-motion works
- how hidden-tab pausing works

The explanations must match the actual final shader source.

## FlyRank Deliverables

Final deliverables must include:

1. deployed live portfolio URL
2. actual fragment shader source with brief comments
3. one-line reduced-motion/performance fallback
4. confirmation that hero content stays readable
5. confirmation that DPR is capped
6. confirmation that hidden-tab animation pauses

## Non-Goals

Do not:

- redesign the portfolio
- rewrite hero copy
- create a separate shader playground as the primary deliverable
- add unnecessary UI controls
- add audio
- add expensive visual effects
- add a second Three.js architecture
- change `/3d`

## Acceptance Criteria

The feature is accepted when:

- homepage hero visibly uses the custom fragment shader
- real hero HTML is displayed above it
- `u_time`, `u_resolution`, and `u_mouse` all affect the shader
- shader source is understandable and briefly commented
- blue/violet/cyan palette is visibly customized
- mouse influence is gentle
- text remains readable
- DPR is capped at 1.5
- hidden tabs do not keep animating
- reduced-motion skips animated WebGL and uses a static matching gradient
- WebGL failure preserves a usable hero
- existing tests still pass
- production build succeeds
- feature is deployed to the portfolio
