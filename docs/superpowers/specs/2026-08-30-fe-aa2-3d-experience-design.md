# 3D Experience Design Spec

- one 3D route only (/3d)
- procedural geometry (Icosahedron/Torus)
- no GLB/model download
- one meaningful configurator interaction (Color change & Energy Mode)
- lazy-loaded canvas (Next.js dynamic)
- reduced-motion fallback (Static3DFallback)
- low-power fallback (hardwareConcurrency/deviceMemory heuristic)
- mobile-safe rendering budget (dpr cap, low mesh count)
- no unrelated portfolio redesign