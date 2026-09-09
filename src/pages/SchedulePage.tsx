/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface SessionItem {
  id: string;
  time: string;
  session: string;
  speaker: string;
  type: 'TALKS' | 'WORKSHOPS';
}

const SESSIONS: SessionItem[] = [
  {
    id: 's1',
    time: '09:00 AM',
    session: 'Opening Keynote: Autonomous Agents & System Architecture',
    speaker: 'Aarav Mehta',
    type: 'TALKS',
  },
  {
    id: 's2',
    time: '10:15 AM',
    session: 'Building Scalable APIs with Cloud Run & Gemini',
    speaker: 'Sunita Rao',
    type: 'TALKS',
  },
  {
    id: 's3',
    time: '11:30 AM',
    session: 'Hands-on: Full-Stack React & Node Microservices',
    speaker: 'Rohan Sharma',
    type: 'WORKSHOPS',
  },
  {
    id: 's4',
    time: '01:45 PM',
    session: 'Jetpack Compose Internals & Zero-Allocation UI',
    speaker: 'Karan Verma',
    type: 'TALKS',
  },
  {
    id: 's5',
    time: '03:00 PM',
    session: 'Hands-on: WebGPU & Neural Network Inference in the Browser',
    speaker: 'Pooja Kashyap',
    type: 'WORKSHOPS',
  },
  {
    id: 's6',
    time: '04:30 PM',
    session: 'Closing Assembly & Engineering Ecosystem Panel',
    speaker: 'GDG Leads & Panelists',
    type: 'TALKS',
  },
];

interface SchedulePageProps {
  onGetTickets: () => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onGetTickets }) => {
  const [filter, setFilter] = useState<'ALL' | 'TALKS' | 'WORKSHOPS'>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredSessions = SESSIONS.filter((s) => {
    if (filter === 'ALL') return true;
    return s.type === filter;
  });

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
          Schedule
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-sans text-white/70 font-light leading-relaxed">
          One day. Many ways to build.
        </p>
      </motion.div>

      {/* Filter Tabs: All, Talks, Workshops */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex items-center gap-2 sm:gap-2.5 mb-10 border-b border-[#1f1f1f] pb-4"
      >
        {[
          { key: 'ALL' as const, label: 'All' },
          { key: 'TALKS' as const, label: 'Talks' },
          { key: 'WORKSHOPS' as const, label: 'Workshops' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              sound.playTick();
              setFilter(tab.key);
            }}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none ${
              filter === tab.key
                ? 'bg-white text-black font-semibold shadow-md'
                : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Clean Session List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]"
      >
        {filteredSessions.map((item) => {
          const isHovered = hoveredId === item.id;
          const isAnyHovered = hoveredId !== null;
          const isDimmed = isAnyHovered && !isHovered;

          return (
            <div
              key={item.id}
              data-cursor="arrow"
              onMouseEnter={() => {
                setHoveredId(item.id);
                sound.playTick();
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                sound.playSnap();
                onGetTickets();
              }}
              className={`group py-6 sm:py-7 px-3 sm:px-4 cursor-pointer transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg ${
                isHovered ? 'bg-white/[0.025] scale-[1.006]' : ''
              } ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
            >
              {/* Time */}
              <div className="md:w-32 font-mono-code text-xs text-[#80868b] shrink-0 font-medium tracking-wide">
                {item.time}
              </div>

              {/* Session Title */}
              <div className="flex-1 md:px-4">
                <h3
                  className={`text-lg sm:text-xl font-medium font-sans tracking-tight transition-colors duration-200 ${
                    isHovered ? 'text-white translate-x-1' : 'text-[#e0e0e0]'
                  }`}
                >
                  {item.session}
                </h3>
                <p className="text-xs text-[#80868b] mt-1 font-mono-code">
                  {item.speaker}
                </p>
              </div>

              {/* Type Badge */}
              <div className="shrink-0 flex items-center gap-4">
                <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-[#555] px-2.5 py-1 rounded border border-[#222]">
                  {item.type}
                </span>

                {/* Arrow with Prismic slide-up fill and 3D flip */}
                <div
                  className={`prismic-icon-btn prismic-google-blue w-9 h-9 ${
                    isHovered
                      ? 'border-transparent text-white shadow-lg shadow-[#4285F4]/30'
                      : 'border-[#222] text-[#555]'
                  }`}
                >
                  <ArrowUpRight
                    size={14}
                    className={isHovered ? 'rotate-[360deg] text-white' : ''}
                    style={{ transition: 'transform 0.45s ease' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Bottom Minimal Register Prompt */}
      <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-mono-code text-[#555] uppercase tracking-widest">
          Friday, October 30, 2026 · Ranchi
        </span>
        <button
          type="button"
          onClick={() => {
            sound.playSnap();
            onGetTickets();
          }}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-white hover:text-[#4285F4] transition-colors focus:outline-none"
        >
          <span>Reserve Pass</span>
          <ArrowUpRight
            size={13}
            className="text-[#80868b] group-hover:text-[#4285F4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </button>
      </div>
    </div>
  );
};
