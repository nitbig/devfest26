/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
<<<<<<< HEAD
import {
  Sparkles,
  Cpu,
  Smartphone,
  Globe,
  Terminal,
  Code2,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Bookmark,
  Share2
} from 'lucide-react';
=======
import { ArrowUpRight, Send } from 'lucide-react';
>>>>>>> update
import { sound } from '../utils/sound';
import { CfpModal } from '../components/CfpModal';

interface Speaker {
  id: string;
  name: string;
<<<<<<< HEAD
  initials: string;
  role: string;
  affiliation: string;
  topic: string;
  track: string;
  trackColor: string;
  trackId: 'all' | 'ai' | 'cloud' | 'android' | 'web';
  icon: React.ReactNode;
  takeaways: string;
=======
  number: string;
  role: string;
  company: string;
  topic: string;
  category: string;
  tag: string;
  accent: string;
  initials: string;
>>>>>>> update
  links: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Dr. Aarav Mehta',
<<<<<<< HEAD
    initials: 'AM',
    role: 'Principal Research Scientist & GDE',
    affiliation: 'Google DeepMind Fellow',
    topic: 'Autonomous Agents & Next-Gen Multimodal Reasoning Windows',
    track: 'Gemini & Machine Intelligence',
    trackColor: '#4285F4',
    trackId: 'ai',
    icon: <Sparkles size={20} className="text-[#4285F4]" />,
    takeaways: 'Production RAG architectures, structured function calling, and zero-shot reasoning loops.',
=======
    number: '01',
    role: 'Principal Research Scientist & GDE',
    company: 'Google DeepMind Fellow',
    topic: 'Autonomous Multimodal Agents with Gemini & Gemma',
    category: 'AI & Gemini',
    tag: 'Gemini',
    accent: '#4285F4',
    initials: 'AM',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'sp2',
    name: 'Sunita Rao',
<<<<<<< HEAD
    initials: 'SR',
    role: 'Staff Infrastructure Lead',
    affiliation: 'Cloud Native Systems',
    topic: 'Building Scalable, Zero-Cold-Start APIs with Cloud Run & Spanner',
    track: 'Cloud & Infrastructure Scale',
    trackColor: '#EA4335',
    trackId: 'cloud',
    icon: <Cpu size={20} className="text-[#EA4335]" />,
    takeaways: 'Multi-region failover, latency minimization under spiky traffic, and distributed tracing.',
=======
    number: '02',
    role: 'Staff Infrastructure Lead',
    company: 'Cloud Native Systems',
    topic: 'Zero to Millions: Resilient Serverless Systems on Cloud Run',
    category: 'Cloud & Scale',
    tag: 'Cloud',
    accent: '#EA4335',
    initials: 'SR',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'sp3',
    name: 'Karan Verma',
<<<<<<< HEAD
    initials: 'KV',
    role: 'Android Platform Architect',
    affiliation: 'Mobile Core Labs',
    topic: 'Jetpack Compose Zero-Allocation Rendering Pipelines & KMP',
    track: 'Android & Kotlin Ecosystem',
    trackColor: '#34A853',
    trackId: 'android',
    icon: <Smartphone size={20} className="text-[#34A853]" />,
    takeaways: 'Layout measurement internals, subcomposition optimizations, and multiplatform shared state.',
=======
    number: '03',
    role: 'Android Platform Architect',
    company: 'Mobile Core Labs',
    topic: 'Next-Gen Mobile: Android 16 & Modern Kotlin Multiplatform',
    category: 'Android & KMP',
    tag: 'Android',
    accent: '#34A853',
    initials: 'KV',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'sp4',
<<<<<<< HEAD
    name: 'Pooja Kashyap',
    initials: 'PK',
    role: 'Open Web Standards Advocate',
    affiliation: 'Chromium Contributor',
    topic: 'Neural Execution in the Browser: WebGPU & WebAssembly Kernels',
    track: 'Web & Emerging Standards',
    trackColor: '#FBBC05',
    trackId: 'web',
    icon: <Globe size={20} className="text-[#FBBC05]" />,
    takeaways: 'Client-side inference performance, shader compilation, and modern browser storage primitives.',
=======
    name: 'Aditi Sharma',
    number: '04',
    role: 'ML Research Lead',
    company: 'Vertex AI Community',
    topic: 'Fine-Tuning Gemma on Edge Devices with WebGPU',
    category: 'Web & GPU',
    tag: 'Web',
    accent: '#4285F4',
    initials: 'AS',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'sp5',
<<<<<<< HEAD
    name: 'Rohan Sharma',
    initials: 'RS',
    role: 'Cloud Native Lead Architect',
    affiliation: 'DevOps Guild India',
    topic: 'Declarative GitOps & Automated Microservice Resilience Patterns',
    track: 'Cloud & Infrastructure Scale',
    trackColor: '#4285F4',
    trackId: 'cloud',
    icon: <Terminal size={20} className="text-[#4285F4]" />,
    takeaways: 'Canary rollouts, eBPF telemetry, and chaos engineering in Kubernetes clusters.',
=======
    name: 'Vikramaditya Roy',
    number: '05',
    role: 'Systems Architect & Founder',
    company: 'Distributed Systems Labs',
    topic: 'Low-Latency Event Streaming with WebAssembly & Rust',
    category: 'Cloud & Scale',
    tag: 'Cloud',
    accent: '#EA4335',
    initials: 'VR',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'sp6',
<<<<<<< HEAD
    name: 'Ananya Sen',
    initials: 'AS',
    role: 'AI Product Specialist',
    affiliation: 'Human-AI Interaction Lab',
    topic: 'Designing Non-Deterministic Interfaces: Multimodal UX Patterns',
    track: 'Gemini & Machine Intelligence',
    trackColor: '#EA4335',
    trackId: 'ai',
    icon: <Code2 size={20} className="text-[#EA4335]" />,
    takeaways: 'Feedback loops, latency perception management, and accessibility in generative software.',
=======
    name: 'Kunal Verma',
    number: '06',
    role: 'AI Systems Architect',
    company: 'Agent Workflow Engineering',
    topic: 'Production Agent Workflows with Gemini Function Calling',
    category: 'AI & Gemini',
    tag: 'Gemini',
    accent: '#34A853',
    initials: 'KV',
>>>>>>> update
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

const TRACK_FILTERS = [
<<<<<<< HEAD
  { id: 'all', label: 'All Speakers' },
  { id: 'ai', label: 'AI & Gemini' },
  { id: 'cloud', label: 'Cloud & Scale' },
  { id: 'android', label: 'Android & KMP' },
  { id: 'web', label: 'Web & GPU' },
=======
  { key: 'ALL', label: 'All Speakers' },
  { key: 'AI & Gemini', label: 'AI & Gemini' },
  { key: 'Cloud & Scale', label: 'Cloud & Scale' },
  { key: 'Android & KMP', label: 'Android & KMP' },
  { key: 'Web & GPU', label: 'Web & GPU' },
>>>>>>> update
];

interface SpeakersPageProps {
  onGetTickets: () => void;
}

export const SpeakersPage: React.FC<SpeakersPageProps> = ({ onGetTickets }) => {
<<<<<<< HEAD
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cfpModalOpen, setCfpModalOpen] = useState(false);
  const [bookmarkedSpeakers, setBookmarkedSpeakers] = useState<Record<string, boolean>>({});

