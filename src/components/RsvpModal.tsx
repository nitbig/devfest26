/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  QrCode,
  Download,
  Calendar,
  ArrowRight,
  User,
  Mail,
  Sparkles,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { GdgLogo } from './GdgLogo';
import { sound } from '../utils/sound';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    handle: string;
    role: string;
    track: string;
  };
}

const AVAILABLE_TRACKS = [
  { id: 'all', label: 'Full-Access Pass', color: '#4285F4' },
  { id: 'ai', label: 'AI & Gemini', color: '#4285F4' },
  { id: 'android', label: 'Android & Flutter', color: '#34A853' },
  { id: 'cloud', label: 'Cloud & Web', color: '#FBBC05' },
];

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  initialData = {
    name: 'Developer Attendee',
    handle: '@builder',
    role: 'Software Engineer',
    track: 'DevFest Ranchi Full-Access Pass',
  },
}) => {
  const [name, setName] = useState(initialData.name || 'Developer Attendee');
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(initialData.track || 'DevFest Ranchi Full-Access Pass');
  const [confirmed, setConfirmed] = useState(false);
  const [ticketDownloaded, setTicketDownloaded] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);
  const [googleAutofilled, setGoogleAutofilled] = useState(false);

  const ticketCode = 'DF26-RNC-9428';

  const handleQuickFillGoogle = () => {
    sound.playSnap();
    setName('Nitesh Kumar');
    setEmail('niteshkr2345865@gmail.com');
    setGoogleAutofilled(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSnap();
    setConfirmed(true);
  };

  const handleDownloadTicket = () => {
    sound.playSnap();
    setTicketDownloaded(true);
    setTimeout(() => setTicketDownloaded(false), 3000);
  };

  const handleAddToWallet = () => {
    sound.playSnap();
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3500);
  };

  const handleClose = () => {
    sound.playTick();
    setConfirmed(false);
    onClose();
  };

  // Google Calendar direct URL with event parameters
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "DevFest Ranchi '26 — Google Developer Groups"
  )}&dates=20261030T030000Z/20261030T123000Z&details=${encodeURIComponent(
    "DevFest Ranchi 2026 by Google Developer Groups Ranchi.\nVenue: Dr. Ram Dayal Munda Auditorium, Morabadi, Ranchi.\nPass ID: " +
      ticketCode +
      "\nTrack: " +
      selectedTrack
  )}&location=${encodeURIComponent('Dr. Ram Dayal Munda Auditorium, Morabadi, Ranchi, Jharkhand')}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="rsvp-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#121212] border border-[#282828] rounded-3xl shadow-2xl shadow-black/90 overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Authentic Google 4-Color Accent Strip */}
          <div className="h-1.5 w-full flex">
            <div className="w-1/4 h-full bg-[#4285F4]" />
            <div className="w-1/4 h-full bg-[#EA4335]" />
            <div className="w-1/4 h-full bg-[#FBBC05]" />
            <div className="w-1/4 h-full bg-[#34A853]" />
          </div>

          {!confirmed ? (
            <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-6">
              {/* Header with Close Button positioned directly above GDG Logo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="prismic-icon-btn prismic-google-red w-8 h-8 text-[#9aa0a6] hover:text-white focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2.5">
                  <GdgLogo size={18} />
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#202124] border border-[#2d2f31]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                    <span className="text-[11px] font-medium text-[#bdc1c6] tracking-wide ml-1">
                      DevFest Ranchi '26
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                  Confirm Attendee Registration
                </h3>
                <p className="text-xs text-[#9aa0a6] mt-1.5 leading-relaxed">
                  Lock in your official developer badge for auditorium access, Google codelabs, and exclusive DevFest swag.
                </p>
              </div>

              {/* Quick autofill with Google button */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={handleQuickFillGoogle}
                  className={`w-full py-2.5 px-4 rounded-full border transition-all duration-200 flex items-center justify-center gap-2.5 text-xs font-medium ${
                    googleAutofilled
                      ? 'bg-[#34A853]/10 border-[#34A853]/40 text-[#34A853]'
                      : 'bg-[#1e1f20] hover:bg-[#282a2d] border-[#3c4043] text-white hover:border-[#5f6368]'
                  }`}
                >
                  {/* Google 4-Color "G" Icon */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>
                    {googleAutofilled ? 'Autofilled with Google Account' : 'Quick fill with Google Account'}
                  </span>
                  {googleAutofilled && <Check size={14} className="text-[#34A853]" />}
                </button>
              </div>

              {/* Pass Summary Preview (Styled like Google Developer Pass Badge) */}
              <div className="p-4 rounded-2xl bg-[#18191a] border border-[#2c2d30] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium tracking-wider text-[#9aa0a6] uppercase">
                      PASS SPECIFICATION
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#4285F4]/15 text-[#8ab4f8] border border-[#4285F4]/30">
                    <ShieldCheck size={11} />
                    VIP Pass
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#80868b] uppercase tracking-wider text-[11px]">Attendee</span>
                    <span className="text-white font-medium">{name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#80868b] uppercase tracking-wider text-[11px]">Role</span>
                    <span className="text-[#bdc1c6]">{initialData.role || 'Software Engineer'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#80868b] uppercase tracking-wider text-[11px]">Track Focus</span>
                    <span className="text-[#8ab4f8] font-medium">{selectedTrack}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#262729]">
                    <span className="text-[#80868b] uppercase tracking-wider text-[11px]">Date & City</span>
                    <span className="text-[#bdc1c6]">Friday, Oct 30, 2026 · Ranchi, India</span>
                  </div>
                </div>
              </div>

              {/* Interactive Track Selection Chips */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-2">
                  Select Primary Track
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TRACKS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTrack(t.label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedTrack.includes(t.label) || selectedTrack === t.label
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'bg-[#1e1f20] text-[#9aa0a6] hover:text-white hover:bg-[#282a2d] border border-[#2d2f31]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google Material 3 Outlined Input Fields */}
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                    Attendee Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#80868b]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0a6] mb-1.5">
                    Send Confirmation & QR Pass To
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#80868b]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18191a] border border-[#2d2f31] text-sm text-white placeholder-[#5f6368] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Google-styled Pill CTAs */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-[#9aa0a6] hover:text-white hover:bg-[#202124] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white text-xs uppercase tracking-wider font-semibold shadow-lg shadow-[#1a73e8]/20 transition-all active:scale-98 focus:outline-none"
                >
                  <span>Complete Reservation</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation State: Google Digital Attendee Pass & Wallet */
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="flex items-center justify-start mb-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="prismic-icon-btn prismic-google-red w-8 h-8 text-[#9aa0a6] hover:text-white focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={15} />
                </button>
              </div>
              {/* Google 4-Color Glowing Success Circle */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 mx-auto">
                <div className="absolute inset-0 rounded-full bg-[#34A853]/20 blur-md animate-pulse" />
                <div className="relative w-14 h-14 rounded-full bg-[#34A853]/15 border border-[#34A853]/40 flex items-center justify-center text-[#34A853]">
                  <CheckCircle2 size={30} />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34A853]/10 border border-[#34A853]/30 text-[#81c995] text-xs font-medium mb-2">
                  <Sparkles size={12} />
                  <span>Pass Confirmed & Registered</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  See you at DevFest Ranchi!
                </h3>
                <p className="text-xs text-[#9aa0a6] mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Your registration is verified. Digital ticket and entry QR code have been dispatched to{' '}
                  <span className="text-[#8ab4f8] font-medium">{email || 'your email'}</span>.
                </p>
              </div>

              {/* Authentic Google DevFest Wallet Pass Card */}
              <div className="rounded-2xl bg-[#18191a] border border-[#2d2f31] text-left relative overflow-hidden shadow-xl">
                {/* 4-Color Mini Accent Bar */}
                <div className="h-1 w-full flex">
                  <div className="w-1/4 h-full bg-[#4285F4]" />
                  <div className="w-1/4 h-full bg-[#EA4335]" />
                  <div className="w-1/4 h-full bg-[#FBBC05]" />
                  <div className="w-1/4 h-full bg-[#34A853]" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#28292c]">
                    <div className="flex items-center gap-2">
                      <GdgLogo size={18} />
                      <div>
                        <p className="text-sm font-bold text-white leading-tight">
                          {'{ DevFest }'} '26 Ranchi
                        </p>
                        <p className="text-[10px] text-[#9aa0a6]">
                          Dr. Ram Dayal Munda Auditorium
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-[#34A853]/15 text-[#81c995] border border-[#34A853]/30">
                      ADMIT ONE
                    </span>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#80868b] uppercase tracking-wider">ATTENDEE NAME</p>
                      <p className="text-base font-bold text-white">{name}</p>
                      <p className="text-xs text-[#8ab4f8] font-medium pt-0.5">{selectedTrack}</p>
                      <p className="text-[11px] text-[#80868b] pt-1">
                        SERIAL: <span className="text-[#bdc1c6] font-medium">{ticketCode}</span>
                      </p>
                    </div>

                    {/* Google Styled QR Code with 4-color corners */}
                    <div className="relative p-2.5 bg-white rounded-xl shadow-md shrink-0">
                      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#4285F4]" />
                      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#EA4335]" />
                      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#FBBC05]" />
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#34A853]" />
                      <QrCode size={48} className="text-zinc-950" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#28292c] flex items-center justify-between text-[11px] text-[#9aa0a6]">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#4285F4]" />
                      Oct 30, 2026 · 08:30 AM IST
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#EA4335]" />
                      Morabadi, Ranchi
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Integration Actions */}
              <div className="space-y-2.5 pt-1">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  {/* Add to Google Wallet button */}
                  <button
                    type="button"
                    onClick={handleAddToWallet}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] hover:bg-[#282a2d] border border-[#3c4043] text-white text-xs font-medium transition-all focus:outline-none"
                  >
                    {/* Google Wallet Icon */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="6" width="18" height="12" rx="3" stroke="#4285F4" strokeWidth="1.6" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="#34A853" />
                      <path d="M19 9h1.5v6H19z" fill="#FBBC05" />
                    </svg>
                    <span>{walletAdded ? 'Added to Google Wallet ✓' : 'Add to Google Wallet'}</span>
                  </button>

                  {/* Add to Google Calendar button */}
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium shadow-md shadow-[#1a73e8]/20 transition-all focus:outline-none"
                  >
                    <Calendar size={14} />
                    <span>Add to Google Calendar</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadTicket}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-[#bdc1c6] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Download size={13} />
                    <span>{ticketDownloaded ? 'Ticket PDF Saved' : 'Download Pass PDF'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-full text-xs text-[#80868b] hover:text-white transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

