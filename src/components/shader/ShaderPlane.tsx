'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shader-source';

// Module-level uniforms object shared between ShaderPlane and ShaderHeroBackground.
// ShaderHeroBackground mutates u_mouse directly on pointer events without re-rendering.
export const shaderUniforms = {
  u_time:       { value: 0 },
  u_resolution: { value: new THREE.Vector2(1, 1) },
  u_mouse:      { value: new THREE.Vector2(0.5, 0.5) },
};

export function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (!materialRef.current) return;
    // Update time uniform — uses R3F clock which pauses when frameloop="never"
    // so time does not jump after a hidden-tab resume.
    materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    // Update resolution each frame to handle resizes correctly
    materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    // u_mouse is already mutated in-place by ShaderHeroBackground on pointer events
  });

  return (
    // A 2×2 plane exactly fills the camera frustum when placed at z=0
    // with an orthographic-style projection. No extra geometry needed.
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
      />
    </mesh>
  );
}
