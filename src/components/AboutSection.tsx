/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Small label: 01 / DevFest */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-mono-code tracking-[0.2em] text-[#555] mb-8 sm:mb-12"
        >
          01 / DevFest
        </motion.div>

        {/* Asymmetric Layout with fade, translateY, small scale */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight text-[#f2f2f2] leading-[1.08]">
              Built for people<br />who build.
            </h2>
          </motion.div>

          {/* Right Column: Short paragraph & subtle accent */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:pt-3 space-y-6"
          >
            <p className="text-base sm:text-lg text-[#80868b] leading-relaxed font-normal">
              A community-led developer festival bringing together builders, learners and technology enthusiasts.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              <span className="text-xs font-mono-code uppercase tracking-[0.2em] text-[#555]">
                GDG Ranchi Chapter · Est. 2016
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
