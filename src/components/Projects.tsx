"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import BorderGlow from "./BorderGlow";
import ShinyText from "./ShinyText";
import NorrisText from "./NorrisText";
import Lanyard from "./Lanyard";


const GAP = 40;          // px gap between cards
const AUTO_SPEED = 0.45; // px per animation frame

const projects = [
  {
    title: "PSGCAS Student App",
    tagline: "Redefining campus connectivity",
    description: "Cross-platform mobile app replacing the college's legacy system. Students access schedules, grades, and resources from a single pane — on any device.",
    stack: ["React Native", "Expo", "JavaScript", "Firebase"],
    category: "Mobile",
    year: "2024",
    href: "https://github.com/TechyDarsh/PSGCAS-StudentApp-PoweredByReact",
    image: "/psgcas.jpeg",
  },
  {
    title: "FarmConnect",
    tagline: "Bridging the digital divide in agriculture",
    description: "Connecting farmers directly to markets & real-time data — removing middlemen and information asymmetry through technology.",
    stack: ["JavaScript", "Node.js", "REST API", "MongoDB"],
    category: "Web Platform",
    year: "2024",
    href: "https://contractfarming.netlify.app/",
    image: "/farm.png",
  },
  {
    title: "Blockchain Suite",
    tagline: "From genesis block to smart contracts",
    description: "Comprehensive blockchain implementation — consensus algorithms, Solidity contracts, and DApp deployment with educational documentation.",
    stack: ["Blockchain", "Solidity", "DApps"],
    category: "Distributed",
    year: "2023",
    href: "https://blockchain.com",
    image: "/farm.jpeg",
  },
  {
    title: "Stock Prediction Engine",
    tagline: "ML meets financial forecasting",
    description: "LSTM networks and regression models processing time-series data for stock price prediction with quantifiable accuracy metrics.",
    stack: ["Python", "TensorFlow", "Pandas", "NumPy"],
    category: "Machine Learning",
    year: "2023",
    href: "https://github.com/Techydarsh/StockPrediction_Simple",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Quantum OS",
    tagline: "An AI-prototyped operating system",
    description: "A research-grade agentic OS prototype built to explore AI-native operating system functionalities — process scheduling, memory management, and shell AI agents working in concert.",
    stack: ["Python", "Rust", "LLM Agents", "WASM"],
    category: "Systems",
    year: "2024",
    href: "https://github.com/TechyDarsh/QuantumOS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // All animation state in refs — zero React re-renders during scroll
  const xRef = useRef(0);
  const animRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartX = useRef(0);
  const setWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    /* ── Setup: measure container, size cards, compute set width ── */
    const setup = () => {
      const cw = wrapper.clientWidth;
      const isMobile = cw < 768;
      const cardWidth = isMobile ? cw : (cw - GAP) / 2;
      const itemWidth = cardWidth + GAP;
      const setWidth = projects.length * itemWidth;
      setWidthRef.current = setWidth;

      track
        .querySelectorAll<HTMLElement>(".proj-card-slot")
        .forEach((el) => (el.style.width = `${cardWidth}px`));

      // Initialise once — start at the middle clone set
      if (xRef.current === 0) {
        xRef.current = -setWidth;
      }
    };

    setup();

    /* ── Clamp: keep x inside the middle clone window ── */
    const clamp = (x: number) => {
      const sw = setWidthRef.current;
      let nx = x;
      if (nx <= -(sw * 2)) nx += sw;
      if (nx >= 0) nx -= sw;
      return nx;
    };

    /* ── Animation loop ── */
    const tick = () => {
      if (!isDraggingRef.current) {
        xRef.current -= AUTO_SPEED;
      }
      xRef.current = clamp(xRef.current);
      track.style.transform = `translateX(${xRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    /* ── Pointer drag ── */
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartClientX.current = e.clientX;
      dragStartX.current = xRef.current;
      wrapper.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartClientX.current;
      if (Math.abs(dx) > 4) hasDraggedRef.current = true;
      xRef.current = clamp(dragStartX.current + dx);
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      wrapper.style.cursor = "grab";
    };

    /* ── Wheel / trackpad scroll ──
       Only intercept horizontal swipes to pan carousel.
       Vertical scroll is ALWAYS passed through to the page. */
    const onWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (isHorizontal) {
        e.preventDefault();
        xRef.current = clamp(xRef.current - e.deltaX * 1.8);
      }
      // Vertical scroll: do nothing — browser handles page scroll normally
    };

    /* ── Resize observer ── */
    const ro = new ResizeObserver(setup);
    ro.observe(wrapper);

    wrapper.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    sectionRef.current?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      wrapper.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      sectionRef.current?.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Triple the array so the loop is always seamless
  const looped = [...projects, ...projects, ...projects];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative pt-28 md:pt-40 pb-0"
      style={{ background: "transparent" }}
    >
      <div className="rule" />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 mb-14"
      >
        <div className="flex items-end justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label block mb-4"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}
            >
              <NorrisText text="Every project solves a real problem." />
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="https://github.com/TechyDarsh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-ghost text-sm"
          >
            GitHub →
          </motion.a>
        </div>
      </div>

      {/* ── Infinite Carousel ── */}
      <div
        ref={wrapperRef}
        className="overflow-hidden select-none px-6 md:px-10 lg:px-14"
        style={{ cursor: "grab", touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP}px` }}
        >
          {looped.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="proj-card-slot flex-shrink-0"
            >
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer group block"
                draggable={false}
                onClick={(e) => {
                  if (hasDraggedRef.current) e.preventDefault();
                }}
              >
                <BorderGlow
                  className="project-card"
                  glowColor="280 80 70"
                  backgroundColor="#080808"
                  borderRadius={28}
                  glowRadius={50}
                  glowIntensity={0.8}
                  colors={["#A036D9", "#FF2D55", "#5AC8FA"]}
                >
                  {/* Visual banner */}
                  <div className="project-visual h-48 flex items-center justify-center relative overflow-hidden bg-[#0c0c0c]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

                    {/* Year badge */}
                    <span
                      className="absolute top-4 right-4 text-[11px] font-mono px-3 py-1 rounded-full z-10"
                      style={{
                        color: "#555",
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {p.year}
                    </span>
                  </div>

                  {/* Static content */}
                  <div className="p-7 project-details">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="tag text-[10px]">{p.category}</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-white tracking-[-0.01em] mb-1 group-hover:text-[#ddd] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[13px]" style={{ color: "#555" }}>
                      {p.tagline}
                    </p>
                  </div>

                  {/* Hover flow content */}
                  <div className="flow-text">
                    <p
                      className="text-[14px] leading-[1.7] mb-5"
                      style={{ color: "#999" }}
                    >
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="tag text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div
                      className="mt-4 flex items-center gap-2 text-[12px] font-medium"
                      style={{ color: "#666" }}
                    >
                      <span>View Project</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 12L12 4M12 4H5M12 4v7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </BorderGlow>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Custom bottom section (Quote + Signature + Lanyard) ── */}
      <div className="max-w-7xl mx-auto px-6 mt-32 md:mt-48 mb-20 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side: Text and Signature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 md:pr-8 pointer-events-none flex flex-col items-center text-center"
          >
            <p
              className="font-bold tracking-[-0.04em] leading-[1.15]"
              style={{ fontSize: "clamp(20px, 3vw, 44px)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.12)" }}>&ldquo;</span>
              <span className="max-md:whitespace-normal whitespace-nowrap">
                <ShinyText
                  text="Jack of All Trades,master of none but"
                  color="rgba(255,255,255,0.6)"
                  shineColor="#ffffff"
                  speed={4}
                  delay={0}
                  spread={110}
                />
              </span>
              <br className="hidden md:block" />
              <span className="max-md:whitespace-normal whitespace-nowrap">
                <ShinyText
                  text="often better than a master of one."
                  color="#7B2FBE"
                  shineColor="#5AC8FA"
                  speed={3.5}
                  delay={0.8}
                  spread={100}
                />
                <span style={{ color: "rgba(255,255,255,0.12)" }}>&rdquo;</span>
              </span>
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.12)" }} />
              <span className="text-[12px] font-mono tracking-[0.18em] uppercase" style={{ color: "#444" }}>
                A philosophy, not an excuse
              </span>
            </div>

            {/* Signature — after the attribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 w-full flex justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sign.png"
                alt="Signature"
                style={{
                  width: "50%",
                  minWidth: "220px",
                  height: "auto",
                  opacity: 1,
                  filter: "none",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Right side: Lanyard Component */}
          <motion.div
            className="flex-1 w-full h-[450px] md:h-[700px] relative z-10 max-md:-mt-10 md:-translate-x-16 lg:-translate-x-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Lanyard position={[0, -1, 16]} gravity={[0, -40, 0]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
