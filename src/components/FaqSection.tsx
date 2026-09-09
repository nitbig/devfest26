/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, Mail, MessageSquare, X, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';

export interface FaqItem {
  id: string;
  category: 'Registration' | 'Sessions' | 'Travel' | 'Event Day';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Registration',
    question: 'What is DevFest?',
    answer:
      'DevFest is an annual community-led developer festival hosted by Google Developer Groups (GDGs) worldwide. DevFest Ranchi convenes software engineers, students, designers, and tech leaders across Jharkhand for hands-on CodeLabs, deep-dive technical sessions, and community networking around Google developer technologies and open-source software. Learn more about GDG Ranchi at https://gdg.community.dev/gdg-ranchi/.',
  },
  {
    id: 'faq-2',
    category: 'Registration',
    question: 'Who can attend?',
    answer:
      'Anyone passionate about building technology is welcome! DevFest welcomes software engineers, systems architects, DevOps professionals, student developers, UX designers, technical founders, and open-source enthusiasts. Sessions are structured across beginner, intermediate, and advanced architectural levels so every attendee gains practical value.',
  },
  {
    id: 'faq-3',
    category: 'Travel',
    question: 'Where is DevFest Ranchi?',
    answer:
      'DevFest Ranchi 2026 takes place at the Birsa Munda International Convention Hall, located on Doranda Main Road, Near Audrey House Precinct, Ranchi, Jharkhand 834002. It is conveniently situated approximately 15 minutes from Birsa Munda Airport (IXR) and 12 minutes from Ranchi Central Railway Station, with dedicated on-site parking and accessible transit options.',
  },
  {
    id: 'faq-4',
    category: 'Event Day',
    question: 'When is DevFest?',
    answer:
      'DevFest Ranchi 2026 takes place over two full days on Saturday, December 12 and Sunday, December 13, 2026 (with an exclusive VIP speaker dinner and welcome mixer on the evening of Friday, December 11). Check-in and breakfast badge collection begins promptly at 08:30 IST on Saturday morning.',
  },
  {
    id: 'faq-5',
    category: 'Event Day',
    question: 'What happens during the event?',
    answer:
      'The festival spans 32+ technical sessions across 4 parallel tracks. Day 1 focuses on deep-dive keynote lectures, architecture breakdowns, lightning pitches, and fireside debates. Day 2 features hands-on CodeLabs (bring your laptop), sandbox workshops guided by Google Developer Experts, the 24-hour BuildSprint hackathon finale, and an evening community networking mixer.',
  },
  {
    id: 'faq-6',
    category: 'Registration',
    question: 'How do I get tickets?',
    answer:
      'Tickets can be reserved directly on this website by clicking the "Get Tickets" button. We offer three tiers: the subsidized Student Scholar Pass (₹299), the full-access Professional Developer Pass (₹699 Early Access), and the Community Patron Pass (₹1,999) which sponsors two student scholars. Each pass includes meals, official swag bags, and digital credential badges.',
  },
  {
    id: 'faq-7',
    category: 'Registration',
    question: 'Can students attend?',
    answer:
      'Absolutely! Students are the lifeblood of our community. We offer a dedicated Student Scholar Pass at a heavily subsidized price of ₹299 (including full 2-day access, lunch, hands-on CodeLabs, and official DevFest swag). You will simply need to present a valid university or college photo ID card at the check-in desk upon arrival.',
  },
  {
    id: 'faq-8',
    category: 'Sessions',
    question: 'How can I volunteer?',
    answer:
      'DevFest Ranchi is run entirely by volunteer engineers and organizers! Applications for our volunteer team (handling stage operations, technical labs, registration desks, attendee experience, and live streaming) open through the GDG Ranchi community portal. You can reach out directly to volunteer@gdgranchi.in or join our Discord community to connect with the organizing team.',
  },
  {
    id: 'faq-9',
    category: 'Registration',
    question: 'How can I become a partner?',
    answer:
      'We welcome technology leaders, venture funds, cloud providers, and regional innovation hubs as partners. Sponsorship packages range from Community Supporter to Premier Platinum Partner, offering keynote opportunities, exhibition booths, recruiting lounges, and direct brand exposure to 1,400+ top engineers. Click "Partner With Us" or email sponsors@gdgranchi.in to receive the official sponsor prospectus.',
  },
  {
    id: 'faq-10',
    category: 'Sessions',
    question: 'Is Call for Papers (CFP) currently open?',
    answer:
      'Yes, the DevFest Ranchi ‘26 CFP is active until September 30, 2026. We welcome talk proposals across our 4 core tracks (Generative AI & Agents, Cloud Native, Web & Chrome, Android & Mobile) from both first-time local speakers and seasoned international engineers. Mentorship is provided for all accepted speakers.',
  },
];

