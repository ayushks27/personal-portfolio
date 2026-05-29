/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        themeBg: 'var(--bg-color)',
        themeText: 'var(--text-color)',
        themePrimary: 'var(--primary-color)',
        themeSecondary: 'var(--secondary-color)',
        themeAccent: 'var(--accent-color)',
        themeBorder: 'var(--border-color)',
        themeCardBg: 'var(--card-bg)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        }
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-green': '0 0 15px rgba(0, 255, 0, 0.4)',
        'glow-pink': '0 0 15px rgba(255, 0, 127, 0.4)',
        'glow-blue': '0 0 15px rgba(0, 245, 212, 0.4)',
      }
    },
  },
  plugins: [],
}
