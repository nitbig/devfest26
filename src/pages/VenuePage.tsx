/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';

interface VenuePageProps {
  onGetTickets: () => void;
}

export const VenuePage: React.FC<VenuePageProps> = ({ onGetTickets }) => {
  return (
    <div className="pt-36 sm:pt-44 md:pt-48 pb-28 sm:pb-36 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-10 sm:mb-12"
      >
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white mb-4">
          Where we meet
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-sans text-white/70 font-light leading-relaxed">
          An auditorium built for community gatherings, keynotes, and deep conversations.
        </p>
      </motion.div>

      {/* Details Row: Venue, Ranchi, Date */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-[#1f1f1f] mb-12"
      >
        <div>
          <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#555] block mb-2">
            Venue
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
            Dr. Ram Dayal Munda Auditorium
          </h2>
          <p className="text-xs text-[#80868b] mt-1 font-mono-code">
            Morabadi Ground, Ranchi
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#555] block mb-2">
            Location
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
            Ranchi, Jharkhand
          </h2>
          <p className="text-xs text-[#80868b] mt-1 font-mono-code">
            23.3441° N, 85.3096° E
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#555] block mb-2">
            Date & time
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
            Friday, Oct 30, 2026
          </h2>
          <p className="text-xs text-[#80868b] mt-1 font-mono-code">
            08:30 AM – 06:00 PM IST
          </p>
        </div>
      </motion.div>

      {/* Minimal Map / Location Block */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="relative rounded-xl border border-[#1f1f1f] bg-[#0e0e0e] p-8 sm:p-12 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Minimal Location Blueprint Graphic */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#141414] text-xs font-mono-code text-[#80868b]">
              <MapPin size={13} className="text-[#EA4335]" />
              <span>Morabadi, Ranchi, Jharkhand 834008</span>
            </div>

            <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
              Reaching the Summit
            </h3>

            <p className="text-sm text-[#80868b] leading-relaxed">
              Located 20 minutes from Birsa Munda Airport (IXR) and 15 minutes from Ranchi Junction Railway Station.
            </p>
          </div>

          {/* CTA: Get Directions with Prismic Icon Hover Effect */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://maps.google.com/?q=Ram+Dayal+Munda+Auditorium+Morabadi+Ranchi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSnap()}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-white border border-[#333] hover:border-[#4285F4] bg-[#161718] hover:bg-[#1a1c1e] transition-all focus:outline-none shadow-lg"
            >
              <span>Get directions</span>
              <div className="prismic-icon-btn prismic-google-blue w-7 h-7 text-[#80868b] group-hover:text-white">
                <ArrowUpRight size={13} />
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-mono-code text-[#555] uppercase tracking-widest">
          Doors open at 08:30 AM
        </span>
        <button
          type="button"
          onClick={() => {
            sound.playSnap();
            onGetTickets();
          }}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-white hover:text-[#4285F4] transition-colors focus:outline-none"
        >
          <span>Reserve pass</span>
          <ArrowUpRight
            size={13}
            className="text-[#80868b] group-hover:text-[#4285F4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </button>
      </div>
    </div>
  );
};
