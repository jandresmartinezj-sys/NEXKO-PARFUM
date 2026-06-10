"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado dorado con un punto que sigue al mouse y un anillo
 * con ligero retardo. Se desactiva en dispositivos táctiles.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);
    document.body.classList.add("cursor-none");

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='pointer'], input");
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "52px" : "34px";
        ringRef.current.style.height = interactive ? "52px" : "34px";
        ringRef.current.style.borderColor = interactive
          ? "rgba(255,224,160,0.9)"
          : "rgba(201,168,76,0.5)";
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold-glow"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[34px] w-[34px] rounded-full border transition-[width,height,border-color] duration-200"
        style={{ marginLeft: "-17px", marginTop: "-17px", borderColor: "rgba(201,168,76,0.5)" }}
      />
    </>
  );
}
