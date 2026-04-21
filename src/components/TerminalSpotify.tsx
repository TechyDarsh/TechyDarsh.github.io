"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface Line {
  type: "input" | "output" | "system" | "error";
  text: string;
}

const helpText = [
  "  about       — who is Sri Darshan?",
  "  skills      — tech stack overview",
  "  projects    — featured work",
  "  contact     — reach out",
  "  education   — academic background",
  "  philosophy  — engineering mindset",
  "  github      — open GitHub profile",
  "  clear       — clear terminal",
  "  help        — show this menu",
];

const responses: Record<string, string[]> = {
  about: [
    "╔══════════════════════════════════════╗",
    "║  Sri Darshan C S                     ║",
    "║  Software Development Engineer       ║",
    "╚══════════════════════════════════════╝",
    "",
    "  Specializing in AI/ML, Cloud, Security,",
    "  and Full-Stack Development.",
    "",
    "  I don't just write code — I architect",
    "  systems that think, scale, and defend.",
  ],
  skills: [
    "  ┌─ Languages ──────────────────────┐",
    "  │ Python · TypeScript · Go · Java  │",
    "  │ C++ · Kotlin · Swift · C# · PHP  │",
    "  └──────────────────────────────────┘",
    "  ┌─ Frameworks & Cloud ─────────────┐",
    "  │ React · Next.js · Node.js        │",
    "  │ Django · AWS · Firebase · Docker  │",
    "  └──────────────────────────────────┘",
  ],
  projects: [
    "  01 │ PSGCAS Student App    │ Mobile    │ 2024",
    "  02 │ FarmConnect           │ Web       │ 2024",
    "  03 │ Blockchain Suite      │ DApps     │ 2023",
    "  04 │ Stock Prediction      │ ML        │ 2023",
    "",
    "  → github.com/TechyDarsh",
  ],
  contact: [
    "  ┌─ Get in touch ───────────────────┐",
    "  │ Email: sridarshancs@gmail.com     │",
    "  │ Phone: +91 9894710666             │",
    "  │ GitHub: github.com/TechyDarsh     │",
    "  └──────────────────────────────────┘",
  ],
  education: [
    "  🎓 PSG College of Arts & Science",
    "  M.Sc Software Systems (Integrated)",
    "  Coimbatore, Tamil Nadu, India",
  ],
  philosophy: [
    '  "Can it think? Can it be broken?"',
    "",
    "  Every system starts with these",
    "  two questions. AI + security =",
    "  engineering guarantees.",
  ],
};

export default function TerminalSpotify() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "darshan.terminal v1.0.0" },
    { type: "system", text: 'Type "help" for commands.' },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: "input", text: `$ ${cmd}` }];

    if (trimmed === "clear") {
      setLines([{ type: "system", text: "Cleared." }, { type: "system", text: "" }]);
      setInput("");
      return;
    }
    if (trimmed === "help") {
      newLines.push({ type: "system", text: "Commands:" });
      helpText.forEach((t) => newLines.push({ type: "output", text: t }));
    } else if (trimmed === "github") {
      newLines.push({ type: "system", text: "Opening GitHub..." });
      window.open("https://github.com/TechyDarsh", "_blank");
    } else if (responses[trimmed]) {
      responses[trimmed].forEach((t) => newLines.push({ type: "output", text: t }));
    } else if (trimmed !== "") {
      newLines.push({ type: "error", text: `  command not found: ${trimmed}` });
      newLines.push({ type: "system", text: '  Try "help"' });
    }
    newLines.push({ type: "system", text: "" });
    setLines(newLines);
    setInput("");
  };

  return (
    <section className="py-28 md:py-40" style={{ background: "transparent" }}>
      <div className="rule" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20">
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label block mb-4">
          Interactive
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bold tracking-[-0.03em] text-white mb-14"
          style={{ fontSize: "clamp(28px, 3.2vw, 46px)" }}
        >
          Explore & vibe.
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Terminal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: "#ff5f57" }} />
                <div className="terminal-dot" style={{ background: "#febc2e" }} />
                <div className="terminal-dot" style={{ background: "#28c840" }} />
                <span className="text-[11px] ml-3" style={{ color: "#444", fontFamily: "'JetBrains Mono', monospace" }}>
                  darshan@portfolio ~ %
                </span>
              </div>
              <div ref={bodyRef} className="terminal-body overflow-x-auto">
                {lines.map((line, i) => (
                  <div key={i} style={{
                    color: line.type === "input" ? "#999" : line.type === "output" ? "#888" : line.type === "error" ? "#f87171" : "#555",
                    fontSize: 13, lineHeight: 1.7,
                  }}>
                    {line.text || "\u00A0"}
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span style={{ color: "#4ade80", fontSize: 13 }}>$</span>
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleCommand(input); }}
                    className="terminal-input" placeholder="type a command..." spellCheck={false} autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <p className="text-[11px] mt-3" style={{ color: "#333" }}>
              Try: help · about · skills · projects · philosophy
            </p>
          </motion.div>

          {/* Spotify — themed banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.7 }}>
            <div className="glass-panel overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a, #0d0b12)" }}>
              {/* Banner header */}
              <div className="px-7 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  <span className="text-[13px] font-medium" style={{ color: "#888" }}>Currently Vibing</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: "#333" }}>Spotify</span>
              </div>

              {/* Spotify embed — compact dark player */}
              <div className="p-4">
                <iframe
                  title="Spotify Player"
                  data-testid="embed-iframe"
                  style={{ borderRadius: "12px", background: "transparent" }}
                  src="https://open.spotify.com/embed/track/14mT8BCOXiUUcGlb7KujkT?utm_source=generator"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              {/* Mood tags */}
              <div className="px-7 pb-5 flex items-center gap-2">
                {["Late Night", "Focus", "Code", "Chill"].map((t) => (
                  <span key={t} className="tag" style={{ fontSize: 10, padding: "3px 10px" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
