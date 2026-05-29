import React, { useEffect, useRef, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { ThemeSelector } from './ThemeSelector';
import { LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Show, SignInButton, UserButton } from '@clerk/react';

export const Navbar: React.FC = () => {
  const { musicEnabled } = useThemeStore();
  const { activeSection, setActiveSection } = useUIStore();
  const { initializeAuth } = useAuthStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthNodesRef = useRef<any[]>([]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Procedural Web Audio API Space Ambient Drone Synth
  useEffect(() => {
    if (musicEnabled) {
      try {
        // Initialize AudioContext safely
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master Volume Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        // Smoothly fade in ambient drone
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3.0);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Ambient Drone Osc 1 (Deep base chord)
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 chord
        
        // Ambient Drone Osc 2 (Major fifth harmony)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(82.41, ctx.currentTime); // E2 chord

        // Cosmic Modulator Osc 3 (Soft shimmer melody)
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(220, ctx.currentTime); // A3

        // Filters to keep sound extremely soft and spacey
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, ctx.currentTime);
        filter.Q.setValueAtTime(5, ctx.currentTime);

        // Soft modulator LFO to create a wave-like dynamic volume swelling
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // Very slow swell
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(25, ctx.currentTime); // Modulates filter cutoff

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Connections
        osc1.connect(filter);
        osc2.connect(filter);
        
        // Soft shimmer connection with its own custom volume envelope
        const shimmerGain = ctx.createGain();
        shimmerGain.gain.setValueAtTime(0.015, ctx.currentTime);
        osc3.connect(shimmerGain);
        shimmerGain.connect(masterGain);

        filter.connect(masterGain);

        // Start Oscillators
        osc1.start();
        osc2.start();
        osc3.start();
        lfo.start();

        synthNodesRef.current = [osc1, osc2, osc3, lfo];
      } catch (err) {
        console.warn("Web Audio API Synthesizer could not start. Please interact with page.", err);
      }
    } else {
      // Smoothly fade out ambient sound before closing context
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const gain = gainNodeRef.current;
        try {
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
          
          setTimeout(() => {
            synthNodesRef.current.forEach(node => {
              try { node.stop(); } catch(e) {}
            });
            ctx.close();
            audioCtxRef.current = null;
            gainNodeRef.current = null;
            synthNodesRef.current = [];
          }, 1100);
        } catch(e) {
          audioCtxRef.current = null;
        }
      }
    }

    return () => {
      // Cleanup on component unmount
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch(e) {}
      }
    };
  }, [musicEnabled]);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Timeline', id: 'experience' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: !isScrolled ? 0 : -80, 
        opacity: !isScrolled ? 1 : 0 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 90, 
        damping: 18, 
        mass: 0.8
      }}
      className="fixed top-0 left-0 w-full z-[90] glass border-b border-zinc-900 bg-black/50 backdrop-blur-md"
      style={{ pointerEvents: !isScrolled ? 'auto' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Branding Logo */}
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center">
            <span className="px-2.5 py-0.5 border border-black dark:border-white rounded bg-black dark:bg-white text-white dark:text-black font-serif font-black italic text-base shadow-sm">
              P
            </span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-themePrimary to-themeAccent rounded-full"
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Toolbar Elements */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Themes Selector Toolbar */}
          <ThemeSelector />

          {/* Clerk Auth Integration */}
          <div className="flex items-center justify-center h-[34px] min-h-[34px]">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border bg-white border-white text-black hover:bg-zinc-200 transition-all text-xs font-semibold cursor-pointer h-full"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center justify-center h-full">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-7 h-7 border border-zinc-700 hover:border-zinc-500 transition-all rounded-full"
                    }
                  }}
                />
              </div>
            </Show>
          </div>
        </div>

        {/* Mobile Toolbar & Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2.5">
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-zinc-950 border-t border-zinc-900 py-4 px-6 flex flex-col gap-4 font-sans"
          >
            <div className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm font-semibold tracking-wide py-1 ${
                    activeSection === link.id ? 'text-white text-gradient' : 'text-zinc-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="h-px bg-zinc-900 my-1" />

            {/* Mobile Controls */}
            <div className="flex flex-wrap items-center gap-3.5">
              <ThemeSelector />


              {/* Clerk Auth Integration */}
              <div className="flex items-center">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-white text-black rounded-full text-xs font-bold cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Login</span>
                    </button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center gap-2 px-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 border border-zinc-700 rounded-full"
                        }
                      }}
                    />
                    <span className="text-xs font-medium text-zinc-300">Profile</span>
                  </div>
                </Show>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
