import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RotatingGlobe: React.FC = () => {
  const globeRef = useRef<THREE.Group>(null);
  
  // Custom slow spin
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.15;
    }
  });

  // Programmatically create circular coordinate clusters for a sleek dotted wireframe globe
  const [particles, connections] = useMemo(() => {
    const pts = [];
    const lines = [];
    const radius = 2.2;
    const segments = 24;
    const rings = 12;

    // Create latitude/longitude vertex coordinates
    for (let r = 0; r <= rings; r++) {
      const theta = (r * Math.PI) / rings;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let s = 0; s < segments; s++) {
        const phi = (s * 2 * Math.PI) / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = radius * cosPhi * sinTheta;
        const y = radius * cosTheta;
        const z = radius * sinPhi * sinTheta;

        pts.push(new THREE.Vector3(x, y, z));
      }
    }

    // Connect dots sequentially to create beautiful geographic grids
    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < segments; s++) {
        const i1 = r * segments + s;
        const i2 = r * segments + ((s + 1) % segments);
        const i3 = (r + 1) * segments + s;

        if (pts[i1] && pts[i2]) lines.push(pts[i1], pts[i2]);
        if (pts[i1] && pts[i3]) lines.push(pts[i1], pts[i3]);
      }
    }

    return [pts, lines];
  }, []);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(connections);
    return geom;
  }, [connections]);

  const pointsGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(particles);
    return geom;
  }, [particles]);

  return (
    <group ref={globeRef} scale={[1, 1, 1]}>
      {/* Sleek Dotted Sphere */}
      <points geometry={pointsGeometry}>
        <pointsMaterial
          color="#06b6d4"
          size={0.035}
          transparent={true}
          opacity={0.7}
          sizeAttenuation={true}
        />
      </points>

      {/* Grid Connections Wireframe */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0891b2"
          transparent={true}
          opacity={0.16}
          linewidth={1}
        />
      </lineSegments>

      {/* Futuristic Pulsing Core Glow Sphere */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#0e7490"
          transparent={true}
          opacity={0.06}
          wireframe={true}
        />
      </mesh>
    </group>
  );
};
