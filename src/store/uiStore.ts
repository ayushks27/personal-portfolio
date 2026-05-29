import { create } from 'zustand';

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error';
  text: string;
  timestamp: Date;
}

interface UIState {
  commandPaletteOpen: boolean;
  terminalOpen: boolean;
  terminalLogs: TerminalLog[];
  activeSection: string;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  addTerminalLog: (text: string, type?: 'input' | 'output' | 'error') => void;
  clearTerminalLogs: () => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  commandPaletteOpen: false,
  terminalOpen: false,
  terminalLogs: [
    { id: '1', type: 'output', text: 'Terminal system initialized successfully.', timestamp: new Date() },
    { id: '2', type: 'output', text: 'Welcome to Developer Workspace Console. Type "help" to explore CLI.', timestamp: new Date() },
  ],
  activeSection: 'hero',
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  addTerminalLog: (text, type = 'output') => set((state) => ({
    terminalLogs: [
      ...state.terminalLogs,
      { id: Math.random().toString(36).substring(2, 11), type, text, timestamp: new Date() }
    ]
  })),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