const CATEGORIES = ['All', 'Registration', 'Sessions', 'Travel', 'Event Day'] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, { badge: string; text: string; border: string }> = {
  Registration: {
    badge: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/25',
    text: 'text-[#4285F4]',
    border: 'hover:border-[#4285F4]/40',
  },
  Sessions: {
    badge: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/25',
    text: 'text-[#EA4335]',
    border: 'hover:border-[#EA4335]/40',
  },
  Travel: {
    badge: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/25',
    text: 'text-[#34A853]',
    border: 'hover:border-[#34A853]/40',
  },
  'Event Day': {
    badge: 'bg-[#FBBC04]/10 text-[#FBBC04] border-[#FBBC04]/25',
    text: 'text-[#FBBC04]',
    border: 'hover:border-[#FBBC04]/40',
  },
};

interface FaqSectionProps {
  initialOpenId?: string | null;
  compact?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ initialOpenId = 'faq-2', compact = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(initialOpenId);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleToggle = (id: string) => {
    sound.playTick();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-[#80868b] mb-2.5">
            <span>Everything You Need to Know</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-[#f2f2f2] leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#9aa0a6] mt-3 max-w-2xl leading-relaxed">
            Answers to common questions about ticketing, schedule, venue accessibility, CodeLabs, and community guidelines for DevFest Ranchi 2026.
          </p>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-white text-black border-white font-semibold shadow-sm'
                    : 'bg-white/[0.04] text-white/60 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/10 text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#EA4335] focus:ring-1 focus:ring-[#EA4335] transition-all"
          />
          <Search size={14} className="text-[#80868b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#80868b] hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          const colors = CATEGORY_COLORS[faq.category] || {
            badge: 'bg-white/10 text-neutral-400 border-white/10',
            text: 'text-[#EA4335]',
            border: 'hover:border-white/20',
          };

          return (
            <motion.div
              key={faq.id}
              layout
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white/[0.04] backdrop-blur-md border-[#EA4335]/45 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_20px_rgba(234,67,53,0.1)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(faq.id)}
                aria-expanded={isOpen}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer group focus:outline-none"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code uppercase tracking-wider border shrink-0 ${colors.badge}`}
                  >
                    {faq.category}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-[#f2f2f2] group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div className="shrink-0 text-[#80868b] group-hover:text-white transition-colors">
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-[#EA4335]' : 'rotate-0'
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/[0.06] text-[#9aa0a6] text-sm sm:text-base leading-relaxed">
                      {faq.answer.includes('http') ? (
                        <>
                          {faq.answer.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                            part.startsWith('http') ? (
                              <a
                                key={i}
                                href={part.replace(/[.,;)]$/, '')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#4285F4] hover:text-[#8ab4f8] underline underline-offset-4 transition-colors font-medium inline-flex items-center gap-1 mx-1"
                              >
                                <span>{part.replace(/[.,;)]$/, '')}</span>
                                <ExternalLink size={13} className="inline-block shrink-0" />
                              </a>
                            ) : (
                              part
                            )
                          )}
                        </>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="py-16 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-base sm:text-lg text-[#9aa0a6]">
              No matching questions found for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                sound.playTick();
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3.5 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-[#EA4335] hover:bg-[#EA4335]/10 border border-[#EA4335]/30 transition-all"
            >
              Clear filters and search
            </button>
          </div>
        )}
      </div>

      {/* Still Have Questions Box */}
      {!compact && (
        <div className="mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#121212]/80 to-transparent border border-white/10 relative overflow-hidden text-center">
          {/* Subtle Ambient Red Glow */}
          <div
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-24 bg-[#EA4335]/20 blur-3xl rounded-full"
            aria-hidden="true"
          />

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm text-[#9aa0a6] mb-6 max-w-md mx-auto leading-relaxed">
            Our organizing team is always here to help. Reach out on Discord or drop an email directly to our support inbox.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3.5">
            <a
              href="mailto:support@gdgranchi.in"
              onClick={() => sound.playTick()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-all border border-white/10 hover:border-white/20 active:scale-98"
            >
              <Mail size={14} className="text-[#EA4335]" />
              <span>Email Support</span>
            </a>

            <a
              href="https://discord.gg/gdgranchi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-[#5865F2]/25 active:scale-98"
            >
              <MessageSquare size={14} />
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
