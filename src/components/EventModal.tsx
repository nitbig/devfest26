/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Tag, Calendar, ExternalLink, User, Navigation } from 'lucide-react';
import { sound } from '../utils/sound';

export type EventModalTab = 'schedule' | 'speakers' | 'venue';

interface EventModalProps {
  isOpen: boolean;
  initialTab?: EventModalTab;
  onClose: () => void;
  onGetTickets: () => void;
}

const SCHEDULE_DATA = [
  {
    time: '08:30 AM',
    title: 'Doors Open, Check-In & Morning Coffee',
    speaker: 'GDG Ranchi Team',
    hall: 'Main Foyer',
    tag: 'Welcome',
    type: 'community',
  },
  {
    time: '09:45 AM',
    title: 'Keynote: Autonomous Agents & The Next Era of Software Engineering',
    speaker: 'Invited Google Developer Expert & Engineering Leads',
    hall: 'Auditorium Main Stage',
    tag: 'Keynote',
    type: 'keynote',
  },
  {
    time: '11:00 AM',
    title: 'Parallel Deep Dives: Multimodal Models & Cloud Run Production Patterns',
    speaker: 'Track Leads & System Architects',
    hall: 'Halls A & B',
    tag: 'Technical',
    type: 'track',
  },
  {
    time: '01:00 PM',
    title: 'Lunch Break & Hallway Networking',
    speaker: 'Community Gathering',
    hall: 'Dining Lawns',
    tag: 'Networking',
    type: 'community',
  },
  {
    time: '02:00 PM',
    title: 'Hands-on Codelabs: Building Local-First Apps with Compose & Gemini',
    speaker: 'Workshop Facilitators',
    hall: 'Lab Studio 1',
    tag: 'Hands-on',
    type: 'codelab',
  },
  {
    time: '04:00 PM',
    title: 'Panel Discussion: Scaling Developer Ecosystems in Tier-2 Cities',
    speaker: 'Ecosystem Leaders & Founders',
    hall: 'Auditorium Main Stage',
    tag: 'Panel',
    type: 'keynote',
  },
  {
    time: '05:30 PM',
    title: 'Closing Assembly, Swag Distribution & Community Photo',
    speaker: 'GDG Ranchi Organizers',
    hall: 'Auditorium Main Stage',
    tag: 'Closing',
    type: 'community',
  },
];

