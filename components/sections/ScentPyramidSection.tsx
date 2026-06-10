"use client";

import dynamic from "next/dynamic";
import { useLowPower } from "@/lib/hooks/useLowPower";
import type { Accords } from "@/lib/data/catalog";

const ScentPyramid = dynamic(() => import("@/components/3d/ScentPyramid"), {
  ssr: false,
  loading: () => null,
});

const LAYERS: { key: keyof Accords; label: string; color: string }[] = [
  { key: "top", label: "Notas de salida", color: "#7EC8C8" },
  { key: "heart", label: "Notas de corazón", color: "#E8A0B0" },
  { key: "base", label: "Notas de fondo", color: "#D4803C" },
];

export function ScentPyramidSection({ accords }: { accords: Accords }) {
  const lowPower = useLowPower();

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Experiencia sensorial</p>
        <h2 className="font-display text-3xl text-ink-primary">La pirámide olfativa</h2>
        <p className="mt-3 text-ink-secondary">
          Cada fragancia evoluciona en tu piel. Explora cómo se despliegan sus notas, desde
          la primera impresión hasta la estela que deja a su paso.
        </p>
        <ul className="mt-6 space-y-4">
          {LAYERS.map((layer) => (
            <li key={layer.key}>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="text-sm font-semibold text-ink-primary">{layer.label}</span>
              </div>
              <p className="pl-5 text-sm text-ink-secondary">
                {accords[layer.key].join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-3xl border border-subtle bg-void-radial">
        {!lowPower ? (
          <ScentPyramid accords={accords} />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-ink-secondary">
            Visualización 3D desactivada para optimizar tu dispositivo.
          </div>
        )}
      </div>
    </div>
  );
}
