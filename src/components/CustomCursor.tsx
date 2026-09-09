/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'arrow'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follower
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveArrow = target.closest('[data-cursor="arrow"]') || target.closest('#experiences .group');
      const interactiveButton = target.closest('button') || target.closest('a') || target.closest('[data-cursor="button"]');

      if (interactiveArrow) {
        setCursorType('arrow');
      } else if (interactiveButton) {
        setCursorType('button');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Follower circle */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorType === 'arrow' ? 44 : cursorType === 'button' ? 36 : 10,
          height: cursorType === 'arrow' ? 44 : cursorType === 'button' ? 36 : 10,
          opacity: 1,
          backgroundColor:
            cursorType === 'arrow'
              ? 'rgba(255, 255, 255, 0.95)'
              : cursorType === 'button'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.85)',
          borderColor:
            cursorType === 'button'
              ? 'rgba(255, 255, 255, 0.4)'
              : cursorType === 'arrow'
              ? 'rgba(255, 255, 255, 1)'
              : 'transparent',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 320,
        }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center backdrop-blur-[1px] transition-colors"
      >
        {cursorType === 'arrow' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-black"
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </motion.div>
        )}
      </motion.div>

      {/* Tiny center point when not expanding */}
      {cursorType === 'default' && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      )}
    </div>
  );
};
