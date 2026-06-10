"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import type { Accords } from "@/lib/data/catalog";

const LAYERS: {
  key: keyof Accords;
  label: string;
  y: number;
  color: string;
  radius: number;
}[] = [
  { key: "top", label: "Notas de salida", y: 2.1, color: "#7EC8C8", radius: 1.6 },
  { key: "heart", label: "Notas de corazón", y: 0, color: "#E8A0B0", radius: 2 },
  { key: "base", label: "Notas de fondo", y: -2.1, color: "#D4803C", radius: 1.6 },
];

function Note({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh position={position}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.3}
        />
        <Html
          center
          distanceFactor={9}
          position={[0, -0.6, 0]}
          className="pointer-events-none select-none whitespace-nowrap rounded-full bg-void/70 px-2 py-0.5 text-[11px] text-ink-primary"
        >
          {label}
        </Html>
      </mesh>
    </Float>
  );
}

export default function ScentPyramid({ accords }: { accords: Accords }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} className="!absolute inset-0">
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={50} />
      <pointLight position={[-5, -3, 2]} color="#C9A84C" intensity={20} />

      {LAYERS.map((layer) => {
        const notes = accords[layer.key];
        return notes.map((note, i) => {
          const angle = (i / notes.length) * Math.PI * 2;
          const x = Math.cos(angle) * layer.radius;
          const z = Math.sin(angle) * layer.radius;
          return (
            <Note
              key={`${layer.key}-${note}`}
              position={[x, layer.y, z]}
              color={layer.color}
              label={note}
            />
          );
        });
      })}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}
