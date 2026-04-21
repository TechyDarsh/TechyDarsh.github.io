"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import TerminalSpotify from "@/components/TerminalSpotify";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBot from "@/components/ChatBot";
import Particles from "@/components/Particles";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <TerminalSpotify />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
