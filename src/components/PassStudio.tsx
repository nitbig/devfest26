/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { GdgLogo } from './GdgLogo';
import {
  Download,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  QrCode,
  ShieldCheck,
  Copy,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface PassStudioProps {
  selectedTrackId?: string;
  onOpenRsvpModal: (passData: { name: string; handle: string; role: string; track: string }) => void;
}

const TRACK_LABELS: Record<string, { name: string; color: string }> = {
  'ai-ml': { name: 'Machine Intelligence', color: '#4285F4' },
  'cloud-infra': { name: 'Cloud Architecture', color: '#EA4335' },
  'android-mobile': { name: 'Android & Kotlin', color: '#34A853' },
  'web-frontends': { name: 'Web & WebGPU', color: '#FBBC04' },
  'community-oss': { name: 'Open Source', color: '#ffffff' },
};

export const PassStudio: React.FC<PassStudioProps> = ({
  selectedTrackId = 'ai-ml',
  onOpenRsvpModal,
}) => {
  const [name, setName] = useState('Ananya Sen');
  const [role, setRole] = useState('Staff Engineer');
  const [handle, setHandle] = useState('@ananya_builds');
  const [activeTrack, setActiveTrack] = useState(selectedTrackId || 'ai-ml');
  const [tier, setTier] = useState<'General' | 'Speaker' | 'Contributor'>('General');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // 3D Card Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTilt({ x: rotateX, y: rotateY });
    setMousePos({
      x: `${(x / rect.width) * 100}%`,
      y: `${(y / rect.height) * 100}%`,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const passNumber = 'DF26-RNC-0842';

  const handleCopyLink = () => {
    sound.playSnap();
    navigator.clipboard.writeText(
      `${window.location.origin}/#pass?attendee=${encodeURIComponent(name)}&pass=${passNumber}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    sound.playSnap();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const currentTrackInfo = TRACK_LABELS[activeTrack] || TRACK_LABELS['ai-ml'];

  return (
    <section id="pass-studio" className="py-20 sm:py-28 border-t border-[#1f1f1f] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono-code text-[#80868b] uppercase tracking-[0.3em] mb-3">
              <span className="w-8 h-px bg-[#1f1f1f]" />
              <span>Interactive Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
              Attendee Pass Studio
            </h2>
          </div>

          <p className="text-sm text-[#80868b] max-w-md font-normal leading-relaxed">
            Mint your personalized DevFest Ranchi '26 credential badge. Each badge features verifiable encryption markers and track encoding.
          </p>
        </div>

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Interactive 3D Holographic Pass Badge */}
          <div className="lg:col-span-6 flex justify-center perspective-[1200px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              style={
                {
                  '--mouse-x': mousePos.x,
                  '--mouse-y': mousePos.y,
                  transformStyle: 'preserve-3d',
                } as React.CSSProperties
              }
              className="relative w-full max-w-[360px] sm:max-w-[390px] bg-[#0e0e0e] border border-[#333] p-6 sm:p-7 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              {/* Lanyard Hole Clip Graphic */}
              <div className="flex justify-center mb-6" aria-hidden="true">
                <div className="w-16 h-3 bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center">
                  <div className="w-10 h-1 bg-white/[0.1]" />
                </div>
              </div>

              {/* Dynamic Sheen Overlay */}
              <div
                className="pointer-events-none absolute inset-0 pass-sheen opacity-80 mix-blend-screen"
                aria-hidden="true"
              />

              {/* Badge Header: GDG Logo + DevFest Ranchi '26 */}
              <div className="flex items-center justify-between pb-5 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-2.5">
                  <GdgLogo size={20} />
                  <div>
                    <p className="font-sans font-bold text-sm text-[#f2f2f2] tracking-tight leading-none">
                      {'{ DevFest }'} '26
                    </p>
                    <p className="text-[10px] text-[#80868b] font-mono-code tracking-wider uppercase mt-1">
                      Ranchi, India
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 text-[10px] font-mono-code uppercase tracking-wider text-[#80868b] border border-[#1f1f1f]">
                    {tier}
                  </span>
                </div>
              </div>

              {/* Attendee Identity Display */}
              <div className="py-8">
                <p className="text-[9px] font-mono-code uppercase tracking-widest text-[#555] mb-1">
                  Attendee Credential
                </p>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#f2f2f2] tracking-tight leading-tight">
                  {name || 'Attendee Name'}
                </h3>
                <p className="text-xs font-mono-code text-[#80868b] mt-1 flex items-center gap-2">
                  <span>{handle || '@handle'}</span>
                  <span className="text-[#333]">/</span>
                  <span className="text-[#f2f2f2]">{role || 'Developer'}</span>
                </p>
              </div>

              {/* Track Badge Strip */}
              <div className="p-3 bg-black/60 border border-[#1f1f1f] mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentTrackInfo.color }}
                  />
                  <span className="text-xs font-medium text-[#f2f2f2]">
                    {currentTrackInfo.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#555]">
                  TRACK 0{Object.keys(TRACK_LABELS).indexOf(activeTrack) + 1}
                </span>
              </div>

              {/* Card Footer: Pass Number, Verification QR & Date */}
              <div className="pt-4 border-t border-[#1f1f1f] flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-mono-code uppercase tracking-widest text-[#555]">
                    Pass Serial #
                  </p>
                  <p className="text-xs font-mono-code text-[#f2f2f2] font-semibold tracking-wider">
                    {passNumber}
                  </p>
                  <p className="text-[10px] text-[#555] mt-1 font-mono-code">
                    NOV 14, 2026 • 09:00 IST
                  </p>
                </div>

                {/* Stylized QR / Verification Matrix */}
                <div className="p-1.5 bg-white text-zinc-950">
                  <QrCode size={36} />
                </div>
              </div>

              {/* Bottom Subtle Barcode Lines */}
              <div className="mt-5 flex items-center justify-between gap-1 opacity-20" aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 bg-white"
                    style={{ width: i % 3 === 0 ? '3px' : '1.5px' }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0e0e0e] border border-[#1f1f1f] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#f2f2f2]">
                  <Sparkles size={14} className="text-[#4285F4]" />
                  <span>Customize Attendee Details</span>
                </div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#555]">
                  Step 1 of 2
                </span>
              </div>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="pass-name-input"
                  className="block text-[10px] font-mono-code uppercase tracking-widest text-[#80868b] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="pass-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    sound.playTick();
                    setName(e.target.value);
                  }}
                  maxLength={30}
                  className="w-full px-4 py-2.5 bg-black/50 border border-[#1f1f1f] text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#333] transition-colors"
                  placeholder="e.g. Aditi Verma"
                />
              </div>

              {/* Handle & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pass-handle-input"
                    className="block text-[10px] font-mono-code uppercase tracking-widest text-[#80868b] mb-1.5"
                  >
                    GitHub / Social Handle
                  </label>
                  <input
                    id="pass-handle-input"
                    type="text"
                    value={handle}
                    onChange={(e) => {
                      sound.playTick();
                      setHandle(e.target.value);
                    }}
                    maxLength={24}
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#1f1f1f] text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#333] transition-colors"
                    placeholder="e.g. @aditi_dev"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pass-role-input"
                    className="block text-[10px] font-mono-code uppercase tracking-widest text-[#80868b] mb-1.5"
                  >
                    Primary Focus / Title
                  </label>
                  <input
                    id="pass-role-input"
                    type="text"
                    value={role}
                    onChange={(e) => {
                      sound.playTick();
                      setRole(e.target.value);
                    }}
                    maxLength={28}
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#1f1f1f] text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#333] transition-colors"
                    placeholder="e.g. Android Engineer"
                  />
                </div>
              </div>

              {/* Track Selection */}
              <div>
                <label className="block text-[10px] font-mono-code uppercase tracking-widest text-[#80868b] mb-2">
                  Primary Track Affiliation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(TRACK_LABELS).map(([trackKey, info]) => {
                    const isSelected = activeTrack === trackKey;
                    return (
                      <button
                        key={trackKey}
                        type="button"
                        onClick={() => {
                          sound.playTick();
                          setActiveTrack(trackKey);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 text-left text-xs transition-all border ${
                          isSelected
                            ? 'bg-white/[0.06] border-white text-white'
                            : 'bg-black/30 border-[#1f1f1f] text-[#80868b] hover:text-[#f2f2f2] hover:border-[#333]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: info.color }}
                        />
                        <span className="truncate">{info.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pass Tier Selection */}
              <div>
                <label className="block text-[10px] font-mono-code uppercase tracking-widest text-[#80868b] mb-2">
                  Badge Tier
                </label>
                <div className="flex gap-2">
                  {(['General', 'Speaker', 'Contributor'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        sound.playTick();
                        setTier(t);
                      }}
                      className={`flex-1 py-1.5 text-xs font-mono-code transition-all border ${
                        tier === t
                          ? 'bg-white text-zinc-950 border-white font-medium'
                          : 'bg-black/30 border-[#1f1f1f] text-[#80868b] hover:text-white hover:border-[#333]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1f1f1f] flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.playSnap();
                    onOpenRsvpModal({
                      name,
                      handle,
                      role,
                      track: currentTrackInfo.name,
                    });
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 border border-[#333] hover:border-white text-white text-xs uppercase tracking-[0.15em] font-medium transition-all hover:bg-white/[0.04] active:scale-98"
                >
                  <ShieldCheck size={14} />
                  <span>Lock In & Register Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 border border-[#1f1f1f] hover:border-[#333] text-xs font-mono-code text-[#80868b] hover:text-white transition-all"
                  title="Copy pass URL"
                >
                  {copied ? <Check size={14} className="text-[#34A853]" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
