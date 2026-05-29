import React, { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { CommandPalette } from './components/ui/CommandPalette';
import { Terminal } from './components/ui/Terminal';
import { AIAssistant } from './sections/AIAssistant';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Main Sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Blog } from './sections/Blog';
import { ResumeCenter } from './sections/ResumeCenter';
import { Contact } from './sections/Contact';

// Custom Hooks
import { useKeyboard } from './hooks/useKeyboard';
import { useLenis } from './hooks/useLenis';
import { useUIStore } from './store/uiStore';
import { useUser } from '@clerk/react';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  // Bind global keyboard shortcuts and high-fidelity smooth scroll
  useKeyboard();
  useLenis();

  const { user: clerkUser, isLoaded } = useUser();
  const setClerkUser = useAuthStore((state) => state.setClerkUser);

  // Sync Clerk authenticated user with the global Zustand application authStore
  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        setClerkUser({
          uid: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || null,
          displayName: clerkUser.fullName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
          photoURL: clerkUser.imageUrl || null,
          role: clerkUser.primaryEmailAddress?.emailAddress === 'admin@gmail.com' ? 'admin' : 'user'
        });
      } else {
        setClerkUser(null);
      }
    }
  }, [clerkUser, isLoaded, setClerkUser]);

  const [isOnline, setIsOnline] = useState(true);
  const setActiveSection = useUIStore((state) => state.setActiveSection);

  // Monitor online status parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Monitor active scroll section coordinates using IntersectionObserver
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'blog',
      'resumecenter',
      'contact'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section fills screen center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans antialiased overflow-hidden select-none">
      
      {/* Premium UI Overlay Components */}
      <CustomCursor />
      <CommandPalette />
      <Terminal />
      <AIAssistant />
      {/* Offline Mode Banner Alert */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[85] flex items-center gap-2 px-4 py-2 bg-red-950/80 border border-red-900/60 rounded-full font-mono text-[10px] text-red-200 glass shadow-lg"
          >
            <WifiOff className="w-3.5 h-3.5 text-red-400" />
            <span>OFFLINE WORKSPACE - RUNNING IN LOCAL EMULATOR MODE</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Structural Layout Shell */}
      <Navbar />

      {/* Primary Scroll container containing distinct sections */}
      <main className="relative z-10 w-full pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <ResumeCenter />
        <Contact />
      </main>

      <Footer />

    </div>
  );
};

export default App;
