"use client";

import { motion } from "framer-motion";

const navColumns = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "#about" },
      { label: "Selected Work", href: "#projects" },
      { label: "Expertise", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/TechyDarsh", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/sridarshancs", external: true },
      { label: "Email", href: "mailto:sridarshancs@gmail.com" },
      { label: "Phone", href: "tel:+919894710666" },
    ],
  },
  {
    title: "Domains",
    links: [
      { label: "AI / Machine Learning", href: "#about" },
      { label: "Cloud Architecture", href: "#about" },
      { label: "Cybersecurity", href: "#about" },
      { label: "Full-Stack Dev", href: "#about" },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/TechyDarsh",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/darshcs",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/thedarsh.cs",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#050505" }}>
      <div className="rule" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10">
        {/* ── Top section: Tagline + Link columns ── */}
        <div className="grid lg:grid-cols-12 gap-16 mb-20">

          {/* Left — Big tagline + CTA */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold tracking-[-0.04em] leading-[1.1] text-white mb-8"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              Let&apos;s build<br />
              something<br />
              <span style={{ color: "#A036D9" }}>extraordinary.</span>
            </motion.h2>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              href="mailto:sridarshancs@gmail.com"
              className="btn-ghost inline-flex"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              sridarshancs@gmail.com
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H5M12 4v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* Right — Link columns in a glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="lg:col-span-7 rounded-2xl px-8 py-8 md:px-10 md:py-10"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              {navColumns.map((col) => (
                <div key={col.title}>
                  <span
                    className="block text-[12px] font-semibold tracking-[0.12em] uppercase mb-5"
                    style={{ color: "#888" }}
                  >
                    {col.title}
                  </span>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-[13px] font-medium transition-colors duration-300 hover:text-white flex items-center gap-1.5"
                          style={{ color: "#555" }}
                        >
                          {link.label}
                          {link.external && (
                            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
                              <path d="M4 12L12 4M12 4H5M12 4v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar: social + copyright ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          {/* Left: Follow */}
          <div className="flex items-center gap-6">
            <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "#333" }}>
              Follow me on:
            </span>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-all duration-300 hover:text-white hover:scale-110"
                  style={{ color: "#444" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Copyright */}
          <span
            className="text-[10px] tracking-[0.08em]"
            style={{ color: "#1a1a1a", fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {new Date().getFullYear()} Sri Darshan C S · Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
