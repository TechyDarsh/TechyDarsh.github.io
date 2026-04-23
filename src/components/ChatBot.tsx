"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Personality: professional with a splash of sarcasm ─── */

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

/* ─── Knowledge base for smart keyword matching ─── */
const responses: { keywords: string[]; replies: string[] }[] = [
  {
    keywords: ["hello", "hi", "hey", "sup", "yo"],
    replies: [
      "Hey there! Welcome to Darshan's digital lair. I'm his AI assistant — think Jarvis, but with better jokes. What can I help you with?",
      "Hello! You've reached the portfolio of Sri Darshan C S. I'm the AI that pretends to know everything. How can I assist?",
      "Well, hello! Glad you clicked that button. Most people just scroll past. What brings you here?",
    ],
  },
  {
    keywords: ["name", "who are you", "what are you"],
    replies: [
      "I'm Darshan's portfolio AI — trained on caffeine, ambition, and an unreasonable number of Stack Overflow tabs. Nice to meet you.",
      "I'm the digital assistant embedded in this portfolio. Think of me as Darshan's spokesperson, except I never sleep.",
    ],
  },
  {
    keywords: ["project", "work", "portfolio", "built", "made"],
    replies: [
      "Darshan's built everything from a full-blown college app (PSGCAS Student App) to a Blockchain Suite and an AI-powered OS prototype called QuantumOS. Scroll up to 'Selected Works' — or I can pretend I built them. Your call.",
      "The selected works section has the highlights — FarmConnect, Stock Prediction Engine, Quantum OS, and more. Each one involved mass amounts of coffee and questionable sleep schedules.",
      "Projects? Oh, Darshan's got a few. From connecting farmers to markets with FarmConnect, to building blockchain infrastructure. Just scroll up to the Selected Works section!",
    ],
  },
  {
    keywords: ["skill", "tech", "stack", "language", "framework"],
    replies: [
      "Python, JavaScript, TypeScript, React, Next.js, Node.js, TensorFlow, Docker, AWS — and an unhealthy obsession with making UIs pixel-perfect. Check the Skills section for the full arsenal.",
      "Let's just say the tech stack is... extensive. Full-stack development, ML/AI, cloud architecture, cybersecurity — Darshan doesn't believe in specializing when you can do everything. The Skills marquee section has all the details.",
    ],
  },
  {
    keywords: ["contact", "hire", "email", "reach", "message"],
    replies: [
      "You can reach Darshan at sridarshancs@gmail.com. Or just scroll down to the Contact section and fill the form like a civilized human. Either works.",
      "The Contact section is right below — email, form, the whole nine yards. Darshan typically responds faster than this chatbot processes existential dread.",
      "Want to hire Darshan? Excellent taste. Drop a message through the Contact form or shoot an email to sridarshancs@gmail.com. He checks it more often than he'd like to admit.",
    ],
  },
  {
    keywords: ["experience", "background", "education", "college", "university"],
    replies: [
      "Darshan is a Software Development Engineer with expertise in AI/ML, Cloud Architecture, Cybersecurity, and Full-Stack Development. The About section has the professional biography — I recommend reading it with dramatic background music.",
      "BSc Computer Science from PSGCAS, then straight into building things that actually work. The About section covers it all — experience, philosophy, and all that serious stuff.",
    ],
  },
  {
    keywords: ["github", "code", "repository", "repo", "open source"],
    replies: [
      "Darshan's GitHub is github.com/TechyDarsh — it's basically a museum of late-night coding sessions. Feel free to explore, star, or silently judge the commit messages.",
      "Head over to github.com/TechyDarsh. Fair warning: the commit history reads like a thriller novel with plot twists at 3 AM.",
    ],
  },
  {
    keywords: ["ai", "machine learning", "ml", "deep learning", "model"],
    replies: [
      "AI and ML are core competencies — from LSTM-based stock prediction to LLM agents in QuantumOS. Darshan doesn't just use AI frameworks; he architectures intelligent systems from the ground up.",
      "Machine Learning is basically Darshan's bread and butter. TensorFlow, PyTorch, neural networks — the whole spectrum. Check out the Stock Prediction Engine in Selected Works for a practical example.",
    ],
  },
  {
    keywords: ["fun", "hobby", "free time", "interest"],
    replies: [
      "When not coding, Darshan is probably exploring new tech, breaking and rebuilding things, or pretending that 'just one more feature' won't take three hours. A classic developer lifestyle.",
      "Hobbies include: pushing to production on Fridays, debating tabs vs. spaces (it's spaces, obviously), and building side projects that somehow become main projects.",
    ],
  },
  {
    keywords: ["joke", "funny", "laugh"],
    replies: [
      "Why do programmers prefer dark mode? Because light attracts bugs. ...I'll see myself out.",
      "A SQL query walks into a bar, sees two tables, and asks: 'Can I JOIN you?' ... Okay, I promise I'm better at answering real questions.",
      "There are only 10 types of people in the world: those who understand binary, and those who don't. You're welcome.",
    ],
  },
  {
    keywords: ["good", "great", "awesome", "nice", "cool", "amazing", "love"],
    replies: [
      "I appreciate that! I'll relay the compliment to Darshan. His ego could always use a responsible boost.",
      "Thanks! If you think the portfolio is good, you should see the rejected designs. Actually, no. Don't.",
      "Glad you like it! This portfolio was built with Next.js, Framer Motion, and an unreasonable amount of perfectionism.",
    ],
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "quit"],
    replies: [
      "Goodbye! Thanks for chatting. Don't be a stranger — Darshan's inbox is always open (mostly because he forgot to close it).",
      "See you around! If you need anything, I'll be here, floating in the corner of this website for eternity. No pressure.",
      "Bye! Remember: great developers are like great wine — they only get better with more commits. Or something like that.",
    ],
  },
  {
    keywords: ["blockchain", "web3", "crypto", "solidity"],
    replies: [
      "Ah, blockchain — Darshan's built an entire suite covering consensus algorithms, Solidity smart contracts, and DApp deployment. It's in the Selected Works section. Yes, he actually understands how it works. Shocking, I know.",
    ],
  },
  {
    keywords: ["cloud", "aws", "docker", "devops", "deploy"],
    replies: [
      "Cloud architecture and DevOps are in the toolkit. AWS, Docker, CI/CD pipelines — Darshan believes infrastructure should be as elegant as the code running on it. The Skills section has the specifics.",
    ],
  },
  {
    keywords: ["security", "cyber", "hack", "vulnerability"],
    replies: [
      "Cybersecurity is one of Darshan's specializations. Securing digital frontiers is literally one of his taglines. He doesn't just build systems — he makes sure they don't crumble when someone tries to break them.",
    ],
  },
];

