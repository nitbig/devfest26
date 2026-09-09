/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { RedWaterRipple } from './RedWaterRipple';

interface FinalCtaProps {
  onGetTickets: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaProps> = ({ onGetTickets }) => {
  const [btnRipples, setBtnRipples] = React.useState<{ id: number; x: number; y: number }[]>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playSnap();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setBtnRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBtnRipples((prev) => prev.filter((r) => r.id !== id));
    }, 900);
    onGetTickets();
  };

  return (
    <section
      id="register"
      className="relative py-28 sm:py-36 md:py-44 border-t border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Red Water Ripple Canvas & Concentric Liquid Waves */}
      <RedWaterRipple className="z-0" />

      {/* Subtle Ambient Red Glow Behind It */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#EA4335]/16 via-[#EA4335]/8 to-transparent blur-[120px] opacity-70 animate-pulse [animation-duration:5s]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col items-center pointer-events-none">
        {/* Huge Heading:
            SEE YOU AT
            { DevFest } '26 with scroll reveal (fade, translateY, small scale) */}
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 select-none"
        >
          <span className="block text-xs sm:text-sm font-mono-code tracking-[0.2em] text-[#80868b] mb-4">
            Join us on October 30, 2026
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tight text-[#f2f2f2] leading-[1.05]">
            See you at<br />
            <span className="inline-flex items-center gap-2 sm:gap-4 mt-2">
              <span className="text-[#555] font-light text-[1.28em] sm:text-[1.36em] inline-block -translate-y-[2%] select-none">{'{'}</span>
              <span className="text-white">DevFest</span>
              <span className="text-[#555] font-light text-[1.28em] sm:text-[1.36em] inline-block -translate-y-[2%] select-none">{'}'}</span>
              <span className="text-[#80868b] font-light text-2xl sm:text-5xl md:text-6xl -ml-1">
                '26
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Button: Get tickets ↗ with arrow hover movement & red water ripple */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <button
            id="final-cta-get-tickets-btn"
            type="button"
            onClick={handleButtonClick}
            className="group relative overflow-hidden inline-flex items-center gap-3 pl-8 sm:pl-10 pr-4 py-3 rounded-full text-xs tracking-[0.12em] font-semibold text-white border border-[#333] hover:border-[#EA4335]/80 bg-[#141516] hover:bg-[#1f1616] transition-all active:scale-95 shadow-xl shadow-black/60 focus:outline-none"
          >
            {/* Click Red Water Ripple inside the button */}
            {btnRipples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute pointer-events-none rounded-full bg-[#EA4335]/35 border border-[#EA4335]/80 animate-ping [animation-duration:800ms]"
                style={{
                  left: ripple.x - 30,
                  top: ripple.y - 30,
                  width: 60,
                  height: 60,
                }}
              />
            ))}

            <span className="relative z-10">Get tickets</span>
            <div className="relative z-10 prismic-icon-btn prismic-google-red w-9 h-9 text-[#80868b] group-hover:text-white">
              <ArrowUpRight size={15} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
