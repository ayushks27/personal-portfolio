import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

export const CustomCursor: React.FC = () => {
  const { customCursor, theme } = useThemeStore();
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!customCursor) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    // Dynamic delegation of clickables
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .hover-trigger, [onclick]'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    addHoverListeners();

    // Use MutationObserver to watch for new nodes injected into the DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [customCursor, cursorX, cursorY, hidden]);

  if (!customCursor || hidden) return null;

  // Adapt cursor glow ring depending on active theme
  const getGlowStyle = () => {
    switch (theme) {
      case 'light':
        return 'border-zinc-900 bg-zinc-900/10';
      default:
        return 'border-white bg-white/10';
    }
  };

  const getDotStyle = () => {
    switch (theme) {
      case 'light':
        return 'bg-zinc-900';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      {/* Lagging Ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 ${getGlowStyle()}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      {/* Immediate Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 ${getDotStyle()}`}
        style={{
          x: cursorX,
          y: cursorY,
          scale: hovered ? 0.5 : 1,
        }}
      />
    </>
  );
};
