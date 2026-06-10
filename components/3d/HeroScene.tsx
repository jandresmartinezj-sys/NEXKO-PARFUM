"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ParticleField } from "./ParticleField";
import { FloatingBottle } from "./FloatingBottle";
import { ScentWaves } from "./ScentWaves";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#050508", 6, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 3]} color="#C9A84C" intensity={60} />
      <pointLight position={[-3, -2, -2]} color="#E8A0B0" intensity={25} />
      <pointLight position={[0, 2, 4]} color="#FFE0A0" intensity={20} />

      <ParticleField count={2200} />
      <FloatingBottle position={[0, -0.2, 0]} />
      <ScentWaves />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.25} intensity={1.3} mipmapBlur radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
