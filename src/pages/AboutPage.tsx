/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
<<<<<<< HEAD
=======
import { FaqSection } from '../components/FaqSection';
>>>>>>> update

interface AboutPageProps {
  onGetTickets: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onGetTickets }) => {
  return (
<<<<<<< HEAD
    <div className="pt-32 sm:pt-40 pb-28 sm:pb-36 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
=======
    <div className="pt-36 sm:pt-44 md:pt-48 pb-28 sm:pb-36 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
>>>>>>> update
      {/* Hero Header: What is DevFest? */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
<<<<<<< HEAD
        className="mb-14 sm:mb-20"
      >
        <span className="text-[10px] font-mono-code uppercase tracking-[0.3em] text-[#555] block mb-3">
          04 / Purpose
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-[#f2f2f2] leading-[1.05] mb-6">
          What is DevFest?
        </h1>

        {/* One or two short paragraphs */}
        <div className="space-y-4 max-w-3xl text-base sm:text-xl text-[#9aa0a6] leading-relaxed font-normal">
          <p>
            DevFest is an annual community-led developer festival hosted by Google Developer Groups worldwide. It provides a collaborative environment to explore modern software, open standards, and real-world engineering challenges.
          </p>
          <p>
            In Ranchi, we convene builders, students, and practitioners across Jharkhand for high-signal technical sessions, peer mentorship, and practical execution.
=======
        className="max-w-3xl mb-10 sm:mb-12"
      >
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white mb-4">
          About Us
        </h1>

        {/* Short paragraphs */}
        <div className="space-y-4 max-w-3xl text-base sm:text-lg md:text-xl font-sans text-white/70 font-light leading-relaxed">
          <p>
            Google Developer Group Ranchi (GDG Ranchi) is an independent, community-driven platform for developers, designers, students, and tech innovators across Jharkhand who are passionate about Google developer technologies and modern open-source ecosystems.
          </p>
          <p>
            From hands-on CodeLabs, technical workshops, and study jams to DevFest Ranchi—our annual flagship developer festival—we empower builders with practical engineering skills, industry mentorship, and real-world networking. Connect with our community on the{' '}
            <a
              href="https://gdg.community.dev/gdg-ranchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4285F4] hover:text-[#8ab4f8] underline underline-offset-4 font-normal inline-flex items-center gap-1 transition-colors"
            >
              official GDG Ranchi chapter portal
              <ArrowUpRight size={15} className="inline-block" />
            </a>.
>>>>>>> update
          </p>
        </div>
      </motion.div>

      {/* Four Focus Pillars: Talks, Workshops, Community, Building */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="divide-y divide-[#1f1f1f] border-y border-[#1f1f1f] mb-16"
      >
        {[
          { label: 'Talks', desc: 'In-depth architectural breakdowns, industry case studies, and systems engineering.' },
          { label: 'Workshops', desc: 'Guided hands-on labs on generative AI, cloud-native deployments, and modern web.' },
          { label: 'Community', desc: 'Direct dialogue with peers, tech leaders, open-source maintainers, and founders.' },
          { label: 'Building', desc: 'Real prototypes, live debugging sessions, and practical code labs.' },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="py-8 sm:py-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-white/[0.02] px-2 sm:px-4 rounded-lg transition-colors"
          >
            <div className="flex items-baseline gap-4 sm:gap-6 min-w-[220px]">
              <span className="text-xs font-mono-code text-[#555]">
                0{idx + 1}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white group-hover:text-[#4285F4] transition-colors">
                {item.label}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#80868b] max-w-lg font-normal leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </motion.div>

<<<<<<< HEAD
=======
      {/* Embedded FAQ Section */}
      <div className="mb-20 pt-10 border-t border-[#1f1f1f]">
        <FaqSection initialOpenId="faq-1" />
      </div>

>>>>>>> update
      {/* Finish with: Join DevFest ↗ */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
<<<<<<< HEAD
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4"
=======
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#1f1f1f]"
>>>>>>> update
      >
        <span className="text-xs font-mono-code text-[#555] uppercase tracking-widest">
          GDG Ranchi · October 30, 2026
        </span>

        <button
          type="button"
          onClick={() => {
            sound.playSnap();
            onGetTickets();
          }}
<<<<<<< HEAD
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-[#333] hover:border-white hover:bg-white/5 transition-all focus:outline-none"
=======
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-[#333] hover:border-white hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
>>>>>>> update
        >
          <span>Join DevFest</span>
          <ArrowUpRight
            size={14}
            className="text-[#80868b] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </button>
      </motion.div>
    </div>
  );
};
