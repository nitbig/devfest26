/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Image } from 'lucide-react';

const DUMMY_SPONSORS = [
  { id: '1', name: 'Sponsor One' },
  { id: '2', name: 'Sponsor Two' },
  { id: '3', name: 'Sponsor Three' },
  { id: '4', name: 'Sponsor Four' },
  { id: '5', name: 'Sponsor Five' },
  { id: '6', name: 'Sponsor Six' },
  { id: '7', name: 'Sponsor Seven' },
  { id: '8', name: 'Sponsor Eight' },
];

export const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative z-10">
        {/* Section Heading - Clean, no extra text or explanations */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
            Sponsors
          </h2>
        </div>

        {/* Empty image placeholders with dummy sponsor names */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {DUMMY_SPONSORS.map((sponsor, idx) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 group aspect-[4/3]"
            >
              {/* Empty image placeholder */}
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-neutral-600 group-hover:text-neutral-400 group-hover:border-white/10 transition-colors mb-3">
                <Image size={22} strokeWidth={1.5} />
              </div>

              {/* Dummy Sponsor Name */}
              <span className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-wide text-center">
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
