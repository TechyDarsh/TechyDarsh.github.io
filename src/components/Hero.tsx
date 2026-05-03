"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.2,
  });

  // ✅ PERFECTLY BALANCED PARALLAX (feels real)
  const softwareY = useTransform(smooth, [0, 1], [0, -40]);
  const engineerY = useTransform(smooth, [0, 1], [0, -80]);
  const portraitY = useTransform(smooth, [0, 1], [0, -120]);
  const bottomY = useTransform(smooth, [0, 1], [0, 40]);

  const opacity = useTransform(smooth, [0.6, 1], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative h-[100svh] bg-[#f5f5f5] overflow-hidden flex items-center justify-center"
    >

      {/* ───────── LOGO ───────── */}
      <div className="absolute top-0 left-0 z-50 px-8 md:px-14 h-[80px] flex items-center">
        <h1 className="font-extrabold text-[24px] tracking-[-0.04em] text-[#111]">
          Darsh<span className="text-gray-300">.</span>
        </h1>
      </div>

      {/* ───────── CENTER STACK ───────── */}
      <div className="relative flex flex-col items-center justify-center text-center">

        {/* SOFTWARE */}
        <motion.h1
          style={{ y: softwareY }}
          className="font-black text-[#111] leading-[0.82] tracking-[-0.05em]"
        >
          <span style={{ fontSize: "clamp(90px, 14vw, 220px)" }}>
            Software
          </span>
        </motion.h1>

        {/* ENGINEER */}
        <motion.h2
          style={{ y: engineerY }}
          className="font-black text-transparent leading-[0.82] tracking-[-0.05em]"
          style={{
            WebkitTextStroke: "3px #111",
            fontSize: "clamp(90px, 14vw, 220px)",
            marginTop: "-0.1em",
          }}
        >
          Engineer
        </motion.h2>

      </div>

      {/* ───────── PORTRAIT (PERFECT CENTER) ───────── */}
      <motion.div
        style={{ y: portraitY }}
        className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none"
      >
        <div className="relative w-[clamp(320px,32vw,520px)]">

          {/* FADE MASK */}
          <div
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          >
            <Image
              src="/darsh_hero.png"
              alt="Darsh"
              width={600}
              height={800}
              priority
              className="w-full h-auto object-contain"
              style={{
                filter: "grayscale(1) contrast(1.05)",
              }}
            />
          </div>

        </div>
      </motion.div>

      {/* ───────── BOTTOM BAR ───────── */}
      <motion.div
        style={{ y: bottomY }}
        className="absolute bottom-0 left-0 right-0 z-40 px-8 md:px-14 pb-8 md:pb-10"
      >
        <div className="flex items-end justify-between">

          {/* LEFT */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-[0.18em] text-gray-300 uppercase">
              Location
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-gray-500 text-[14px]">
                Based in India
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold tracking-[0.18em] text-gray-300 uppercase">
              Tech
            </span>
            <div className="flex gap-4">
              <span className="text-[11px] text-gray-400 uppercase">React</span>
              <span className="text-[11px] text-gray-400 uppercase">Python</span>
              <span className="text-[11px] text-gray-400 uppercase">AWS</span>
              <span className="text-[11px] text-gray-400 uppercase">Node</span>
            </div>
          </div>

        </div>
      </motion.div>

    </motion.section>
  );
}