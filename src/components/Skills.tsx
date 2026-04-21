"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Tech items with simple icon representations */
const row1 = [
  { name: "Python", icon: "🐍" },
  { name: "TypeScript", icon: "TS" },
  { name: "JavaScript", icon: "JS" },
  { name: "Go", icon: "Go" },
  { name: "Java", icon: "☕" },
  { name: "Kotlin", icon: "K" },
  { name: "Swift", icon: "🔶" },
  { name: "C++", icon: "C+" },
  { name: "C#", icon: "C#" },
  { name: "PHP", icon: "🐘" },
  { name: "React", icon: "⚛" },
  { name: "Next.js", icon: "▲" },
];

const row2 = [
  { name: "Node.js", icon: "⬢" },
  { name: "Django", icon: "🎸" },
  { name: "Flask", icon: "🧪" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "PyTorch", icon: "🔥" },
  { name: "OpenCV", icon: "👁" },
  { name: "AWS", icon: "☁" },
  { name: "Docker", icon: "🐳" },
  { name: "Firebase", icon: "🔥" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "⎇" },
  { name: "Linux", icon: "🐧" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const renderItems = (items: typeof row1) => (
    <>
      {[...items, ...items].map((item, i) => (
        <div key={`${item.name}-${i}`} className="marquee-item">
          <span className="text-[16px] shrink-0 opacity-60">{item.icon}</span>
          {item.name}
        </div>
      ))}
    </>
  );

  return (
    <section id="skills" className="pb-28 md:pb-40 overflow-hidden" style={{ background: "transparent" }}>


      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-0 mb-14">
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label block mb-4">
          Expertise
        </motion.span>
        <div className="flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(28px, 3.2vw, 46px)" }}
          >
            Tools of the trade.
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="text-[12px] font-mono hidden md:block"
            style={{ color: "#444", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {row1.length + row2.length} technologies
          </motion.span>
        </div>
      </div>

      {/* Row 1 → Left to Right */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
        className="mb-4 overflow-hidden"
      >
        <div className="marquee-track-left">{renderItems(row1)}</div>
      </motion.div>

      {/* Row 2 → Right to Left */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
        className="overflow-hidden"
      >
        <div className="marquee-track-right">{renderItems(row2)}</div>
      </motion.div>
    </section>
  );
}
