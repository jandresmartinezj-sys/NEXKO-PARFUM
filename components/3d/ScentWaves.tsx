"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Anillo de "ondas de aroma" que ondula suavemente alrededor del frasco. */
export function ScentWaves() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.PI / 2.3;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]} scale={1.6}>
      <torusGeometry args={[2.6, 0.06, 16, 120]} />
      <MeshDistortMaterial
        color="#C9A84C"
        emissive="#C9A84C"
        emissiveIntensity={0.6}
        metalness={0.6}
        roughness={0.3}
        distort={0.35}
        speed={1.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}