const SPEAKERS_DATA = [
  {
    name: 'Dr. Aarav Mehta',
    role: 'Principal ML Researcher, Google Developer Expert',
    topic: 'Frontiers in Agentic Reasoning & Multimodal Context Windows',
    company: 'DeepMind Fellow',
  },
  {
    name: 'Sunita Rao',
    role: 'Staff Infrastructure Engineer',
    topic: 'Designing Resilient Distributed Backends on Google Cloud Platform',
    company: 'Cloud Native Systems',
  },
  {
    name: 'Karan Verma',
    role: 'Android Platform Lead',
    topic: 'Jetpack Compose Internals: Zero-Allocation Rendering Pipelines',
    company: 'Mobile Core Labs',
  },
  {
    name: 'Pooja Kashyap',
    role: 'Open Web Standard Advocate',
    topic: 'Next-Gen Web Capabilities, WebGPU, and On-Device Neural Execution',
    company: 'Chromium Contributor',
  },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  initialTab = 'schedule',
  onClose,
  onGetTickets,
}) => {
  const [activeTab, setActiveTab] = useState<EventModalTab>(initialTab);

  // Update tab if initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-[#111111] border border-[#282828] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Authentic Google 4-Color Accent Strip */}
          <div className="h-1.5 w-full flex shrink-0">
            <div className="w-1/4 h-full bg-[#4285F4]" />
            <div className="w-1/4 h-full bg-[#EA4335]" />
            <div className="w-1/4 h-full bg-[#FBBC05]" />
            <div className="w-1/4 h-full bg-[#34A853]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#202020] bg-[#141414]">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setActiveTab('schedule');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  activeTab === 'schedule'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#80868b] hover:text-white'
                }`}
              >
                Schedule
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setActiveTab('speakers');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  activeTab === 'speakers'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#80868b] hover:text-white'
                }`}
              >
                Speakers
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setActiveTab('venue');
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                  activeTab === 'venue'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#80868b] hover:text-white'
                }`}
              >
                Venue
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playTick();
                onClose();
              }}
              className="prismic-icon-btn prismic-google-red w-8 h-8 text-[#80868b] hover:text-white focus:outline-none"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>

          {/* Content Body */}
          <div className="overflow-y-auto p-6 space-y-6">
            {/* SCHEDULE TAB */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">
                      Friday, October 30, 2026
                    </h3>
                    <p className="text-xs text-[#80868b]">
                      Dr. Ram Dayal Munda Auditorium · Single Continuous Track & Breakout Labs
                    </p>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#34A853] bg-[#34A853]/10 px-2 py-1 rounded border border-[#34A853]/30">
                    CONFIRMED
                  </span>
                </div>

                <div className="divide-y divide-[#1e1e1e]">
                  {SCHEDULE_DATA.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                      <div className="sm:w-24 font-mono-code text-xs text-[#80868b] shrink-0 font-medium">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-[#f2f2f2] group-hover:text-white transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#80868b] mt-0.5">
                          {item.speaker} · <span className="text-[#666]">{item.hall}</span>
                        </p>
                      </div>
                      <span className="text-[10px] font-mono-code text-[#555] uppercase tracking-wider px-2 py-0.5 border border-[#262626] rounded self-start">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SPEAKERS TAB */}
            {activeTab === 'speakers' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#202020]">
                  <h3 className="text-lg font-bold text-white font-sans">
                    Featured Faculty & Keynote Speakers
                  </h3>
                  <p className="text-xs text-[#80868b]">
                    Practitioners delivering hands-on teardowns and architectural breakthroughs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SPEAKERS_DATA.map((sp, idx) => {
                    const trackColors = ['#4285F4', '#EA4335', '#34A853', '#FBBC05'];
                    const color = trackColors[idx % trackColors.length];
                    const initials = sp.name.split(' ').map(n => n[0]).join('').slice(0, 2);

                    return (
                      <div
                        key={idx}
                        className="group p-4 rounded-2xl border border-[#242424] bg-[#161616]/60 space-y-2.5 hover:border-[#383838] transition-all relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base font-bold text-white font-sans truncate group-hover:text-[#8ab4f8] transition-colors">
                              {sp.name}
                            </h4>
                            <p className="text-xs text-[#9aa0a6] truncate mt-0.5">{sp.role}</p>
                          </div>

                          <span className="text-xs font-mono-code text-[#666] shrink-0">
                            0{idx + 1}
                          </span>
                        </div>

                        <p className="text-sm text-[#e0e0e0] leading-relaxed">
                          "{sp.topic}"
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="inline-block text-xs text-[#80868b] px-2.5 py-0.5 rounded bg-white/5 border border-white/5 font-medium">
                            {sp.company}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VENUE TAB */}
            {activeTab === 'venue' && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-[#202020]">
                  <h3 className="text-lg font-bold text-white font-sans">
                    Dr. Ram Dayal Munda Auditorium
                  </h3>
                  <p className="text-xs text-[#80868b]">
                    Morabadi, Ranchi, Jharkhand 834008 · India
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#80868b]">
                  <div className="p-4 rounded-xl border border-[#242424] bg-[#161616]/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-white font-medium text-sm">
                      <Navigation size={14} className="text-[#4285F4]" />
                      <span>Transit from Railway Station</span>
                    </div>
                    <p className="leading-relaxed">
                      6.2 km from Ranchi Junction (RNC). Regular auto-rickshaws, pre-paid cabs, and local bus transit directly to Morabadi Grounds.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#242424] bg-[#161616]/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-white font-medium text-sm">
                      <Navigation size={14} className="text-[#EA4335]" />
                      <span>Transit from Airport</span>
                    </div>
                    <p className="leading-relaxed">
                      11.5 km from Birsa Munda Airport (IXR). Approximately 25-30 minutes via Kanke Road / Morabadi Expressway.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#242424] bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono-code text-[#80868b]">
                    GPS: 23.3441° N, 85.3096° E · Parking available on-site
                  </div>
                  <a
                    href="https://maps.google.com/?q=Ram+Dayal+Munda+Auditorium+Morabadi+Ranchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#333] hover:border-white text-xs uppercase tracking-wider text-white transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-[#202020] bg-[#141414] flex items-center justify-between">
            <span className="text-xs text-[#80868b]">
              DevFest Ranchi '26 · Free Community Summit
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playSnap();
                onClose();
                onGetTickets();
              }}
              className="px-5 py-2 rounded-full bg-white text-black text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#e0e0e0] transition-colors"
            >
              Get Tickets ↗
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
