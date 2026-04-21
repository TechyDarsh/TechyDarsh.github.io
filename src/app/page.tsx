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

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
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
    </>
  );
}
