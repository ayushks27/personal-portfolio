import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CanvasContainer } from '../components/3d/CanvasContainer';
import { NeuralNetwork } from '../components/3d/NeuralNetwork';
import { ArrowDown } from 'lucide-react';

const ROLES = ['Software Developer', 'Data Analyst', 'Creative Head'];

export const Hero: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect simulation
  useEffect(() => {
    const activeRole = ROLES[roleIndex];
    let timer: any;

    if (!isDeleting && charIndex < activeRole.length) {
      // Type next character
      timer = setTimeout(() => {
        setTypewriterText(activeRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    } else if (isDeleting && charIndex > 0) {
      // Delete next character
      timer = setTimeout(() => {
        setTypewriterText(activeRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === activeRole.length) {
      // Fully typed: wait 1 second before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && charIndex === 0) {
      // Fully deleted: pause for 500ms, then switch to the next role
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] py-12 flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-black text-black dark:text-white select-none z-10 transition-colors duration-500"
    >
      {/* 3D Background */}
      <CanvasContainer cameraPosition={[0, 0, 4]}>
        <NeuralNetwork />
      </CanvasContainer>

      {/* Grid overlay for futuristic blueprint vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.98)_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.95)_80%)] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[1]" />

      {/* Hero Content Container */}
      <div className="relative z-10 -mt-12 md:-mt-20 px-6 md:px-12 max-w-5xl w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-16 text-center md:text-left">

        {/* Monochromatic Profile Portrait Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-32 h-32 md:w-52 md:h-52 rounded-full group overflow-hidden select-none flex-shrink-0"
          style={{
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)'
          }}
        >
          <img
            src="/profile_purnendu.jpg"
            alt="Purnendu Raghav Srivastava Portrait"
            className="w-full h-full object-cover object-top rounded-full transition-transform duration-500 group-hover:scale-110 pointer-events-none"
          />
        </motion.div>

        {/* Right Side: Text & Actions Container */}
        <div className="flex flex-col items-center md:items-start max-w-2xl">
          {/* Big Monochromatic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 select-text uppercase leading-tight"
          >
            Hi, I'm <br className="sm:hidden md:inline" />
            <span className="text-black dark:text-white whitespace-nowrap">Purnendu Raghav</span> <br />
            <span className="text-zinc-500 dark:text-zinc-400">Srivastava</span>
          </motion.h1>

          {/* Typist Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-base md:text-xl font-mono text-zinc-600 dark:text-zinc-400 mb-10 min-h-[36px] flex items-center justify-center md:justify-start gap-1.5 select-text"
          >
            <span>I'm a</span>
            <span className="text-black dark:text-white font-bold">{typewriterText}</span>
            <span className="w-1.5 h-5 bg-black dark:bg-white animate-pulse inline-block" />
          </motion.h2>

          {/* Recruiter-focused Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start"
          >
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-lg border-2 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all shadow-[4px_4px_0px_0px_#71717a] active:scale-[0.98] select-none cursor-pointer"
            >
              Explore Projects
            </button>

            <button
              onClick={handleScrollToContact}
              className="w-full sm:w-auto px-6 py-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-black dark:text-zinc-200 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all active:scale-[0.98] select-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 cursor-pointer z-10"
        onClick={handleScrollToProjects}
      >
        <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">
          Scroll Down
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
      </motion.div>
    </section>
  );
};
