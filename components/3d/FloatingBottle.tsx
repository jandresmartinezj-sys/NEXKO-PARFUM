"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingBottle(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15;
    ref.current.rotation.y = t * 0.25;
  });

  return (
    <group ref={ref} {...props}>
      {/* Cuerpo del frasco */}
      <mesh castShadow>
        <cylinderGeometry args={[0.8, 1, 2.4, 48]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.95}
          roughness={0.18}
          emissive="#3a2c0c"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Cuello */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.26, 0.5, 0.5, 48]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Tapa */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.36, 0.26, 0.6, 48]} />
        <meshStandardMaterial
          color="#FFE0A0"
          metalness={1}
          roughness={0.08}
          emissive="#FFE0A0"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}
