/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, suffix = '', duration = 1.4 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Clean easeOutExpo formula
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOut * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono-code tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const StatsAndCountdown: React.FC = () => {
  // Live Event Countdown (Target: Friday, October 30, 2026, 09:00 IST)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-30T09:00:00+05:30').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: 10, suffix: '+', label: 'Speakers' },
    { value: 20, suffix: '+', label: 'Sessions' },
    { value: 500, suffix: '+', label: 'Developers' },
    { value: 1, suffix: '', label: 'Unforgettable Day' },
  ];

  return (
    <section id="stats" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-16 sm:py-20 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* =========================================================================
            EVENT STATISTICS (Fade, translateY, small scale on entering viewport)
            ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-16 border-b border-[#1f1f1f]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-[#f2f2f2] tracking-tight mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#80868b] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            COMPACT LIVE EVENT COUNTDOWN
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 sm:pt-14 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <span className="text-xs font-mono-code tracking-[0.2em] text-[#71767b] block mb-1">
              Live assembly countdown
            </span>
            <span className="text-base sm:text-lg font-medium text-white tracking-[0.04em]">
              30th October
            </span>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 font-mono-code">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#f2f2f2] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#555] mt-1">
                Days
              </span>
            </div>

            <span className="text-2xl text-[#2b2b2b] pb-4" aria-hidden="true">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#f2f2f2] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#555] mt-1">
                Hours
              </span>
            </div>

            <span className="text-2xl text-[#2b2b2b] pb-4" aria-hidden="true">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#f2f2f2] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#555] mt-1">
                Minutes
              </span>
            </div>

            <span className="text-2xl text-[#2b2b2b] pb-4" aria-hidden="true">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#80868b] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#555] mt-1">
                Seconds
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
