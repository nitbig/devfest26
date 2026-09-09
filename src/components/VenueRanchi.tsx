/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Navigation, Plane, Train, Car, Compass, ExternalLink, Check, Copy } from 'lucide-react';
import { sound } from '../utils/sound';

export const VenueRanchi: React.FC = () => {
  const [copiedCoords, setCopiedCoords] = useState(false);

  const coordinates = '23.3441° N, 85.3096° E';
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Dr.+Ram+Dayal+Munda+Auditorium+Morabadi+Ranchi';

  const handleCopyCoords = () => {
    sound.playSnap();
    navigator.clipboard.writeText(coordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  return (
    <section id="venue" className="py-20 sm:py-28 border-t border-[#1f1f1f] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#f2f2f2] tracking-tight">
              Venue & Arrival
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyCoords}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1f1f1f] hover:border-[#333] text-xs font-mono-code text-[#80868b] hover:text-[#f2f2f2] transition-all"
              title="Copy GPS coordinates"
            >
              <Compass size={13} className="text-[#80868b]" />
              <span>{coordinates}</span>
              {copiedCoords ? (
                <Check size={12} className="text-[#34A853]" />
              ) : (
                <Copy size={12} className="text-[#555]" />
              )}
            </button>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] hover:border-white text-white text-xs font-sans uppercase tracking-[0.1em] font-medium transition-all hover:bg-white/[0.04]"
            >
              <span>Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Minimalist Venue Overview Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Venue Identity & Specs */}
          <div className="lg:col-span-6 bg-[#0e0e0e] border border-[#1f1f1f] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#80868b]">
                  Main Convention Ground
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#f2f2f2] mb-2 tracking-tight">
                Dr. Ram Dayal Munda Auditorium
              </h3>
              <p className="text-sm font-mono-code text-[#80868b] mb-6">
                Morabadi Ground Campus, Ranchi, Jharkhand 834008
              </p>

              <p className="text-sm text-[#80868b] leading-relaxed font-normal mb-6">
                A landmark cultural and technical auditorium situated in the historic green expanse of Morabadi.
                Featuring high-capacity tiered theater seating, acoustic-treated key stages, parallel break-out spaces, and high-speed campus WiFi.
              </p>
            </div>

            {/* Practical Accessibility Checklist */}
            <div className="pt-6 border-t border-[#1f1f1f]">
              <p className="text-[10px] font-mono-code uppercase tracking-wider text-[#555] mb-3">
                Accessibility & Facilities
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#80868b]">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                  <span>Wheelchair Ramp Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                  <span>Quiet Prayer / Zen Lounge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                  <span>Gender-Neutral Restrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#34A853]" />
                  <span>On-Site Secure Parking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Transit Nodes & Commute */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Airport */}
            <div className="p-5 bg-[#0e0e0e] border border-[#1f1f1f] flex items-start gap-4">
              <div className="p-2.5 bg-white/[0.02] border border-[#1f1f1f] text-[#80868b] shrink-0">
                <Plane size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-semibold text-sm text-[#f2f2f2]">
                    Birsa Munda Airport (IXR)
                  </h4>
                  <span className="text-[11px] font-mono-code text-[#80868b]">
                    11 km / ~25 min
                  </span>
                </div>
                <p className="text-xs text-[#80868b] mt-1 leading-relaxed">
                  Direct domestic flights from New Delhi, Bengaluru, Mumbai, Kolkata, and Hyderabad. Pre-paid airport cabs and app rides available 24/7.
                </p>
              </div>
            </div>

            {/* Railway Station */}
            <div className="p-5 bg-[#0e0e0e] border border-[#1f1f1f] flex items-start gap-4">
              <div className="p-2.5 bg-white/[0.02] border border-[#1f1f1f] text-[#80868b] shrink-0">
                <Train size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-semibold text-sm text-[#f2f2f2]">
                    Ranchi Junction (RNC) / Hatia (HTE)
                  </h4>
                  <span className="text-[11px] font-mono-code text-[#80868b]">
                    5.5 km / ~15 min
                  </span>
                </div>
                <p className="text-xs text-[#80868b] mt-1 leading-relaxed">
                  Prime railway terminus with Vande Bharat and Rajdhani connectivity to major Indian tech capitals. Quick auto-rickshaws directly to Morabadi.
                </p>
              </div>
            </div>

            {/* Weather & Climate Note */}
            <div className="p-5 bg-[#0e0e0e] border border-[#1f1f1f] flex items-start gap-4">
              <div className="p-2.5 bg-white/[0.02] border border-[#1f1f1f] text-[#80868b] shrink-0">
                <Navigation size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-semibold text-sm text-[#f2f2f2]">
                    Climate & Arrival Tips
                  </h4>
                  <span className="text-[11px] font-mono-code text-[#FBBC04]">
                    Autumn · 18°C to 24°C
                  </span>
                </div>
                <p className="text-xs text-[#80868b] mt-1 leading-relaxed">
                  November in Ranchi offers crisp, clear, dry weather. A light jacket or hoodie is suggested for morning and evening outdoor sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
