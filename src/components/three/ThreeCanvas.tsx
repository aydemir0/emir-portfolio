import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SkillCoreScene, CoreColor } from './SkillCoreScene';

interface ThreeCanvasProps {
  color: CoreColor;
  energyActive: boolean;
}

export default function ThreeCanvas({ color, energyActive }: ThreeCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      className="w-full h-full"
    >
      <SkillCoreScene color={color} energyActive={energyActive} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}