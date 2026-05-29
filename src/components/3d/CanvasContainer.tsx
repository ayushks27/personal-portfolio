import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface CanvasContainerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children,
  fallback,
  className = "absolute inset-0 w-full h-full pointer-events-none z-0",
  cameraPosition = [0, 0, 5],
  fov = 75
}) => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  // WebGL Compatibility check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebGLSupported(supported);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return (
      <div className={`${className} flex items-center justify-center bg-zinc-950`}>
        {fallback || (
          <div className="text-zinc-500 text-xs font-mono text-center px-4">
            [WebGL not supported. Rendering high-quality vector fallbacks...]
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
