/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Cpu, Cloud, Smartphone, Globe, Users, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

interface Track {
  id: string;
  number: string;
  title: string;
  accentColor: string;
  category: string;
  icon: React.ElementType;
  description: string;
  topics: string[];
  level: string;
  featuredFocus: string;
}

const TRACKS: Track[] = [
  {
    id: 'ai-ml',
    number: '01',
    title: 'Gemini & Machine Intelligence',
    accentColor: '#4285F4', // Google Blue
    category: 'AI / LLM / ON-DEVICE',
    icon: Cpu,
    description:
      'Architecting with Gemini 2.5, multimodal inference pipelines, local Gemma weights, and autonomous developer agents with structured tool use.',
    topics: ['Gemini 2.5 Flash & Pro', 'Structured Output APIs', 'Gemma On-Device', 'Agentic Workflows', 'Vector Retrieval'],
    level: 'Intermediate to Advanced (L300)',
    featuredFocus: 'Building Reliable Serverless Multi-Agent Loops with Gemini',
  },
  {
    id: 'cloud-infra',
    number: '02',
    title: 'Cloud Architectures & Scale',
    accentColor: '#EA4335', // Google Red
    category: 'GCP / DEVOPS / PLATFORM',
    icon: Cloud,
    description:
      'Zero-downtime distributed systems, Google Kubernetes Engine resilience, microservice observability, and cost-effective cloud primitives.',
    topics: ['Google Kubernetes Engine', 'Cloud Run at Scale', 'Spanner Distributed SQL', 'Observability & OpenTelemetry', 'FinOps'],
    level: 'Production-Grade (L300+)',
    featuredFocus: 'From Monolith to Cloud Run: Zero-Latency Global Traffic Management',
  },
  {
    id: 'android-mobile',
    number: '03',
    title: 'Android & Kotlin Ecosystem',
    accentColor: '#34A853', // Google Green
    category: 'MOBILE / KOTLIN / COMPOSE',
    icon: Smartphone,
    description:
      'Declarative UI mastery with Jetpack Compose, Kotlin Multiplatform cross-compilation, modern memory profiling, and edge on-device inference.',
    topics: ['Jetpack Compose Deep-Dive', 'Kotlin Multiplatform (KMP)', 'Architecture & Baseline Profiles', 'Wear & Large Screens'],
    level: 'Architecture Focus (L200-L300)',
    featuredFocus: 'High-Frame-Rate UI: Profiling and Concurrency in Modern Compose',
  },
  {
    id: 'web-frontends',
    number: '04',
    title: 'Web Platforms & Experimental UI',
    accentColor: '#FBBC04', // Google Yellow
    category: 'WEB / PERFORMANCE / WASM',
    icon: Globe,
    description:
      'Pushing the boundaries of the open web with WebGPU compute, WebAssembly runtime compilation, Next-gen Core Web Vitals, and kinetic interfaces.',
    topics: ['WebGPU Compute Shaders', 'WebAssembly (Wasm)', 'View Transitions API', 'Interaction to Next Paint (INP)'],
    level: 'Experimental & Practical (L200+)',
    featuredFocus: '60FPS Without Compromise: WebGPU and View Transitions in Modern Web',
  },
  {
    id: 'community-oss',
    number: '05',
    title: 'Open Source & Engineering Culture',
    accentColor: '#ffffff', // Minimal White Accent
    category: 'COMMUNITY / LEADERSHIP',
    icon: Users,
    description:
      'Engineering mentorship, scaling developer communities in Tier-2 ecosystems, technical writing, and navigating the global open-source software commons.',
    topics: ['OSS Maintainership', 'Tier-2 Tech Ecosystems', 'Developer Advocacy', 'Career Trajectories in Tech'],
    level: 'All Experience Levels',
    featuredFocus: 'From Ranchi to Global Open Source: Lessons from Sustained Maintainers',
  },
];

interface TracksProps {
  onSelectTrackForPass?: (trackId: string) => void;
}

