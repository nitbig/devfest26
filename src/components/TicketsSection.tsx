/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Users, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface TicketsSectionProps {
  onGetTickets: (tier?: string) => void;
}

interface TicketTier {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  price: string;
  originalPrice?: string;
  description: string;
  isPopular?: boolean;
  features: string[];
  note?: string;
  ctaText: string;
  buttonStyle: string;
}

const TICKET_TIERS: TicketTier[] = [
  {
    id: 'student',
    name: 'Student Scholar Pass',
    badge: 'Undergrads & Researchers',
    badgeColor: 'bg-[#34A853]/10 border-[#34A853]/30',
    badgeTextColor: 'text-[#34A853]',
    price: '₹299',
    originalPrice: '₹599',
    description: 'Heavily subsidized all-access festival pass for actively enrolled university & college students.',
    features: [
      'Full 2-day conference & keynote access',
      'Hands-on CodeLabs & workshops (bring laptop)',
      'Official DevFest swag kit, badge & stickers',
      'Lunch, high-tea & refreshments on both days',
      'Verified attendee digital credential badge',
      'Access to student career mentorship lounge',
    ],
    note: 'Valid student ID card required at badge check-in',
    ctaText: 'Reserve Student Pass',
    buttonStyle: 'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/15 hover:border-white/30',
  },
  {
    id: 'professional',
    name: 'Professional Developer Pass',
    badge: 'Most Popular • Engineers & Leads',
    badgeColor: 'bg-[#EA4335]/15 border-[#EA4335]/40',
    badgeTextColor: 'text-[#EA4335]',
    price: '₹699',
    originalPrice: '₹1,299',
    description: 'Comprehensive pass for software engineers, architects, founders, and technology professionals.',
    isPopular: true,
    features: [
      'Everything included in Student Pass',
      'Priority seating in Main Keynote Auditorium',
      'All 4 track deep-dives: AI, Cloud, Mobile, Web',
      'Exclusive DevFest premium hoodie & swag pack',
      'Fast-track express registration desk',
      'Networking coffee & invitation to after-hours mixer',
      'Direct Q&A with Google Developer Experts (GDEs)',
    ],
    note: 'Tax invoice & company reimbursement receipt available',
    ctaText: 'Book Professional Pass',
    buttonStyle: 'bg-[#2e3035] hover:bg-white text-white hover:text-black border border-white/20 hover:border-white font-medium shadow-[0_4px_14px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.18)] transition-all duration-300',
  },
  {
    id: 'patron',
    name: 'Community Patron Pass',
    badge: 'VIP Tier + Student Sponsor',
    badgeColor: 'bg-[#4285F4]/15 border-[#4285F4]/40',
    badgeTextColor: 'text-[#4285F4]',
    price: '₹1,999',
    originalPrice: '₹3,499',
    description: 'For tech executives, founders, and patrons who wish to champion local student developers.',
    features: [
      'Full VIP all-access pass with reserved front row',
      'Directly funds 1 student scholarship ticket',
      'Exclusive Speakers & Organizers networking dinner',
      'VIP lounge access with dedicated workspace & Wi-Fi',
      'Commemorative DevFest collector’s patron badge',
      'Name recognition on Community Wall of Honor',
      'Personalized concierge assistance during event',
    ],
    note: 'Directly funds student travel & participation grants',
    ctaText: 'Become a Community Patron',
    buttonStyle: 'bg-white text-black hover:bg-neutral-200 font-medium',
  },
];

export const TicketsSection: React.FC<TicketsSectionProps> = ({ onGetTickets }) => {
  const [selectedTier, setSelectedTier] = useState<string>('professional');

  const handleSelectTier = (tier: TicketTier) => {
    sound.playSnap();
    setSelectedTier(tier.id);
    onGetTickets(tier.name);
  };

  return (
    <section id="tickets" className="border-t border-[#1f1f1f] bg-[#0a0a0a] py-20 sm:py-28 relative">
      {/* Background ambient red glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#EA4335]/[0.035] rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
              Choose Your Pass
            </h2>
            <p className="text-sm sm:text-base text-[#9aa0a6] mt-3 max-w-2xl leading-relaxed">
              Join 500+ engineers, researchers, and technology leaders in Ranchi. All passes include two days of technical talks, hands-on CodeLabs, lunch, refreshments, verified certificates, and official DevFest merchandise.
            </p>
          </div>

          {/* Quick Perks Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-[#9aa0a6] shrink-0 self-start md:self-auto">
            <ShieldCheck size={14} className="text-[#34A853]" />
            <span>100% Non-Profit Community Event</span>
          </div>
        </div>

        {/* 3 Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {TICKET_TIERS.map((tier) => {
            const isFeatured = tier.isPopular;
            const isSelected = selectedTier === tier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#161313] to-[#0d0d0d] border-[#EA4335]/50 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(234,67,53,0.12)] ring-1 ring-[#EA4335]/25'
                    : 'bg-[#111111]/80 hover:bg-[#151515] border-[#222222] hover:border-[#333333]'
                }`}
              >
                {/* Popular pill ribbon */}
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#EA4335] text-white text-[11px] font-mono-code font-semibold tracking-wider uppercase shadow-md flex items-center justify-center">
                    <span>Recommended</span>
                  </div>
                )}

                <div>
                  {/* Pass Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
                    {tier.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mt-4 flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-code text-white tracking-tight">
                      {tier.price}
                    </span>
                    {tier.originalPrice && (
                      <span className="text-sm font-mono-code text-[#71767b] line-through">
                        {tier.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-mono-code text-[#80868b]">/ 2-day pass</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-[#9aa0a6] leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div className="my-6 border-t border-white/[0.08]" />

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono-code uppercase tracking-[0.2em] text-[#71767b]">
                      What's Included:
                    </div>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#dcdcdc] leading-snug">
                          <Check size={15} className="text-[#34A853] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA & Note */}
                <div className="mt-8 pt-4 border-t border-white/[0.06]">
                  {tier.note && (
                    <p className="text-[11px] font-mono-code text-[#80868b] mb-4 flex items-center gap-1.5">
                      <HelpCircle size={12} className="shrink-0 text-[#80868b]" />
                      <span>{tier.note}</span>
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTier(tier);
                    }}
                    className={`w-full py-3.5 px-6 rounded-full border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${tier.buttonStyle}`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate / Delegation Note */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-[#EA4335]">
              <Users size={18} />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Need Corporate or College Delegation Passes?</div>
              <div className="text-xs text-[#9aa0a6] mt-0.5">
                We offer bulk GST invoicing for engineering teams (5+ passes) and institutional student grants.
              </div>
            </div>
          </div>
          <a
            href="mailto:tickets@gdgranchi.in?subject=DevFest%20Ranchi%202026%20Bulk%20Ticket%20Inquiry"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono-code text-white transition-colors shrink-0"
          >
            <span>Inquire Bulk Passes</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};
