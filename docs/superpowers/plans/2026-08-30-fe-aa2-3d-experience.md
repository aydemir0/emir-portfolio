# 3D Experience Plan

- Create src/lib/three-capabilities.ts for capability checks (reduced motion, low power).
- Create src/components/three/Static3DFallback.tsx for fallback rendering.
- Create src/components/three/SkillCoreScene.tsx for procedural R3F scene.
- Create src/components/three/ThreeCanvas.tsx to host the Canvas.
- Create src/components/three/ThreeExperience.tsx as the client wrapper with dynamic import, configurator state, and ErrorBoundary.
- Create src/app/3d/page.tsx as the route.
- Implement tests in src/__tests__/ThreeExperience.test.tsx.