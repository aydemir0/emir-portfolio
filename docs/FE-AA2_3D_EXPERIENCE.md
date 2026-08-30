# 3D Experience — AI Skill Core

- architecture: Next.js App Router with R3F lazy-loaded components.
- interaction: Color switching (blue/violet/cyan) and Energy pulse mode.
- mobile behavior: Touch panning/zooming via OrbitControls, proper touch-target sizes for UI.
- reduced-motion fallback: Detected via matchMedia, falls back to Static3DFallback.
- low-power fallback: Detected via navigator hardware/memory APIs, falls back to Static3DFallback.
- performance measurements: Capped DPR [1, 1.5], <10 meshes, no external assets.
- exact verification status: Verified local browser checks and build checks.