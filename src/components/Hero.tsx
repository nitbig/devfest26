/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroProps {
  onGetTickets: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetTickets, onExplore }) => {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  const handleTicketsButtonClick = () => {
    sound.playSnap();
    onGetTickets();
  };

  // Pointer-based subtle parallax system (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Large typography moves almost imperceptibly
  const outlineTextX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const outlineTextY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  // Soft orb moves smoothly and subtly
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    // Disable on touch devices
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      setIsDesktopPointer(false);
      return;
    }

    setIsDesktopPointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background visual layers: clean, subtle, no mobile clutter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Dynamic Red Flow Animation in Background */}
        <div className="red-flow-container">
          <div className="red-flow-stream-1" />
          <div className="red-flow-stream-2" />
          <div className="red-flow-wave-ribbon" />

          {/* Flowing Red Aurora Light Stream Wave */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 sm:opacity-35 mix-blend-screen"
            preserveAspectRatio="none"
            viewBox="0 0 1440 600"
            fill="none"
          >
            <motion.path
              d="M-100,280 C320,160 520,440 880,300 C1200,180 1340,360 1600,260 L1600,600 L-100,600 Z"
              fill="url(#red-flow-gradient-1)"
              animate={{
                d: [
                  "M-100,280 C320,160 520,440 880,300 C1200,180 1340,360 1600,260 L1600,600 L-100,600 Z",
                  "M-100,320 C280,420 620,180 940,340 C1260,460 1420,200 1600,310 L1600,600 L-100,600 Z",
                  "M-100,280 C320,160 520,440 880,300 C1200,180 1340,360 1600,260 L1600,600 L-100,600 Z"
                ]
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M-100,340 C200,220 580,380 920,240 C1220,120 1400,340 1600,270 L1600,600 L-100,600 Z"
              fill="url(#red-flow-gradient-2)"
              animate={{
                d: [
                  "M-100,340 C200,220 580,380 920,240 C1220,120 1400,340 1600,270 L1600,600 L-100,600 Z",
                  "M-100,240 C360,360 680,200 980,360 C1180,480 1380,220 1600,330 L1600,600 L-100,600 Z",
                  "M-100,340 C200,220 580,380 920,240 C1220,120 1400,340 1600,270 L1600,600 L-100,600 Z"
                ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
            <defs>
              <linearGradient id="red-flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA4335" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#C5221F" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FBBC05" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="red-flow-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EA4335" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#FF5252" stopOpacity="0.18" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Giant Outlined Typography drifting in background (Desktop only, never clutter mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
          style={isDesktopPointer ? { x: outlineTextX, y: outlineTextY } : {}}
          className="hidden md:flex absolute inset-0 items-center justify-center transition-transform duration-700 pointer-events-none"
        >
          <span className="text-[20vw] font-bold tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_#ffffff] leading-none select-none">
            RANCHI
          </span>
        </motion.div>

        {/* Soft Ambient Glow (Google colors, whisper quiet) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.1, ease: 'easeOut' }}
          style={isDesktopPointer ? { x: orbX, y: orbY } : {}}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[580px] h-[320px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#4285F4]/10 via-[#FBBC05]/6 to-[#EA4335]/8 blur-[120px] pointer-events-none"
        />
      </div>

      {/* =========================================================================
          HERO TYPOGRAPHIC COMPOSITION
          Immediate Communication:
          - Google Developer Groups Ranchi
          - { DevFest } '26
          - Event Date: Friday, October 30, 2026
          - Location: Dr. Ram Dayal Munda Auditorium · Ranchi
          - Get Tickets
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 text-center flex flex-col items-center">
        {/* Eyebrow: Google Developer Groups Ranchi */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 flex flex-col items-center gap-1.5 font-mono-code text-[11px] sm:text-xs tracking-[0.22em] text-[#80868b]"
        >
          <span className="text-[#a0a0a0] font-medium">Google Developer Groups</span>
          <span className="text-[#666] tracking-[0.28em] text-[10px] sm:text-[11px]">Ranchi</span>
        </motion.div>

        {/* Hero Title: { DevFest } '26 — dramatic, responsive, much larger on mobile view */}
        <div className="relative inline-block mb-6 sm:mb-8 select-none w-full">
          <h1
            id="hero-main-title"
            className="text-[48px] xs:text-[56px] min-[420px]:text-[64px] sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#f2f2f2] font-sans flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 leading-none"
          >
            {/* Left Brace - enlarged for distinctive developer brackets */}
            <motion.span
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#555] font-light text-[1.32em] sm:text-[1.36em] inline-block -translate-y-[2%] select-none"
              aria-hidden="true"
            >
              {'{'}
            </motion.span>

            {/* DevFest Wordmark */}
            <span className="overflow-hidden inline-block py-1">
              <motion.span
                initial={{ y: '105%', opacity: 0.2 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block tracking-tight text-white"
              >
                DevFest
              </motion.span>
            </span>

            {/* Right Brace - enlarged for distinctive developer brackets */}
            <motion.span
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#555] font-light text-[1.32em] sm:text-[1.36em] inline-block -translate-y-[2%] select-none"
              aria-hidden="true"
            >
              {'}'}
            </motion.span>

            {/* '26 Badge - larger on mobile */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#80868b] font-light text-3xl xs:text-4xl min-[420px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl -ml-0.5 sm:-ml-1.5"
            >
              '26
            </motion.span>
          </h1>
        </div>

        {/* Event Date & Location: smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-1 sm:gap-1.5 mb-8 sm:mb-11"
        >
          <div className="text-[10px] sm:text-xs md:text-sm font-mono-code uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#dcdcdc] font-medium">
            FRIDAY · OCTOBER 30, 2026
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm text-[#80868b] font-normal tracking-normal sm:tracking-wide">
            Dr. Ram Dayal Munda Auditorium · Ranchi, India
          </div>
        </motion.div>

        {/* CTA Actions: One over another on mobile, side by side on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none mx-auto"
        >
          <button
            id="hero-get-tickets-btn"
            type="button"
            onClick={handleTicketsButtonClick}
            className="w-full sm:w-auto group relative overflow-hidden inline-flex items-center justify-center gap-3 pl-7 pr-3.5 py-2.5 rounded-full text-xs tracking-[0.12em] font-semibold text-white border border-[#383838] hover:border-[#555] bg-white/[0.04] hover:bg-white/[0.06] transition-transform duration-100 ease-out active:scale-95 shadow-lg shadow-black/40 focus:outline-none min-h-[44px]"
          >
            <span className="relative z-10">Get tickets</span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 text-white flex items-center justify-center transition-transform duration-100 ease-out group-active:scale-90">
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </button>

          <button
            id="hero-explore-btn"
            type="button"
            onClick={() => {
              sound.playTick();
              onExplore();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs tracking-[0.12em] font-medium text-[#80868b] hover:text-white border border-transparent hover:border-[#222] transition-all active:scale-95 focus:outline-none min-h-[44px]"
          >
            <span>Explore</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
