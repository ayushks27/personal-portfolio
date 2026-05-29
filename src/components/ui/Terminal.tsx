import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TermIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useThemeStore } from '../../store/themeStore';
import type { ThemeType } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

export const Terminal: React.FC = () => {
  const { terminalOpen, setTerminalOpen, terminalLogs, addTerminalLog, clearTerminalLogs } = useUIStore();
  const { setTheme } = useThemeStore();
  const { addGuestbook } = useAuthStore();
  
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    addTerminalLog(`$ ${cmd}`, 'input');
    setInput('');

    const tokens = cmd.split(' ');
    const primaryCmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    switch (primaryCmd) {
      case 'help':
        addTerminalLog('Available Commands:', 'output');
        addTerminalLog('  help              Show this help prompt', 'output');
        addTerminalLog('  skills            List technical skills', 'output');
        addTerminalLog('  experience        Show professional experience timeline', 'output');
        addTerminalLog('  projects          Display top software engineering projects', 'output');
        addTerminalLog('  theme [name]      Change site theme (dark, light)', 'output');
        addTerminalLog('  guestbook [name] [message]  Leave a digital note on the guestbook', 'output');
        addTerminalLog('  clear             Clear terminal screen logs', 'output');
        addTerminalLog('  close / exit      Close the developer terminal', 'output');
        break;

      case 'skills':
        addTerminalLog('Technical Skills Profile:', 'output');
        addTerminalLog('  [Frontend] React, Next.js, Tailwind CSS, TypeScript, GSAP, R3F', 'output');
        addTerminalLog('  [Backend]  Node.js, Express, Python, FastAPI', 'output');
        addTerminalLog('  [Database] MongoDB, PostgreSQL, Redis', 'output');
        addTerminalLog('  [Cloud/AI] Firebase, AWS, OpenAI API, LangChain', 'output');
        break;

      case 'experience':
        addTerminalLog('Career History:', 'output');
        addTerminalLog('  - Senior Software Engineer at Tech Vercel (2024 - Present)', 'output');
        addTerminalLog('    Built production React framework dashboards and responsive landing spaces.', 'output');
        addTerminalLog('  - Full-Stack Developer at Linear Labs (2022 - 2024)', 'output');
        addTerminalLog('    Engineered custom database webhooks, GraphQL interfaces, and web application UI.', 'output');
        break;

      case 'projects':
        addTerminalLog('Top Engineering Showcases:', 'output');
        addTerminalLog('  1. AI Synapse Explorer - Interactive 3D neuron network dashboard (React, R3F, Node.js)', 'output');
        addTerminalLog('  2. Apple Minimal E-commerce - Stripe payments & premium product carousel (Next.js, Tailwind)', 'output');
        addTerminalLog('  3. Cyber-Grid Terminal - Local offline-first task tracker & terminal tool (React, Zustand)', 'output');
        break;

      case 'theme': {
        if (!args[0]) {
          addTerminalLog(`Error: Please specify theme. Available: dark, light`, 'error');
          break;
        }
        const targetTheme = args[0].toLowerCase() as ThemeType;
        const validThemes: ThemeType[] = ['dark', 'light'];
        if (validThemes.includes(targetTheme)) {
          setTheme(targetTheme);
          addTerminalLog(`Theme updated to: ${targetTheme}`, 'output');
        } else {
          addTerminalLog(`Error: Invalid theme "${args[0]}". Options: dark, light`, 'error');
        }
        break;
      }

      case 'guestbook': {
        if (args.length < 2) {
          addTerminalLog('Error: Please use format: guestbook [Your Name] [Your Message]', 'error');
          break;
        }
        const guestName = args[0];
        const guestMsg = args.slice(1).join(' ');
        try {
          await addGuestbook(guestName, 'console-guest@developer.io', guestMsg);
          addTerminalLog(`Success: Thank you ${guestName}! Your testimonial has been published.`, 'output');
        } catch (e) {
          addTerminalLog('Error: Failed to write to Guestbook database.', 'error');
        }
        break;
      }

      case 'clear':
        clearTerminalLogs();
        break;

      case 'exit':
      case 'close':
        setTerminalOpen(false);
        break;

      default:
        addTerminalLog(`Command not found: "${primaryCmd}". Type "help" for a list of commands.`, 'error');
    }
  };

  if (!terminalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[990] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`glass border border-zinc-800 rounded-xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden font-mono ${
            isFullscreen 
              ? 'w-full h-full max-h-none' 
              : 'w-full max-w-3xl h-[450px]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <TermIcon className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-semibold tracking-wide text-zinc-300">
                Developer Workspace Terminal - Antigravity OS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
                title={isFullscreen ? 'Minimize' : 'Maximize'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={() => setTerminalOpen(false)}
                className="text-zinc-500 hover:text-red-500 p-0.5 rounded transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Logs Output Space */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-1.5 text-sm select-text scrollbar-thin"
          >
            {terminalLogs.map((log) => (
              <div 
                key={log.id} 
                className={
                  log.type === 'input' 
                    ? 'text-zinc-100 font-bold' 
                    : log.type === 'error'
                      ? 'text-red-400'
                      : 'text-zinc-300'
                }
              >
                {log.text}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleCommand}
            className="flex items-center px-4 py-3 bg-zinc-950/60 border-t border-zinc-900"
          >
            <span className="mr-2.5 font-bold text-zinc-400">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type "help" to list options...'
              className="flex-1 bg-transparent border-none outline-none text-zinc-100 text-sm placeholder-zinc-600 font-mono"
            />
            <span className="text-[10px] text-zinc-600 hidden md:block">
              ENTER TO RUN
            </span>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
