"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Dock from "./Dock";
import { VscPerson, VscBriefcase, VscTools, VscMail, VscRobot } from "react-icons/vsc";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Expertise", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const dockItems = [
  { icon: <VscPerson size={18} />, label: "About", onClick: () => window.location.href = "#about" },
  { icon: <VscBriefcase size={18} />, label: "Work", onClick: () => window.location.href = "#projects" },
  { icon: <VscTools size={18} />, label: "Expertise", onClick: () => window.location.href = "#skills" },
  { icon: <VscMail size={18} />, label: "Contact", onClick: () => window.location.href = "#contact" },
  { icon: <VscRobot size={18} />, label: "AI Chat", onClick: () => window.dispatchEvent(new Event("open-chatbot")) },
];

/* ─── Magnetic button hook ─── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, sx, sy, onMove, onLeave };
}

/* ─── Animated nav link ─── */
function NavLink({ label, href, dark = false }: { label: string; href: string; dark?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { ref: magRef, sx: magSx, sy: magSy, onMove: magOnMove, onLeave: magOnLeave } = useMagnetic(0.25);

  const activeColor = dark ? "#111" : "#fff";
  const idleColor = dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.38)";
  const underlineColor = dark
    ? "linear-gradient(90deg, transparent, rgba(0,0,0,0.5), transparent)"
    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)";

  return (
    <motion.a
      ref={magRef as React.Ref<HTMLAnchorElement>}
      href={href}
      onMouseMove={magOnMove as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={() => { magOnLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className="relative px-1 py-0.5 text-[13px] font-medium tracking-[-0.01em] select-none"
      style={{
        color: hovered ? activeColor : idleColor,
        transition: "color 0.3s ease",
        x: magSx,
        y: magSy,
      }}
    >
      {label}
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-0.5 left-0 right-0 h-px"
        style={{ background: underlineColor }}
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.a>
  );
}

/* ─── Pill glow cursor tracker ─── */
function GlowOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 99,
        mixBlendMode: "screen",
      }}
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { ref: hireRef, sx: hireSx, sy: hireSy, onMove: hireOnMove, onLeave: hireOnLeave } = useMagnetic(0.4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlowOrb />

      {/* ── MAIN NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          willChange: "transform",
        }}
      >
        {/* Frosted glass bar */}
        <motion.div
        animate={{
            background: scrolled
              ? "rgba(8,8,8,0.82)"
              : "rgba(8,8,8,0)",
            backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(0px)",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            borderBottom: scrolled
              ? "0.5px solid rgba(255,255,255,0.06)"
              : "0.5px solid transparent",
          }}
        >
          {/* Top shimmer line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)",
              transformOrigin: "left",
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 2rem",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >

            {/* ── Desktop Links — absolutely centred ── */}
            <nav
              style={{
                display: "none",
                alignItems: "center",
                gap: "2px",
                padding: "6px 8px",
                borderRadius: "100px",
                background: scrolled ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
                border: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "0.5px solid rgba(0,0,0,0.08)",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                transition: "background 0.5s ease, border 0.5s ease",
              }}
              className="md-flex"
            >
              {links.map((l) => (
                <div key={l.label} style={{ position: "relative" }}>
                  <NavLink label={l.label} href={l.href} dark={!scrolled} />
                </div>
              ))}
            </nav>

            {/* ── CTA ── */}
            <motion.a
              ref={hireRef as React.Ref<HTMLAnchorElement>}
              href="mailto:sridarshancs@gmail.com"
              style={{
                x: hireSx,
                y: hireSy,
                display: "none",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: scrolled ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)",
                textDecoration: "none",
                border: scrolled ? "0.5px solid rgba(255,255,255,0.1)" : "0.5px solid rgba(0,0,0,0.15)",
                background: scrolled ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                flexShrink: 0,
                fontFamily: "inherit",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.5s ease, border 0.5s ease, color 0.5s ease",
              }}
              className="md-flex hire-btn"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onMouseMove={hireOnMove as any}
              onMouseLeave={hireOnLeave}
              whileHover="hov"
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer sweep */}
              <motion.span
                variants={{
                  hov: {
                    x: ["−120%", "120%"],
                    transition: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "60%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                  pointerEvents: "none",
                  x: "-120%",
                }}
              />
              <span>Hire me</span>
              {/* Arrow */}
              <motion.svg
                variants={{ hov: { x: 2, opacity: 1 } }}
                initial={{ x: -2, opacity: 0.4 }}
                transition={{ duration: 0.25 }}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.a>

          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Dock ── */}
      <div className="dock-container" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 101, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>
          <Dock items={dockItems} panelHeight={48} baseItemSize={30} magnification={42} distance={60} />
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .dock-container { display: none !important; }
        }
        @media (max-width: 767px) {
          .md-flex { display: none !important; }
        }
        .hire-btn:hover {
          color: rgba(255,255,255,0.95) !important;
          border-color: rgba(255,255,255,0.15) !important;
          background: rgba(255,255,255,0.07) !important;
        }
      `}</style>
    </>
  );
}