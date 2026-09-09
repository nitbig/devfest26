/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface CfpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRACK_OPTIONS = [
  { value: 'Gemini & Machine Intelligence', label: 'Gemini & Machine Intelligence' },
  { value: 'Cloud Architectures & Scale', label: 'Cloud Architectures & Scale' },
  { value: 'Android & Kotlin Ecosystem', label: 'Android & Kotlin Ecosystem' },
  { value: 'Web & Experimental UI', label: 'Web & Experimental UI' },
  { value: 'Open Source & Leadership', label: 'Open Source & Leadership' },
];

const FORMAT_OPTIONS = [
  { value: 'Full Talk (35 min)', label: 'Deep-Dive Talk (35 min)' },
  { value: 'Lightning Talk (15 min)', label: 'Lightning Talk (15 min)' },
  { value: 'CodeLab / Workshop (60 min)', label: 'CodeLab / Workshop (60 min)' },
];

interface CustomDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${isOpen ? 'z-30' : 'z-10'}`} ref={dropdownRef}>
      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
        {label}
      </label>

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => {
          sound.playTick();
          setIsOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-left flex items-center justify-between transition-all duration-200 group focus:outline-none ${
          isOpen
            ? 'bg-[#1c1414] border border-[#EA4335] shadow-[0_0_16px_rgba(234,67,53,0.35)] ring-1 ring-[#EA4335]'
            : 'bg-white/[0.04] hover:bg-[#1c1414]/70 backdrop-blur-sm border border-white/10 hover:border-[#EA4335]/40'
        }`}
      >
        <span className="text-white font-normal truncate mr-2">
          {selectedOption?.label || value}
        </span>

        {/* Chevron Icon Shifted Inward towards Text */}
        <div className="pr-1 text-[#9aa0a6] group-hover:text-white transition-colors duration-150 shrink-0">
          <ChevronDown
            size={15}
            className={`transition-transform duration-250 ease-out ${
              isOpen ? 'rotate-180 text-[#EA4335]' : 'rotate-0 text-[#9aa0a6] group-hover:text-white'
            }`}
          />
        </div>
      </button>

      {/* Red-Black Fusion Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#161111]/95 backdrop-blur-2xl border border-[#EA4335]/40 shadow-[0_18px_45px_rgba(0,0,0,0.92),0_0_26px_rgba(234,67,53,0.24)] p-1.5 overflow-hidden"
          >
            {/* Top Red Ambient Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#EA4335] to-transparent opacity-85" />

            <div className="max-h-56 overflow-y-auto space-y-1 py-0.5 scrollbar-thin">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      sound.playSnap();
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[rgba(234,67,53,0.36)] to-[rgba(205,46,36,0.22)] text-white font-medium border border-[#EA4335]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_2px_8px_rgba(234,67,53,0.2)]'
                        : 'text-[#bdc1c6] hover:text-white hover:bg-gradient-to-r hover:from-[rgba(234,67,53,0.24)] hover:to-[rgba(205,46,36,0.14)] hover:border hover:border-[#EA4335]/30 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] shadow-[0_0_8px_#EA4335]" />
                        <Check size={13} className="text-[#EA4335]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CfpModal: React.FC<CfpModalProps> = ({ isOpen, onClose }) => {
  const [speakerName, setSpeakerName] = useState('');
  const [email, setEmail] = useState('');
  const [talkTitle, setTalkTitle] = useState('');
  const [track, setTrack] = useState('Gemini & Machine Intelligence');
  const [format, setFormat] = useState('Full Talk (35 min)');
  const [abstract, setAbstract] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSnap();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    sound.playTick();
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="cfp-modal-backdrop"
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={handleResetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#121212]/65 backdrop-blur-2xl border border-white/10 border-t-[#EA4335]/40 rounded-3xl shadow-[0_0_45px_-8px_rgba(234,67,53,0.35),0_25px_50px_-12px_rgba(0,0,0,0.95)] overflow-hidden my-auto max-h-[calc(100vh-2rem)] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Glass Specular Sheen Gradient */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/30"
            aria-hidden="true"
          />

          {/* Single Red Coloured Glowing Accent & Halo */}
          <div
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-20 bg-[#EA4335]/30 blur-2xl rounded-full"
            aria-hidden="true"
          />
          <div className="relative h-[2px] w-full overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EA4335] to-transparent shadow-[0_0_15px_#EA4335]" />
            <div className="absolute inset-0 bg-[#EA4335] blur-[2px] opacity-90" />
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto flex-1 relative z-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header with Close Button */}
                <div>
                  <div className="flex items-center justify-end -mt-1 sm:-mt-2 mb-1.5">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="prismic-icon-btn prismic-google-red w-8 h-8 text-[#9aa0a6] hover:text-white focus:outline-none shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                    Propose a Technical Talk
                  </h3>
                  <p className="text-xs text-[#9aa0a6] mt-1.5 leading-relaxed">
                    Submit your engineering session to speak live on stage at DevFest Ranchi 2026.
                  </p>
                </div>

                {/* Speaker Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={speakerName}
                      onChange={(e) => setSpeakerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#EA4335] focus:ring-1 focus:ring-[#EA4335] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@company.org"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#EA4335] focus:ring-1 focus:ring-[#EA4335] transition-all"
                    />
                  </div>
                </div>

                {/* Talk Title */}
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                    Proposed Session Title
                  </label>
                  <input
                    type="text"
                    required
                    value={talkTitle}
                    onChange={(e) => setTalkTitle(e.target.value)}
                    placeholder="e.g. Scaling Distributed RAG pipelines with Gemini & Cloud Run"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#EA4335] focus:ring-1 focus:ring-[#EA4335] transition-all"
                  />
                </div>

                {/* Track & Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomDropdown
                    label="Target Track"
                    value={track}
                    options={TRACK_OPTIONS}
                    onChange={(val) => setTrack(val)}
                  />

                  <CustomDropdown
                    label="Session Format"
                    value={format}
                    options={FORMAT_OPTIONS}
                    onChange={(val) => setFormat(val)}
                  />
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                    Technical Abstract / Key Takeaways
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Outline what engineers will learn, tools used, and prerequisites..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#EA4335] focus:ring-1 focus:ring-[#EA4335] transition-all resize-none"
                  />
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-5 py-2.5 rounded-full text-xs font-medium text-[#9aa0a6] hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1414] hover:bg-[#251616] border border-[#EA4335]/45 hover:border-[#EA4335]/70 text-white text-xs uppercase tracking-wider font-semibold shadow-[0_0_15px_rgba(234,67,53,0.2)] hover:shadow-[0_0_25px_rgba(234,67,53,0.35)] transition-all duration-300 active:scale-98 focus:outline-none overflow-hidden group"
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgba(234,67,53,0.28)] to-[rgba(205,46,36,0.2)] group-hover:opacity-100 opacity-80 transition-opacity"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-white font-semibold">Submit Proposal</span>
                    <ArrowRight size={14} className="relative z-10 text-[#EA4335] group-hover:translate-x-0.5 transition-all duration-200" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#34A853]/15 border border-[#34A853]/40 text-[#34A853] mx-auto shadow-[0_0_20px_rgba(52,168,83,0.25)]">
                  <CheckCircle2 size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Proposal Received
                  </h3>
                  <p className="text-xs text-[#9aa0a6] max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you for contributing to DevFest Ranchi '26. The technical committee reviews all submissions on rolling evaluation. We will reach out to <span className="text-white font-medium">{email || 'your email'}</span>.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1414] hover:bg-[#251616] border border-[#EA4335]/45 hover:border-[#EA4335]/70 text-white text-xs uppercase tracking-wider font-semibold shadow-[0_0_15px_rgba(234,67,53,0.2)] hover:shadow-[0_0_25px_rgba(234,67,53,0.35)] transition-all duration-300 active:scale-98 focus:outline-none overflow-hidden group"
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgba(234,67,53,0.28)] to-[rgba(205,46,36,0.2)] group-hover:opacity-100 opacity-80 transition-opacity"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-white font-semibold">Done</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
