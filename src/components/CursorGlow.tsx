"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0;

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${cx}px`;
        glowRef.current.style.top = `${cy}px`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[9997] opacity-0 hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
      style={{
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
      }}
    />
  );
}