  const filteredSpeakers = selectedTrack === 'all'
    ? SPEAKERS
    : SPEAKERS.filter((s) => s.trackId === selectedTrack);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSnap();
    setBookmarkedSpeakers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="pt-32 sm:pt-40 pb-28 sm:pb-36 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#80868b]">
            02 / Keynote faculty & speakers
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-white leading-[1.05] mb-3">
              Speakers
            </h1>
            <p className="text-base sm:text-lg text-[#9aa0a6] font-normal max-w-2xl leading-relaxed">
              Google Developer Experts, staff architects, and open-source contributors sharing battle-tested production blueprints in Ranchi.
            </p>
          </div>

          {/* Call for Speakers CTA pill with Prismic Hover Effect */}
=======
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [cfpModalOpen, setCfpModalOpen] = useState(false);

  const filteredSpeakers =
    selectedCategory === 'ALL'
      ? SPEAKERS
      : SPEAKERS.filter((s) => s.category === selectedCategory);

  return (
    <div className="pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Clean Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white mb-4">
            Speakers
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-sans text-white/70 font-light leading-relaxed">
            DevFest Ranchi '26 seeks deep-dive architectural teardowns, production case studies, and hands-on demonstrations. No marketing pitches.
          </p>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar border-b border-white/[0.08]">
          {TRACK_FILTERS.map((f) => {
            const isActive = selectedCategory === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setSelectedCategory(f.key);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredSpeakers.map((speaker) => {
              return (
                <motion.div
                  key={speaker.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col justify-between rounded-2xl bg-[#121314] border border-[#222325] hover:border-[#383a3d] p-5 sm:p-6 transition-all duration-300"
                >
                  {/* Speaker Image Section (Exact Size: h-44 sm:h-48 rounded-xl) */}
                  <div className="relative w-full h-44 sm:h-48 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-center overflow-hidden mb-5">
                    {/* Tag pill badge */}
                    <div
                      className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-sans border"
                      style={{
                        backgroundColor: `${speaker.accent}14`,
                        borderColor: `${speaker.accent}30`,
                        color: speaker.accent,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: speaker.accent }}
                      />
                      <span>{speaker.tag}</span>
                    </div>

                    {/* Radial glow */}
                    <div
                      className="absolute w-28 h-28 rounded-full blur-[35px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                      style={{ backgroundColor: speaker.accent }}
                    />

                    {/* Initials circle */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg border transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${speaker.accent}12`,
                        borderColor: `${speaker.accent}40`,
                        color: speaker.accent,
                        boxShadow: `0 0 24px ${speaker.accent}20`,
                      }}
                    >
                      {speaker.initials}
                    </div>
                  </div>

                  {/* Speaker Details - Clean Name and Designation */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold font-sans text-white group-hover:text-[#8ab4f8] transition-colors tracking-tight leading-snug">
                          {speaker.name}
                        </h3>
                        <span className="text-sm font-mono-code text-[#777]">{speaker.number}</span>
                      </div>

                      <p className="text-sm sm:text-base text-[#9aa0a6] font-medium leading-normal">
                        {speaker.role} · <span className="text-[#e2e5e9] font-medium">{speaker.company}</span>
                      </p>
                    </div>

                    {/* Social Profile Links & Join Talk CTA */}
                    <div className="pt-4 border-t border-[#202123] mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a
                          href={speaker.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playTick();
                          }}
                          className="prismic-icon-btn prismic-github w-9 h-9 text-[#80868b]"
                          aria-label={`${speaker.name} on GitHub`}
                          title="GitHub Profile"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                        </a>

                        <a
                          href={speaker.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playTick();
                          }}
                          className="prismic-icon-btn prismic-linkedin w-9 h-9 text-[#80868b]"
                          aria-label={`${speaker.name} on LinkedIn`}
                          title="LinkedIn Profile"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>

                        <a
                          href={speaker.links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playTick();
                          }}
                          className="prismic-icon-btn prismic-twitter w-9 h-9 text-[#80868b]"
                          aria-label={`${speaker.name} on Twitter`}
                          title="Twitter / X Profile"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSnap();
                          onGetTickets();
                        }}
                        className="inline-flex items-center gap-1.5 text-sm text-[#8ab4f8] hover:text-white font-semibold transition-colors"
                      >
                        <span>Join talk</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Call For Papers Banner / Section (Selected div 1) */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#121314] border border-[#27282b] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/30 text-[#f28b82] text-xs font-medium">
              <span>Call For Speakers (CFP) Now Open</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Have an architectural breakdown or case study?
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa0a6] max-w-xl font-normal leading-relaxed">
              We welcome technical practitioners to present at DevFest Ranchi '26. Sessions receive full speaker mentorship, conference badge, and accommodation support.
            </p>
          </div>

>>>>>>> update
          <button
            type="button"
            onClick={() => {
              sound.playSnap();
              setCfpModalOpen(true);
            }}
<<<<<<< HEAD
            className="self-start md:self-auto group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e1f20] hover:bg-[#252729] border border-[#333538] hover:border-[#4285F4] text-xs font-medium text-white transition-all shadow-md focus:outline-none"
          >
            <div className="w-5 h-5 rounded-full bg-[#4285F4]/20 flex items-center justify-center text-[#4285F4] group-hover:rotate-[360deg] transition-transform duration-500">
              <Send size={11} />
            </div>
            <span>Propose a Talk (CFP)</span>
            <ArrowUpRight size={13} className="text-[#80868b] group-hover:text-white transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* Track Filter Chips with Prismic hover style */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {TRACK_FILTERS.map((f) => {
          const isActive = selectedTrack === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                sound.playTick();
                setSelectedTrack(f.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-md shadow-white/10'
                  : 'bg-[#161718] hover:bg-[#202123] border border-[#28292c] text-[#9aa0a6] hover:text-white'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Speaker Cards: Compact image area and prominent typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence mode="popLayout">
          {filteredSpeakers.map((speaker, idx) => {
            return (
              <motion.div
                key={speaker.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group flex flex-col justify-between rounded-2xl bg-[#121314] border border-[#222325] hover:border-[#383a3d] p-5 sm:p-6 transition-all duration-300"
              >
                {/* Smaller, compact image/avatar area */}
                <div className="h-32 sm:h-36 md:h-40 w-full rounded-xl bg-gradient-to-br from-[#18191b] via-[#141516] to-[#101112] border border-[#262729] group-hover:border-[#35383c] transition-colors relative overflow-hidden mb-5 flex items-center justify-center">
                  {/* Ambient subtle glow matching track color */}
                  <div
                    className="absolute inset-0 opacity-15 blur-xl pointer-events-none transition-opacity group-hover:opacity-25"
                    style={{
                      background: `radial-gradient(circle at center, ${speaker.trackColor} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Subtle track pill badge inside the picture area */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 shadow-sm"
                    style={{
                      backgroundColor: `${speaker.trackColor}18`,
                      borderColor: `${speaker.trackColor}40`,
                      color: speaker.trackColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: speaker.trackColor }}
                    />
                    <span>{speaker.track.split(' ')[0]}</span>
                  </div>

                  {/* Centered Monogram Initials & Icon Avatar */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center font-bold text-lg sm:text-xl font-mono-code transition-transform duration-300 group-hover:scale-105 shadow-inner"
                    style={{
                      backgroundColor: `${speaker.trackColor}12`,
                      color: speaker.trackColor,
                      borderColor: `${speaker.trackColor}35`,
                    }}
                  >
                    {speaker.initials}
                  </div>
                </div>

                {/* Speaker Details - Clean Name and Designation */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold font-sans text-white group-hover:text-[#8ab4f8] transition-colors tracking-tight leading-snug">
                        {speaker.name}
                      </h3>
                      <span className="text-sm font-mono-code text-[#777]">0{idx + 1}</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#9aa0a6] font-medium leading-normal">
                      {speaker.role} · <span className="text-[#e2e5e9] font-medium">{speaker.affiliation}</span>
                    </p>
                  </div>

                  {/* Social Profile Links & Join Talk CTA */}
                  <div className="pt-4 border-t border-[#202123] mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <a
                        href={speaker.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="prismic-icon-btn prismic-github w-9 h-9 text-[#80868b]"
                        aria-label={`${speaker.name} on GitHub`}
                        title="GitHub Profile"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                      </a>

                      <a
                        href={speaker.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="prismic-icon-btn prismic-linkedin w-9 h-9 text-[#80868b]"
                        aria-label={`${speaker.name} on LinkedIn`}
                        title="LinkedIn Profile"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>

                      <a
                        href={speaker.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="prismic-icon-btn prismic-twitter w-9 h-9 text-[#80868b]"
                        aria-label={`${speaker.name} on Twitter`}
                        title="Twitter / X Profile"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playSnap();
                        onGetTickets();
                      }}
                      className="inline-flex items-center gap-1.5 text-sm text-[#8ab4f8] hover:text-white font-semibold transition-colors"
                    >
                      <span>Join talk</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Call For Papers Banner / Section */}
      <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#121314] border border-[#27282b] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-medium">
            <Sparkles size={12} />
            <span>Call For Speakers (CFP) Now Open</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
            Have an architectural breakdown or case study?
          </h3>
          <p className="text-xs sm:text-sm text-[#9aa0a6] max-w-xl font-normal leading-relaxed">
            We welcome technical practitioners to present at DevFest Ranchi '26. Sessions receive full speaker mentorship, conference badge, and accommodation support.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSnap();
            setCfpModalOpen(true);
          }}
          className="shrink-0 prismic-engineer-btn px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white shadow-xl focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <Send size={13} />
            <span>Submit a Talk Proposal</span>
          </span>
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs text-[#80868b] tracking-wider uppercase font-medium">
          More speakers and mentors to be announced soon
        </span>
        <button
          type="button"
          onClick={() => {
            sound.playSnap();
            onGetTickets();
          }}
          className="group inline-flex items-center gap-2 text-xs tracking-wider font-semibold text-white hover:text-[#4285F4] transition-colors focus:outline-none"
        >
          <span>Get tickets for DevFest</span>
          <ArrowUpRight
            size={13}
            className="text-[#80868b] group-hover:text-[#4285F4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </button>
=======
            className="shrink-0 prismic-engineer-btn px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white shadow-xl focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Send size={13} />
              <span>Submit a Talk Proposal</span>
            </span>
          </button>
        </div>
>>>>>>> update
      </div>

      {/* Call For Papers Modal */}
      <CfpModal isOpen={cfpModalOpen} onClose={() => setCfpModalOpen(false)} />
    </div>
  );
};
<<<<<<< HEAD
=======

>>>>>>> update
