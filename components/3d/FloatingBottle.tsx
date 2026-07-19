"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingBottle(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const baseY = Array.isArray(props.position) ? Number(props.position[1]) : 0;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Movimiento sutil: leve flotación y balanceo, sin rotación continua.
    ref.current.position.y = baseY + Math.sin(t * 0.5) * 0.06;
    ref.current.rotation.y = Math.sin(t * 0.18) * 0.12;
  });

  const gold = (roughness: number) =>
    new THREE.MeshStandardMaterial({
      color: "#C9A84C",
      metalness: 0.75,
      roughness,
      emissive: new THREE.Color("#241a06"),
      emissiveIntensity: 0.12,
      transparent: true,
      opacity: 0.82,
    });

  return (
    <group ref={ref} {...props}>
      {/* Cuerpo del frasco */}
      <mesh material={gold(0.35)}>
        <cylinderGeometry args={[0.8, 1, 2.4, 48]} />
      </mesh>
      {/* Cuello */}
      <mesh position={[0, 1.55, 0]} material={gold(0.3)}>
        <cylinderGeometry args={[0.26, 0.5, 0.5, 48]} />
      </mesh>
      {/* Tapa */}
      <mesh position={[0, 2.05, 0]} material={gold(0.25)}>
        <cylinderGeometry args={[0.36, 0.26, 0.6, 48]} />
      </mesh>
    </group>
  );
}
