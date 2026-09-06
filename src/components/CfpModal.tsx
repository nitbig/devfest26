/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CfpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={handleResetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-[#121212] border border-[#282828] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[calc(100vh-2rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Authentic Google 4-Color Accent Strip */}
          <div className="h-1.5 w-full flex shrink-0">
            <div className="w-1/4 h-full bg-[#4285F4]" />
            <div className="w-1/4 h-full bg-[#EA4335]" />
            <div className="w-1/4 h-full bg-[#FBBC05]" />
            <div className="w-1/4 h-full bg-[#34A853]" />
          </div>

          {/* Dedicated Header with Title and Close Button */}
          <div className="p-5 sm:p-7 pb-4 border-b border-[#202124] flex items-start justify-between gap-4 shrink-0 bg-[#121212]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] text-[#9aa0a6] uppercase tracking-[0.2em] mb-1.5">
                <Sparkles size={13} className="text-[#4285F4]" />
                <span>Call For Speakers (CFP) · Open</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Propose a Technical Talk
              </h3>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="prismic-icon-btn prismic-google-red shrink-0 w-8 h-8 text-[#9aa0a6] hover:text-white focus:outline-none"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>

          {/* Modal Body / Form */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* Speaker Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={speakerName}
                      onChange={(e) => setSpeakerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@company.org"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    />
                  </div>
                </div>

                {/* Talk Title */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                    Proposed Session Title
                  </label>
                  <input
                    type="text"
                    required
                    value={talkTitle}
                    onChange={(e) => setTalkTitle(e.target.value)}
                    placeholder="e.g. Scaling Distributed RAG pipelines with Gemini & Cloud Run"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                  />
                </div>

                {/* Track & Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                      Target Track
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    >
                      <option value="Gemini & Machine Intelligence">Gemini & Machine Intelligence</option>
                      <option value="Cloud Architectures & Scale">Cloud Architectures & Scale</option>
                      <option value="Android & Kotlin Ecosystem">Android & Kotlin Ecosystem</option>
                      <option value="Web & Experimental UI">Web & Experimental UI</option>
                      <option value="Open Source & Leadership">Open Source & Leadership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                      Session Format
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    >
                      <option value="Full Talk (35 min)">Deep-Dive Talk (35 min)</option>
                      <option value="Lightning Talk (15 min)">Lightning Talk (15 min)</option>
                      <option value="CodeLab / Workshop (60 min)">CodeLab / Workshop (60 min)</option>
                    </select>
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-medium">
                    Technical Abstract / Key Takeaways
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Outline what engineers will learn, tools used, and prerequisites..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-5 py-2.5 rounded-full text-xs font-medium text-[#9aa0a6] hover:text-white hover:bg-[#202124] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white text-xs uppercase tracking-wider font-semibold shadow-lg shadow-[#1a73e8]/20 transition-all active:scale-98 focus:outline-none"
                  >
                    <Send size={13} />
                    <span>Submit Proposal</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#34A853]/15 border border-[#34A853]/40 text-[#34A853] mx-auto">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Proposal Received
                </h3>
                <p className="text-sm text-[#9aa0a6] max-w-md mx-auto leading-relaxed font-normal">
                  Thank you for contributing to DevFest Ranchi '26. The technical committee reviews all submissions on rolling evaluation. We will contact you at <span className="text-white font-medium">{email || 'your email'}</span>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs uppercase tracking-wider font-semibold shadow-lg shadow-[#1a73e8]/20 transition-all"
                  >
                    Done
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