export const Tracks: React.FC<TracksProps> = ({ onSelectTrackForPass }) => {
  const [activeTrackId, setActiveTrackId] = useState<string>('ai-ml');

  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  return (
    <section id="tracks" className="py-20 sm:py-28 border-t border-[#1f1f1f] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Section Header with Editorial Typographic Framing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono-code text-[#80868b] uppercase tracking-[0.3em] mb-3">
              <span className="w-8 h-px bg-[#1f1f1f]" />
              <span>Curation Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
              Five Technical Pillars
            </h2>
          </div>

          <p className="text-sm text-[#80868b] max-w-md font-normal leading-relaxed">
            No sales pitches. No superficial sponsor overviews. Only rigorous, peer-reviewed engineering deep-dives curated by active practitioners.
          </p>
        </div>

        {/* Editorial Interactive Track List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: List of 5 Tracks */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#1f1f1f] border-t border-b border-[#1f1f1f]">
            {TRACKS.map((track) => {
              const isActive = track.id === activeTrackId;
              const Icon = track.icon;

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    sound.playTick();
                    setActiveTrackId(track.id);
                  }}
                  className={`group relative py-5 sm:py-6 px-3 sm:px-4 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                    isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    {/* Track Number */}
                    <span
                      className={`font-mono-code text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-[#555] group-hover:text-[#80868b]'
                      }`}
                    >
                      {track.number}
                    </span>

                    {/* Track Title */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: track.accentColor }}
                        />
                        <span className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-[#555]">
                          {track.category}
                        </span>
                      </div>
                      <h3
                        className={`text-lg sm:text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-200 truncate ${
                          isActive ? 'text-[#f2f2f2]' : 'text-[#80868b] group-hover:text-zinc-300'
                        }`}
                      >
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Indicator Icon */}
                  <div className="shrink-0 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
                        isActive
                          ? 'border-[#f2f2f2] text-white bg-white/10'
                          : 'border-[#1f1f1f] text-[#555] group-hover:text-[#80868b] group-hover:border-[#333]'
                      }`}
                    >
                      <ArrowRight size={14} className={isActive ? 'rotate-0' : '-rotate-45'} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Inspection Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#0e0e0e] border border-[#1f1f1f] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrack.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1f1f1f] mb-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: activeTrack.accentColor }}
                      />
                      <span className="font-mono-code text-[11px] text-[#80868b] uppercase tracking-wider">
                        Track {activeTrack.number} Dossier
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono-code text-[#80868b] border border-[#1f1f1f]">
                      {activeTrack.level}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-sans font-bold text-[#f2f2f2] mb-3 tracking-tight">
                    {activeTrack.title}
                  </h4>

                  <p className="text-sm text-[#80868b] leading-relaxed mb-6 font-normal">
                    {activeTrack.description}
                  </p>

                  {/* Featured Session Spotlight */}
                  <div className="mb-6 p-4 bg-black/50 border border-[#1f1f1f]">
                    <div className="flex items-center gap-2 text-[10px] font-mono-code text-[#555] uppercase tracking-wider mb-1.5">
                      <Terminal size={12} className="text-[#80868b]" />
                      <span>Featured Engineering Session</span>
                    </div>
                    <p className="text-sm font-medium text-[#f2f2f2] italic">
                      "{activeTrack.featuredFocus}"
                    </p>
                  </div>

                  {/* Topic Chips */}
                  <div className="mb-6">
                    <p className="text-[10px] font-mono-code uppercase tracking-widest text-[#555] mb-2.5">
                      Core Technology Stacks:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTrack.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 text-xs text-[#80868b] bg-white/[0.02] border border-[#1f1f1f]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  {onSelectTrackForPass && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playSnap();
                        onSelectTrackForPass(activeTrack.id);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 border border-[#333] hover:border-white text-white text-xs uppercase tracking-[0.15em] font-medium transition-all hover:bg-white/[0.04]"
                    >
                      <span>Encode Track into Pass</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