const fallbackReplies = [
  "Interesting question! I'm not entirely sure how to respond to that, but I assure you Darshan would have a brilliant answer. Try asking about his projects, skills, or how to get in touch!",
  "Hmm, that's a bit outside my training data. I'm basically a fancy keyword matcher pretending to be intelligent. Try asking about Darshan's work, tech stack, or contact info!",
  "I have no idea how to respond to that with any dignity. Can I interest you in information about Darshan's projects, skills, or how to hire him instead?",
  "That's... a unique query. My neural networks (a generous term for if-else statements) can't process that. Try asking about projects, skills, experience, or contact info!",
  "I appreciate the creative input, but let's keep it professional. Ask me about Darshan's projects, technical skills, or how to reach out to him!",
];

const greetings = [
  "Hey! I'm Darshan's AI assistant. Think of me as Siri, but I actually know what I'm talking about. Ask me anything about his work!",
  "Welcome! I'm the chatbot that lives rent-free on this portfolio. Ask me about Darshan's projects, skills, or just say hi!",
];

function getReply(input: string): string {
  const lower = input.toLowerCase().trim();
  
  // Check each category
  for (const category of responses) {
    if (category.keywords.some((kw) => lower.includes(kw))) {
      return category.replies[Math.floor(Math.random() * category.replies.length)];
    }
  }
  
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let idCounter = useRef(0);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ id: idCounter.current++, text: greeting, from: "bot" }]);
    }
  }, [hasOpened]);

  // Listen for custom event to open from dock
  useEffect(() => {
    const handleCustomOpen = () => handleOpen();
    window.addEventListener("open-chatbot", handleCustomOpen);
    return () => window.removeEventListener("open-chatbot", handleCustomOpen);
  }, [handleOpen]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: idCounter.current++,
      text: trimmed,
      from: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate "thinking" delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const reply = getReply(trimmed);
      const botMsg: Message = {
        id: idCounter.current++,
        text: reply,
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }, [input]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="hidden md:flex fixed md:bottom-6 md:right-6 z-[9998] w-14 h-14 rounded-full items-center justify-center cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7B2FBE 0%, #A036D9 100%)",
              boxShadow: "0 8px 32px rgba(160, 54, 217, 0.4), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
            whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(160, 54, 217, 0.55)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            {/* Chat icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Notification dot */}
            {!hasOpened && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050505]">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-6 md:right-6 z-[9998] flex flex-col"
            style={{
              width: "min(400px, calc(100vw - 48px))",
              height: "min(560px, calc(100vh - 120px))",
              borderRadius: 20,
              background: "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(160, 54, 217, 0.08)",
              overflow: "hidden",
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #7B2FBE 0%, #A036D9 100%)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 2v2" /><path d="M12 22v-2" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none tracking-[-0.01em]">
                    Darshan&apos;s AI
                  </p>
                  <p className="text-[11px] mt-0.5 font-medium" style={{ color: "#4ade80" }}>
                    ● Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                aria-label="Close chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Messages area ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1a1a1a transparent",
              }}
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[85%] px-4 py-2.5 text-[13px] leading-[1.55]"
                      style={{
                        borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background:
                          msg.from === "user"
                            ? "linear-gradient(135deg, #7B2FBE 0%, #A036D9 100%)"
                            : "rgba(255,255,255,0.05)",
                        color: msg.from === "user" ? "#fff" : "rgba(255,255,255,0.75)",
                        border: msg.from === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none",
                        fontWeight: 450,
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-4 py-3 flex items-center gap-1.5"
                      style={{
                        borderRadius: "16px 16px 16px 4px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.35)" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Quick suggestions ── */}
            {messages.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {["Projects", "Skills", "Contact", "Tell me a joke"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        const userMsg: Message = { id: idCounter.current++, text: q, from: "user" };
                        setMessages((prev) => [...prev, userMsg]);
                        setIsTyping(true);
                        setTimeout(() => {
                          const reply = getReply(q);
                          const botMsg: Message = { id: idCounter.current++, text: reply, from: "bot" };
                          setMessages((prev) => [...prev, botMsg]);
                          setIsTyping(false);
                        }, 600 + Math.random() * 800);
                      }, 50);
                      setInput("");
                    }}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(160, 54, 217, 0.3)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input bar ── */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[rgba(255,255,255,0.25)]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #7B2FBE 0%, #A036D9 100%)"
                    : "rgba(255,255,255,0.04)",
                  transition: "all 0.25s ease",
                  opacity: input.trim() ? 1 : 0.4,
                }}
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
