"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ShinyText from "./ShinyText";
import Plasma from "./Plasma";

const roles = [
  "Engineers intelligent systems",
  "Architects cloud infrastructure",
  "Secures digital frontiers",
  "Builds production platforms",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!deleting) {
      setRoleText(current.slice(0, charIdx));
      t = setTimeout(() => setCharIdx((c) => c + 1), charIdx === current.length ? 2200 : 55);
      if (charIdx === current.length) t = setTimeout(() => setDeleting(true), 2200);
    } else {
      setRoleText(current.slice(0, charIdx));
      t = setTimeout(() => setCharIdx((c) => c - 1), 30);
      if (charIdx === 0) { setDeleting(false); setRoleIdx((i) => (i + 1) % roles.length); }
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.3,
      sx: (Math.random() - 0.5) * 0.12,
      sy: (Math.random() - 0.5) * 0.12,
      o: Math.random() * 0.07 + 0.02,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.sx; p.y += p.sy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* ── Plasma wave background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.65, position: "absolute", inset: 0 }}
      >
        <Plasma
          color="#A036D9"
          speed={0.5}
          direction="forward"
          scale={1.2}
          opacity={1}
          mouseInteractive={true}
        />
      </div>

      {/* Ambient glow — centered purple */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(160,54,217,0.04), transparent 70%)",
        }}
      />

      {/* ── PORTRAIT — absolute, right-anchored, full height (UNCHANGED) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 pointer-events-none hidden lg:flex items-end"
        style={{
          zIndex: 6,
          right: "-20vw",
          width: "55vw",
          top: "-5%",
          bottom: "-2%",
        }}
      >
        {/* Right-edge fade */}
        <div
          className="absolute inset-y-0 right-0 z-10 pointer-events-none"
          style={{
            width: "50%",
            background: "linear-gradient(to right, transparent 0%, #050505 75%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: "15%",
            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "20%",
            background: "linear-gradient(to top, #050505 0%, transparent 100%)",
          }}
        />

        <Image
          src="/darshcs.png"
          alt="Darshan"
          width={900}
          height={1100}
          priority
          unoptimized
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left 18%",
            display: "block",
            opacity: 0.3,
          }}
        />
      </motion.div>

      {/* ── TEXT CONTENT — full width, layered over image ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col min-h-screen py-28 justify-center">

          {/* ── TOP ROW: badge left, subtitle right ── */}
          <div className="flex items-center justify-between mb-16">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="section-label">Open to Opportunities</span>
            </motion.div>

            {/* Subtitle — top right */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden md:block text-[11px] font-medium tracking-[0.2em] uppercase text-right"
              style={{ color: "#4b4b4bff" }}
            >
              Software Craftsman<br />AI Researcher · Security Engineer
            </motion.p>
          </div>

          {/* ── CENTER: BIG NAME with ShinyText ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h1
              className="font-bold tracking-[-0.04em] leading-[1.05]"
              style={{ fontSize: "clamp(52px, 8vw, 110px)" }}
            >
              <ShinyText
                text="Sri Darshan"
                color="rgba(255,255,255,0.55)"
                shineColor="#ffffff"
                speed={3.5}
                delay={0.8}
                spread={130}
                direction="left"
              />
              <span
                className="font-bold tracking-[-0.04em] block"
                style={{ color: "#181818", fontSize: "0.85em" }}
              >
              </span>
            </h1>
          </motion.div>

          {/* ── TYPEWRITER — below name ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center mb-10 h-8"
          >
            <span
              className="text-[18px] md:text-[22px] font-light tracking-wide"
              style={{ color: "#555" }}
            >
              {roleText}
            </span>
            <span className="cursor" />
          </motion.div>

          {/* ── BOTTOM ROW: description left, CTAs right ── */}
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20 mb-14">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-[14px] leading-[1.9] md:max-w-[340px]"
              style={{ color: "#555" }}
            >
              I don&apos;t just write code — I architect systems that{" "}
              <span className="text-white font-medium">think</span>, scale across continents, and{" "}
              <span className="text-white font-medium">defend</span> against the unseen.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                Explore My Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="btn-ghost">Let&apos;s Connect</a>
            </motion.div>
          </div>

          {/* ── FOOTER META ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-5 text-[11px]"
            style={{ color: "#333" }}
          >
            <span>PSG College of Arts &amp; Science</span>
            <span style={{ color: "#1a1a1a" }}>·</span>
            <span>M.Sc Software Systems</span>
            <span style={{ color: "#1a1a1a" }}>·</span>
            <span>Coimbatore, India</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#252525" }}>Scroll</span>
        <div className="w-[1px] h-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)" }} />
      </motion.div>
    </section>
  );
}