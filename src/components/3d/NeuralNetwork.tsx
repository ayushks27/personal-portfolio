import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralNetwork: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const particleCount = 120;
  
  // Create randomized particle coordinates & velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Coordinates inside a 3D box
      pos[i] = (Math.random() - 0.5) * 10;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 10;

      // Slow velocities
      vel[i] = (Math.random() - 0.5) * 0.008;
      vel[i + 1] = (Math.random() - 0.5) * 0.008;
      vel[i + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, []);

  // Update loop
  useFrame(() => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionsAttr = geometry.attributes.position;
    
    // Slow drifting animation
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      // Update coordinates with velocities
      positionsAttr.array[idx] += velocities[idx];
      positionsAttr.array[idx + 1] += velocities[idx + 1];
      positionsAttr.array[idx + 2] += velocities[idx + 2];

      // Boundary collision checks (bounce back)
      if (Math.abs(positionsAttr.array[idx]) > 5) velocities[idx] *= -1;
      if (Math.abs(positionsAttr.array[idx + 1]) > 5) velocities[idx + 1] *= -1;
      if (Math.abs(positionsAttr.array[idx + 2]) > 5) velocities[idx + 2] *= -1;
    }

    // Interactive mouse parallax reaction
    const targetX = mouse.x * viewport.width * 0.15;
    const targetY = mouse.y * viewport.height * 0.15;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;

    positionsAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Floating Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#3b82f6"
          size={0.06}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
