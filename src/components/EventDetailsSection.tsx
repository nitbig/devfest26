/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface EventDetailsProps {
  onViewSchedule: () => void;
}

export const EventDetailsSection: React.FC<EventDetailsProps> = ({ onViewSchedule }) => {
  return (
    <section id="event-details" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Small label: 03 / Details */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-mono-code tracking-[0.2em] text-[#555] mb-12 sm:mb-16"
        >
          03 / Details
        </motion.div>

        {/* 3 Columns: Date, Venue, Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-14 border-b border-[#1f1f1f]">
          {/* DATE */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs sm:text-sm font-mono-code tracking-[0.2em] text-[#9aa0a6] uppercase mb-2">
              Date
            </span>
            <span className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-sans text-[#f2f2f2] tracking-tight leading-tight">
              October 30, 2026
            </span>
          </motion.div>

          {/* VENUE */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs sm:text-sm font-mono-code tracking-[0.2em] text-[#9aa0a6] uppercase mb-2">
              Venue
            </span>
            <span className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-sans text-[#f2f2f2] tracking-tight leading-tight">
              Ranchi
            </span>
          </motion.div>

          {/* LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs sm:text-sm font-mono-code tracking-[0.2em] text-[#9aa0a6] uppercase mb-2">
              Location
            </span>
            <span className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-sans text-[#f2f2f2] tracking-tight leading-tight">
              Jharkhand, India
            </span>
          </motion.div>
        </div>

        {/* Action: View Schedule ↗ */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 flex items-center justify-between"
        >
          <button
            id="view-schedule-btn"
            type="button"
            onClick={() => {
              sound.playSnap();
              onViewSchedule();
            }}
            className="inline-flex items-center gap-2.5 text-xs tracking-[0.12em] font-medium text-white hover:text-[#4285F4] transition-colors py-2 group focus:outline-none"
          >
            <span>View schedule</span>
            <div className="prismic-icon-btn prismic-google-blue w-7 h-7 text-[#80868b] group-hover:text-white">
              <ArrowUpRight size={13} />
            </div>
          </button>

          <span className="text-[10px] font-mono-code tracking-widest text-[#555]">
            4 tracks · 20+ sessions
          </span>
        </motion.div>
      </div>
    </section>
  );
};
