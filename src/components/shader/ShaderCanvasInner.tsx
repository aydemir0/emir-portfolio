// ShaderCanvasInner — thin R3F Canvas wrapper.
// Separated from ShaderHeroBackground so next/dynamic with ssr:false
// can tree-shake the R3F bundle without pulling it into the SSR path.
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from './ShaderPlane';

interface ShaderCanvasInnerProps {
  frameloop: 'always' | 'never';
}

export default function ShaderCanvasInner({ frameloop }: ShaderCanvasInnerProps) {
  return (
    <Canvas
      // Cap DPR at 1.5 — same as the existing /3d ThreeCanvas
      dpr={[1, 1.5]}
      // frameloop="never" when tab is hidden; R3F stops calling useFrame entirely
      frameloop={frameloop}
      // Orthographic-style camera at z=1 looking at the origin.
      // The 2×2 plane fills the frustum at this distance.
      camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      className="w-full h-full"
      // data-testid so tests can locate the canvas element
      data-testid="shader-canvas-element"
    >
      <ShaderPlane />
    </Canvas>
  );
}
