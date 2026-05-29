import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CubeData {
  id: number;
  position: [number, number, number];
  size: number;
  label: string;
  color: string;
  speed: [number, number, number];
}

export const FloatingCubes: React.FC = () => {
  const cubesRef = useRef<THREE.Group>(null);

  const cubes: CubeData[] = useMemo(() => [
    { id: 1, position: [-2, 1.2, 0], size: 0.8, label: 'React', color: '#61dafb', speed: [0.005, 0.008, 0.003] },
    { id: 2, position: [2, -1.0, 0.5], size: 0.9, label: 'Next.js', color: '#ffffff', speed: [0.007, 0.004, 0.006] },
    { id: 3, position: [-1.8, -1.5, -0.5], size: 0.7, label: 'Node', color: '#68a063', speed: [0.004, 0.006, 0.008] },
    { id: 4, position: [1.8, 1.5, -1], size: 0.75, label: 'FastAPI', color: '#009688', speed: [0.008, 0.003, 0.005] },
    { id: 5, position: [0, 0.2, -2], size: 0.85, label: 'Docker', color: '#2496ed', speed: [0.003, 0.005, 0.007] }
  ], []);

  return (
    <group ref={cubesRef}>
      {/* Lighting parameters for translucent materials */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-3, -3, -3]} intensity={0.8} />

      {cubes.map((cube) => (
        <SingleCube key={cube.id} data={cube} />
      ))}
    </group>
  );
};

interface SingleCubeProps {
  data: CubeData;
}

const SingleCube: React.FC<SingleCubeProps> = ({ data }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation physics
      meshRef.current.rotation.x += data.speed[0];
      meshRef.current.rotation.y += data.speed[1];
      meshRef.current.rotation.z += data.speed[2];

      // Slow bobbing/floating offset animation
      meshRef.current.position.y = data.position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + data.id) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={data.position}>
      <boxGeometry args={[data.size, data.size, data.size]} />
      {/* Sleek physical glass material */}
      <meshPhysicalMaterial
        roughness={0.08}
        transmission={0.88}
        thickness={0.8}
        transparent={true}
        opacity={0.35}
        color={data.color}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      {/* Project tech labels using Drei Html component */}
      <Html
        distanceFactor={6}
        position={[0, 0, 0]}
        center
        className="pointer-events-none select-none font-mono text-[9px] font-bold tracking-wider px-2 py-0.8 bg-black/80 text-zinc-100 border border-zinc-800 rounded glass whitespace-nowrap shadow-md"
      >
        {data.label}
      </Html>
    </mesh>
  );
};
