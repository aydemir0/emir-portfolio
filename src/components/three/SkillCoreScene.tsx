import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export type CoreColor = 'blue' | 'violet' | 'cyan';

const colorMap: Record<CoreColor, string> = {
  blue: '#3b82f6',
  violet: '#8b5cf6',
  cyan: '#06b6d4',
};

interface SkillCoreSceneProps {
  color: CoreColor;
  energyActive: boolean;
}

export function SkillCoreScene({ color, energyActive }: SkillCoreSceneProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  const targetScale = energyActive ? 1.4 : 1.0;
  const targetRotationSpeed = energyActive ? 2.5 : 0.5;

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * targetRotationSpeed;
      coreRef.current.rotation.x += delta * (targetRotationSpeed * 0.5);
      
      const currentScale = coreRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      coreRef.current.scale.set(newScale, newScale, newScale);
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * targetRotationSpeed * 0.8;
      ring1Ref.current.rotation.y += delta * targetRotationSpeed * 1.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * targetRotationSpeed * 0.9;
      ring2Ref.current.rotation.z += delta * targetRotationSpeed * 1.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * targetRotationSpeed * 1.3;
      ring3Ref.current.rotation.z += delta * targetRotationSpeed * 0.7;
    }
  });

  const hexColor = colorMap[color];

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={hexColor} />
      
      <Icosahedron ref={coreRef} args={[1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={hexColor} 
          wireframe={false} 
          emissive={hexColor} 
          emissiveIntensity={energyActive ? 0.8 : 0.2}
          roughness={0.4}
          metalness={0.8}
        />
      </Icosahedron>

      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[1.8, 0.05, 8, 32]}>
          <meshStandardMaterial color={hexColor} transparent opacity={0.6} />
        </Torus>
        <Sphere args={[0.15, 8, 8]} position={[1.8, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>
      </group>
      
      <group ref={ring2Ref} rotation={[0, Math.PI / 3, 0]}>
        <Torus args={[2.4, 0.03, 8, 32]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </Torus>
        <Sphere args={[0.1, 8, 8]} position={[2.4, 0, 0]}>
          <meshStandardMaterial color={hexColor} emissive={hexColor} emissiveIntensity={1} />
        </Sphere>
      </group>

      <group ref={ring3Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <Torus args={[3.0, 0.02, 8, 32]}>
          <meshStandardMaterial color={hexColor} transparent opacity={0.4} />
        </Torus>
      </group>
    </group>
  );
}