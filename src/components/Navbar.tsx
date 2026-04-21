"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Expertise", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  const { ref: magRef, sx: magSx, sy: magSy, onMove: magOnMove, onLeave: magOnLeave } = useMagnetic(0.25);

  return (
    <motion.a
      ref={magRef as React.Ref<HTMLAnchorElement>}
      href={href}
      onMouseMove={magOnMove as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={() => { magOnLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className="relative px-1 py-0.5 text-[13px] font-medium tracking-[-0.01em] select-none"
      style={{
        color: hovered ? "#fff" : "rgba(255,255,255,0.38)",
        transition: "color 0.3s ease",
        x: magSx,
        y: magSy,
      }}
    >
      {label}
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-0.5 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.06)",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              className="md-flex"
            >
              {links.map((l) => (
                <div key={l.label} style={{ position: "relative" }}>
                  <NavLink label={l.label} href={l.href} />
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
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                border: "0.5px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                flexShrink: 0,
                fontFamily: "inherit",
                position: "relative",
                overflow: "hidden",
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

            {/* ── Hamburger ── */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              whileTap={{ scale: 0.92 }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                alignItems: "center",
              }}
              className="mobile-menu-btn"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 6.5, width: 20 }
                        : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -6.5, width: 20 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1, width: i === 1 ? 14 : 20 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "block",
                    height: "1px",
                    borderRadius: "1px",
                    background: "rgba(255,255,255,0.5)",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.button>
          </div>
        </motion.div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                background: "rgba(6,6,6,0.97)",
                backdropFilter: "blur(40px)",
                borderBottom: "0.5px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      borderBottom: i < links.length - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none",
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      fontFamily: "inherit",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                  >
                    <span>{l.label}</span>
                    <motion.svg
                      initial={{ x: -4, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.a>
                ))}

                <motion.a
                  href="mailto:sridarshancs@gmail.com"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "1.5rem",
                    padding: "10px 20px",
                    borderRadius: "100px",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontFamily: "inherit",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Hire me
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Scoped styles ── */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .md-flex { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
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