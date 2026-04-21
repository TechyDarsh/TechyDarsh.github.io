"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const info = [
  { label: "Email", value: "sridarshancs@gmail.com", href: "mailto:sridarshancs@gmail.com" },
  { label: "Phone", value: "+91 9894710666", href: "tel:+919894710666" },
  { label: "GitHub", value: "github.com/TechyDarsh", href: "https://github.com/TechyDarsh" },
  { label: "Location", value: "Coimbatore, Tamil Nadu", href: null },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
  };

  return (
    <section id="contact" className="py-28 md:py-40" style={{ background: "transparent" }}>
      <div className="rule" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20">
        {/* Header */}
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label block mb-4">
          Contact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bold tracking-[-0.03em] text-white mb-4"
          style={{ fontSize: "clamp(28px, 3.2vw, 46px)" }}
        >
          Let&apos;s build something together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[15px] max-w-lg mb-14" style={{ color: "#555" }}
        >
          Whether it&apos;s an ambitious product, a complex challenge, or a great conversation — reach out.
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form — clean underline fields */}
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="lg:col-span-7 space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.id} className="input-wrap">
                  <input id={f.id} type={f.type} required placeholder=" " autoComplete={f.id} className="input-field" />
                  <label htmlFor={f.id} className="input-label">{f.label}</label>
                </div>
              ))}
            </div>
            <div className="input-wrap">
              <input id="subject" type="text" required placeholder=" " className="input-field" />
              <label htmlFor="subject" className="input-label">Subject</label>
            </div>
            <div className="input-wrap">
              <textarea id="message" rows={4} required placeholder=" " className="input-field resize-none" />
              <label htmlFor="message" className="input-label">Message</label>
            </div>
            <button type="submit" disabled={status !== "idle"}
              className={`btn-primary ${status !== "idle" ? "opacity-60 !cursor-not-allowed" : ""}`}
            >
              {status === "sent" ? "Sent ✓" : status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </motion.form>

          {/* Info panel */}
          <div className="lg:col-span-5">
            <div className="space-y-0 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="px-6 py-5 border-b last:border-0 hover:bg-white/[0.01] transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.03)", background: "rgba(255,255,255,0.01)" }}
                >
                  <span className="section-label block mb-1.5">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[14px] font-medium hover:text-white transition-colors" style={{ color: "#888" }}
                    >{item.value}</a>
                  ) : (
                    <span className="text-[14px] font-medium" style={{ color: "#888" }}>{item.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-5 flex items-center gap-3 px-5 py-4 rounded-xl"
              style={{ border: "1px solid rgba(52,211,153,0.06)", background: "rgba(52,211,153,0.02)" }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <div>
                <span className="block text-[13px] font-medium text-white">Available Now</span>
                <span className="block text-[11px]" style={{ color: "#444" }}>Full-time · Contract · Freelance</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
