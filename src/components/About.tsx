"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import StarBorder from "./StarBorder";
import GlareHover from "./GlareHover";

const stats = [
  { value: "9+", label: "Languages", desc: "From C to Swift" },
  { value: "6", label: "Domains", desc: "AI to Security" },
  { value: "10+", label: "Frameworks", desc: "React to TensorFlow" },
  { value: "4+", label: "Projects", desc: "Shipped & deployed" },
];

const pillars = [
  { num: "01", title: "Intelligent Systems", text: "TensorFlow, PyTorch, OpenCV — building AI that learns, adapts, and predicts at scale." },
  { num: "02", title: "Cloud Architecture", text: "AWS, Firebase, containerization — infrastructure engineered for elastic scale and reliability." },
  { num: "03", title: "Cybersecurity", text: "Ethical hacking, zero-trust design — security woven into every single layer of the stack." },
  { num: "04", title: "Full-Stack Engineering", text: "React, Node.js, Django — end-to-end platforms built for performance and real users." },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const yLeft = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-20, 20]);

  return (
    <section id="about" ref={containerRef} className="py-28 md:py-40 relative overflow-hidden" style={{ background: "#050505" }}>
      <div className="rule" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 relative z-10">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="section-label block mb-5"
        >
          About · Philosophy
        </motion.span>

        {/* Parallax headline row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div style={{ y: yLeft }}>
            <h2 className="font-bold leading-[1.12] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              I build at the intersection where{" "}
              <span className="text-white">intelligence</span>{" "}meets{" "}
              <span className="text-white">resilience</span>.
            </h2>
          </motion.div>

          <motion.div style={{ y: yRight }} className="flex items-end">
            <p className="text-[16px] leading-[1.85]" style={{ color: "#777" }}>
              Every system I architect starts with two questions:{" "}
              <span className="text-white font-medium">&ldquo;Can it think?&rdquo;</span>{" "}and{" "}
              <span className="text-white font-medium">&ldquo;Can it be broken?&rdquo;</span>{" "}
              This dual mindset defines how I engineer.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] rounded-2xl overflow-hidden mb-20" style={{ background: "rgba(255,255,255,0.03)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-8 py-8 text-center" style={{ background: "#050505" }}
            >
              <span className="block text-[36px] font-bold text-white tracking-tight">{s.value}</span>
              <span className="block text-[13px] font-medium text-white mt-1">{s.label}</span>
              <span className="block text-[11px] mt-1" style={{ color: "#555" }}>{s.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <StarBorder
                color="#A036D9"
                speed={`${7 + i * 1.5}s`}
                thickness={1}
              >
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="19px"
                  borderColor="transparent"
                  glareColor="#A036D9"
                  glareOpacity={0.12}
                  glareAngle={-40}
                  glareSize={300}
                  transitionDuration={700}
                  style={{ display: "block" }}
                >
                  <div className="p-8 group flex flex-col">
                    <div className="flex items-start gap-5 flex-1">
                      <span
                        className="text-[24px] font-bold tracking-tight shrink-0 mt-0.5"
                        style={{ color: "#2a2a2a" }}
                      >
                        {p.num}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold text-white tracking-[-0.01em] mb-3 glow-hover">
                          {p.title}
                        </h3>
                        <p className="text-[14px] leading-[1.75]" style={{ color: "#666" }}>
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlareHover>
              </StarBorder>
            </motion.div>
          ))}
        </div>

        {/* Credentials */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-between gap-6 px-8 py-5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          {[
            { l: "Education", v: "M.Sc Software Systems (Integrated)" },
            { l: "Institution", v: "PSG College of Arts & Science" },
            { l: "Approach", v: "Security-first, research-driven" },
          ].map((c) => (
            <div key={c.l}>
              <span className="section-label block mb-1">{c.l}</span>
              <span className="text-[13px] font-medium glow-hover" style={{ color: "#999" }}>{c.v}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
