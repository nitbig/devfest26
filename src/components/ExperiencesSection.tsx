/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
}

const experiences: (ExperienceItem & { colorClass: string; hex: string })[] = [
  {
    id: 'talks',
    title: 'Talks',
    description: 'Architectural deep-dives, production case studies, and engineering breakdowns.',
    colorClass: 'prismic-google-blue',
    hex: '#4285F4',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description: 'Hands-on guided implementation labs led by seasoned industry practitioners.',
    colorClass: 'prismic-google-red',
    hex: '#EA4335',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Live codelabs, prototype building sessions, and open-source experiments.',
    colorClass: 'prismic-google-yellow',
    hex: '#FBBC05',
  },
  {
    id: 'connect',
    title: 'Connect',
    description: 'Hallway tracks, high-signal engineering peers, and community mentorship.',
    colorClass: 'prismic-google-green',
    hex: '#34A853',
  },
];

interface ExperiencesSectionProps {
  onSelectItem?: (item: ExperienceItem) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectItem }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="experiences" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
<<<<<<< HEAD
        {/* Small label: 02 / The experience */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-mono-code tracking-[0.2em] text-[#555] mb-10 sm:mb-14"
        >
          02 / The experience
        </motion.div>

=======
>>>>>>> update
        {/* Editorial List (Interactive item expands visually, other items become slightly muted) */}
        <div className="divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
          {experiences.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            const isAnyHovered = hoveredId !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <motion.div
                key={item.id}
                data-cursor="arrow"
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  sound.playTick();
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  sound.playSnap();
                  if (onSelectItem) onSelectItem(item);
                }}
                className={`group cursor-pointer transition-all duration-300 ease-out flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg ${
                  isHovered
                    ? 'py-9 sm:py-11 px-4 sm:px-6 bg-white/[0.025] scale-[1.008]'
                    : 'py-7 sm:py-8 px-2 sm:px-4'
                } ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              >
                {/* Title + Index */}
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-[200px] sm:min-w-[260px]">
                  <span className="text-xs font-mono-code text-[#555] transition-colors group-hover:text-[#80868b]">
                    0{idx + 1}
                  </span>
                  <h3
                    className={`text-2xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight transition-all duration-200 ${
                      isHovered ? 'text-white translate-x-1.5' : 'text-[#d8d8d8]'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* One-line Description */}
                <p className={`text-xs sm:text-sm max-w-md font-normal leading-relaxed flex-1 sm:px-6 transition-colors duration-200 ${
                  isHovered ? 'text-[#c0c0c0]' : 'text-[#80868b]'
                }`}>
                  {item.description}
                </p>

                {/* Arrow indicator with Prismic slide-up fill and 3D flip */}
                <div className="shrink-0 flex items-center justify-end">
                  <div
                    className={`prismic-icon-btn ${item.colorClass} w-10 h-10 ${
                      isHovered
                        ? 'border-transparent text-white shadow-lg'
                        : 'border-[#282828] text-[#80868b]'
                    }`}
                    style={isHovered ? { boxShadow: `0 8px 24px ${item.hex}40` } : {}}
                  >
                    <ArrowUpRight
                      size={16}
                      className={isHovered ? 'rotate-[360deg] text-white' : ''}
                      style={{ transition: 'transform 0.5s ease' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
