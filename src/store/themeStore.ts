import { create } from 'zustand';

export type ThemeType = 'dark' | 'light';
export type LanguageType = 'en' | 'es' | 'ja';

interface ThemeState {
  theme: ThemeType;
  musicEnabled: boolean;
  language: LanguageType;
  customCursor: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleMusic: () => void;
  setLanguage: (lang: LanguageType) => void;
  toggleCustomCursor: () => void;
}

// Initialise root document element styling based on initial value
if (typeof window !== 'undefined') {
  document.documentElement.className = '';
  document.documentElement.classList.add('theme-dark');
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',
  musicEnabled: false,
  language: 'en',
  customCursor: true,
  setTheme: (_theme) => {
    if (typeof window !== 'undefined') {
      document.documentElement.className = '';
      document.documentElement.classList.add('theme-dark');
    }
    set({ theme: 'dark' });
  },
  toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
  setLanguage: (language) => set({ language }),
  toggleCustomCursor: () => set((state) => ({ customCursor: !state.customCursor })),
}));
