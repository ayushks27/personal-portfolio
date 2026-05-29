import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import { useThemeStore } from '../store/themeStore';

export const useKeyboard = () => {
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette);
  const toggleTerminal = useUIStore((state) => state.toggleTerminal);
  const toggleMusic = useThemeStore((state) => state.toggleMusic);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle Command Palette (Ctrl+K or Cmd+K)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggleCommandPalette();
      }

      // Toggle Terminal (Ctrl+Backtick)
      if ((event.ctrlKey || event.metaKey) && event.key === '`') {
        event.preventDefault();
        toggleTerminal();
      }

      // Toggle Background Music with 'm' (only if not typing in inputs/textareas)
      const activeElement = document.activeElement;
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.getAttribute('contenteditable') === 'true'
      );

      if (!isTyping && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        toggleMusic();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleCommandPalette, toggleTerminal, toggleMusic]);
};
