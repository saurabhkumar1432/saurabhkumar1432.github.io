'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-expect-error Maath types are missing in some versions
import * as random from 'maath/random/dist/maath-random.esm';

function StarField(props: any) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => {
    // Check for mobile to reduce particle count
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 1500 : 6000;

    // Ensure the array size is divisible by 3 (x, y, z coordinates)
    const data = random.inSphere(new Float32Array(count), { radius: 1.5 });
    
    // Safety check for NaN values which can cause Three.js to crash
    for (let i = 0; i < data.length; i++) {
        if (isNaN(data[i])) {
            data[i] = 0;
        }
    }
    return data;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#88c0d0" // A nice cyan/blue hue
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending
        />
      </Points>
    </group>
  );
}

export function Background3D() {
  return (
    <div className="absolute inset-0 z-[1] w-full h-full pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}
