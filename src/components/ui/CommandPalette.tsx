import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Globe, Sparkles, Terminal, FileText, ArrowRight, Sun, Moon, Volume2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Theme' | 'Actions';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, toggleTerminal } = useUIStore();
  const { setTheme, toggleMusic, toggleCustomCursor } = useThemeStore();
  const { recordResumeDownload } = useAuthStore();
  
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setCommandPaletteOpen(false);
  };

  const downloadResume = () => {
    recordResumeDownload();
    window.open('#', '_blank'); // Mock PDF url
    setCommandPaletteOpen(false);
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-hero', title: 'Scroll to Home / Hero', category: 'Navigation', icon: <Globe className="w-4 h-4" />, action: () => scrollToSection('hero') },
    { id: 'nav-about', title: 'Scroll to About', category: 'Navigation', icon: <Command className="w-4 h-4" />, action: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Scroll to Skills', category: 'Navigation', icon: <Sparkles className="w-4 h-4" />, action: () => scrollToSection('skills') },
    { id: 'nav-projects', title: 'Scroll to Projects', category: 'Navigation', icon: <FileText className="w-4 h-4" />, action: () => scrollToSection('projects') },
    { id: 'nav-exp', title: 'Scroll to Experience', category: 'Navigation', icon: <ArrowRight className="w-4 h-4" />, action: () => scrollToSection('experience') },
    { id: 'nav-blog', title: 'Scroll to Blog', category: 'Navigation', icon: <FileText className="w-4 h-4" />, action: () => scrollToSection('blog') },
    { id: 'nav-contact', title: 'Scroll to Contact', category: 'Navigation', icon: <Globe className="w-4 h-4" />, action: () => scrollToSection('contact') },
    
    // Themes
    { id: 'theme-dark', title: 'Switch to Dark Mode', category: 'Theme', icon: <Moon className="w-4 h-4" />, action: () => { setTheme('dark'); setCommandPaletteOpen(false); } },
    { id: 'theme-light', title: 'Switch to Light Mode', category: 'Theme', icon: <Sun className="w-4 h-4" />, action: () => { setTheme('light'); setCommandPaletteOpen(false); } },
    
    // Actions
    { id: 'act-term', title: 'Toggle Developer Terminal', category: 'Actions', icon: <Terminal className="w-4 h-4" />, shortcut: 'Ctrl + `', action: () => { toggleTerminal(); setCommandPaletteOpen(false); } },
    { id: 'act-music', title: 'Toggle Background Music', category: 'Actions', icon: <Volume2 className="w-4 h-4" />, shortcut: 'M', action: () => { toggleMusic(); setCommandPaletteOpen(false); } },
    { id: 'act-cursor', title: 'Toggle Custom Cursor', category: 'Actions', icon: <Sparkles className="w-4 h-4" />, action: () => { toggleCustomCursor(); setCommandPaletteOpen(false); } },
    { id: 'act-resume', title: 'Download Premium Resume', category: 'Actions', icon: <FileText className="w-4 h-4" />, action: downloadResume }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, filteredCommands, selectedIndex, setCommandPaletteOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };

    if (commandPaletteOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Group filtered by category
  const categories = Array.from(new Set(filteredCommands.map((c) => c.category)));

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            ref={containerRef}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 glass shadow-2xl flex flex-col max-h-[480px]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-zinc-800">
              <Search className="w-5 h-5 text-zinc-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search sections..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent outline-none border-none text-zinc-100 placeholder-zinc-500 text-base"
              />
              <span className="text-xs text-zinc-500 bg-zinc-800/50 border border-zinc-700 px-1.5 py-0.5 rounded font-mono">
                ESC
              </span>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-sm">
                  No actions found for "{search}"
                </div>
              ) : (
                categories.map((cat) => {
                  const catItems = filteredCommands.filter((c) => c.category === cat);
                  return (
                    <div key={cat} className="mb-3 last:mb-0">
                      <h4 className="px-3 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                        {cat}
                      </h4>
                      <div className="space-y-0.5 mt-1">
                        {catItems.map((cmd) => {
                          const globalIdx = filteredCommands.indexOf(cmd);
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => cmd.action()}
                              onMouseEnter={() => setSelectedIndex(globalIdx)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                                isSelected
                                  ? 'bg-zinc-800/80 text-white'
                                  : 'text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className={`mr-3 ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                                  {cmd.icon}
                                </span>
                                <span>{cmd.title}</span>
                              </div>
                              {cmd.shortcut && (
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded">
                                  {cmd.shortcut}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="border border-zinc-700 px-1 py-0.2 rounded font-sans">↑↓</span> Move
                </span>
                <span className="flex items-center gap-1">
                  <span className="border border-zinc-700 px-1 py-0.2 rounded font-sans">Enter</span> Execute
                </span>
              </div>
              <div>Raycast Interface</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
