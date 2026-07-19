"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleField } from "./ParticleField";
import { FloatingBottle } from "./FloatingBottle";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#050508", 5, 18]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 4]} color="#C9A84C" intensity={22} />
      <pointLight position={[-3, -2, -1]} color="#E8A0B0" intensity={8} />

      {/* Partículas doradas tenues, sin remolino ni rotación */}
      <ParticleField count={1100} />

      {/* Frasco sutil, al fondo y difuminado */}
      <FloatingBottle position={[0, -0.3, -0.8]} scale={0.8} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.5} mipmapBlur radius={0.55} />
      </EffectComposer>
    </Canvas>
  );
}
