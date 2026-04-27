"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NorrisText from "./NorrisText";

const roles = [
  "Engineers intelligent systems",
  "Architects cloud infrastructure",
  "Secures digital frontiers",
  "Builds production platforms",
];

export default function Hero() {
  // ================= TYPEWRITER =================
  const [roleText, setRoleText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting) {
      setRoleText(current.slice(0, charIdx));
      t = setTimeout(() => setCharIdx((c) => c + 1), charIdx === current.length ? 2000 : 50);
      if (charIdx === current.length) t = setTimeout(() => setDeleting(true), 2000);
    } else {
      setRoleText(current.slice(0, charIdx));
      t = setTimeout(() => setCharIdx((c) => c - 1), 25);
      if (charIdx === 0) {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">

      {/* ================= ATMOSPHERIC LIGHT ================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 60% 50%, rgba(120,60,200,0.08), transparent 70%),
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04), transparent 60%)
          `,
        }}
      />

      {/* ================= FILM GRAIN ================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />

      {/* ================= PORTRAIT ================= */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute right-0 md:right-[-18vw] top-10 md:top-0 h-full w-[100vw] md:w-[55vw] overflow-hidden pointer-events-none"
      >
        {/* SOFT EDGE MASK */}
        <motion.div
          className="absolute inset-0 pointer-events-none hero-mask"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full scale-90 md:scale-100"
          >
            <Image
              src="/darsh1.png"
              alt="Darshan"
              fill
              priority
              className="object-cover hero-img opacity-[0.35]"
              style={{
                marginTop: "30px"
              }}
            />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-14 w-full -mt-56 md:mt-0">

        {/* TOP META */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 flex justify-between items-center"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500">
            Open to Opportunities
          </span>

          <span className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-gray-600 text-right">
            AI Researcher · Security Engineer
          </span>
        </motion.div>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tracking-[-0.05em] leading-[1.02]"
          style={{ fontSize: "clamp(64px, 9vw, 120px)" }}
        >
          <NorrisText text="Sri Darshan" />
        </motion.h1>

        {/* TYPEWRITER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-[18px] md:text-[22px] text-gray-400 h-8"
        >
          {roleText}
        </motion.div>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 max-w-[420px] text-[15px] leading-[1.9] text-gray-500"
        >
          I don’t just write code — I design systems that{" "}
          <span className="text-white">think</span>, scale across continents, and{" "}
          <span className="text-white">defend</span> against the unseen.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex gap-6"
        >
          <a href="#projects" className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:scale-[1.03] transition cursor-pointer select-none">
            Explore Work
          </a>

          <a href="#contact" className="px-7 py-3 rounded-full border border-white/20 text-sm tracking-wide hover:bg-white/10 transition cursor-pointer select-none">
            Let’s Connect
          </a>
        </motion.div>

        {/* FOOTER META */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-[11px] text-gray-600 flex gap-3"
        >
          <span>PSG College</span>
          <span>·</span>
          <span>M.Sc Software Systems</span>
          <span>·</span>
          <span>India</span>
        </motion.div>
      </div>

      {/* SCROLL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-gray-600"
      >
        SCROLL
      </motion.div>

      <style>{`
        .hero-img {
          object-position: left center;
        }
        .hero-mask {
          -webkit-mask-image: radial-gradient(ellipse at 65% 50%, black 45%, transparent 80%);
          mask-image: radial-gradient(ellipse at 65% 50%, black 45%, transparent 80%);
        }
        @media (max-width: 760px) {
          .hero-img {
            object-position: center !important;
            transform: scale(0.85) translateY(-2%) translateX(0);
          }
          .hero-mask {
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 85%), radial-gradient(circle at 50% 40%, black 40%, transparent 80%);
            mask-image: linear-gradient(to bottom, black 60%, transparent 85%), radial-gradient(circle at 50% 40%, black 40%, transparent 80%);
            -webkit-mask-composite: source-in;
            mask-composite: intersect;
          }
        }
      `}</style>
    </section>
  );
}