/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Tag } from 'lucide-react';
import { sound } from '../utils/sound';

interface ScheduleItem {
  id: string;
  time: string;
  duration: string;
  title: string;
  speakerOrLead: string;
  hall: string;
  type: 'keynote' | 'track' | 'codelab' | 'community';
  tag: string;
  accent: string;
  highlight?: string;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 's-1',
    time: '08:30 AM',
    duration: '75 min',
    title: 'Doors Open, Check-In & Morning Fuel',
    speakerOrLead: 'GDG Ranchi Organizing Team',
    hall: 'Main Foyer & Registration Hub',
    type: 'community',
    tag: 'Check-In',
    accent: '#ffffff',
    highlight: 'Badge pickup, DevFest 2026 swag package, and developer breakfast mixer.',
  },
  {
    id: 's-2',
    time: '09:45 AM',
    duration: '60 min',
    title: 'Opening Keynote: Autonomous Agents & The Next Era of Software Engineering',
    speakerOrLead: 'Invited Google Developer Expert & Engineering Leaders',
    hall: 'Auditorium Main Stage',
    type: 'keynote',
    tag: 'Keynote',
    accent: '#4285F4',
    highlight: 'Architectural paradigms in agentic systems, multimodal interfaces, and open-weight models.',
  },
  {
    id: 's-3',
    time: '11:00 AM',
    duration: '110 min',
    title: 'Track Block 01: AI Workflows, Cloud Primitives & Compose Internals',
    speakerOrLead: 'Parallel Breakout Tracks',
    hall: 'Halls A, B & C',
    type: 'track',
    tag: 'Deep Dives',
    accent: '#EA4335',
    highlight: 'Simultaneous sessions on Gemini 2.5 structured tools, Cloud Run scaling, and KMP cross-platform internals.',
  },
  {
    id: 's-4',
    time: '01:00 PM',
    duration: '60 min',
    title: 'Community Lunch & Open Ecosystem Showcase',
    speakerOrLead: 'All Attendees & Mentors',
    hall: 'Community Courtyard',
    type: 'community',
    tag: 'Networking',
    accent: '#FBBC04',
    highlight: 'Local developer demos, informal office hours with speakers, and tech career conversations.',
  },
  {
    id: 's-5',
    time: '02:00 PM',
    duration: '120 min',
    title: 'Interactive CodeLabs & Micro-Architecture Teardowns',
    speakerOrLead: 'GDG Technical Mentors',
    hall: 'Workshops Arena',
    type: 'codelab',
    tag: 'Hands-On',
    accent: '#34A853',
    highlight: 'Bring your laptop. Step-by-step guidance on running on-device Gemma models and deploying serverless microservices.',
  },
  {
    id: 's-6',
    time: '04:30 PM',
    duration: '60 min',
    title: 'Lightning Pitches, Closing Remarks & Community Swag Blitz',
    speakerOrLead: 'GDG Ranchi Chapter Leads',
    hall: 'Auditorium Main Stage',
    type: 'community',
    tag: 'Closing',
    accent: '#ffffff',
    highlight: '5-minute community lightning talks, volunteer recognition, group photo, and attendee raffle.',
  },
];

export const Schedule: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'keynote' | 'track' | 'codelab'>('all');

  const filteredItems = SCHEDULE_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section id="schedule" className="py-20 sm:py-28 border-t border-[#1f1f1f] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono-code text-[#80868b] uppercase tracking-[0.3em] mb-3">
              <span className="w-8 h-px bg-[#1f1f1f]" />
              <span>Chronology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
              Single-Day Program
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0e0e0e] border border-[#1f1f1f]">
            {(
              [
                { id: 'all', label: 'Full Run' },
                { id: 'keynote', label: 'Keynote' },
                { id: 'track', label: 'Tracks' },
                { id: 'codelab', label: 'CodeLabs' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono-code transition-all ${
                  filter === tab.id
                    ? 'bg-white text-zinc-950 font-medium'
                    : 'text-[#80868b] hover:text-[#f2f2f2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Table Layout */}
        <div className="divide-y divide-[#1f1f1f] border-t border-b border-[#1f1f1f]">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start hover:bg-white/[0.015] px-2 sm:px-4 transition-colors"
              >
                {/* Time & Duration */}
                <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start items-baseline gap-1">
                  <span className="font-mono-code text-lg sm:text-xl font-semibold text-[#f2f2f2] tracking-tight">
                    {item.time}
                  </span>
                  <span className="text-xs font-mono-code text-[#555]">
                    {item.duration}
                  </span>
                </div>

                {/* Main Content */}
                <div className="md:col-span-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-[#80868b]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-sans font-semibold text-[#f2f2f2] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#80868b] font-normal leading-relaxed">
                    {item.highlight}
                  </p>
                </div>

                {/* Location & Speaker / Stage */}
                <div className="md:col-span-3 text-left md:text-right pt-2 md:pt-0">
                  <p className="text-xs font-mono-code text-[#f2f2f2] flex md:justify-end items-center gap-1.5">
                    <MapPin size={12} className="text-[#80868b]" />
                    <span>{item.hall}</span>
                  </p>
                  <p className="text-[11px] text-[#555] font-mono-code mt-1 italic">
                    {item.speakerOrLead}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Notice on Day Program */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-code text-[#555]">
          <span>* All time slots reflect Indian Standard Time (IST). Final speaker schedule published 2 weeks prior.</span>
          <span className="text-[#80868b]">In-Person Only • Morabadi Auditorium</span>
        </div>
      </div>
    </section>
  );
};
