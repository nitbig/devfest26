/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GdgLogo } from './GdgLogo';
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Calendar,
  Users,
  MapPin,
  Info,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onGetTickets: () => void;
}

interface NavItemConfig {
  label: string;
  path: string;
  num: string;
  icon: React.ReactNode;
  colorI: string; // Gradient start (Google palette)
  colorJ: string; // Gradient end
}

export const Navbar: React.FC<NavbarProps> = ({ onGetTickets }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Dynamic cursor-following red bubble ref and tracker (inspired by jolly-daifuku-7735da.netlify.app)
  const ticketBubbleRef = useRef<HTMLSpanElement>(null);

  const handleTicketMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (ticketBubbleRef.current) {
      ticketBubbleRef.current.style.left = `${e.clientX - rect.left}px`;
      ticketBubbleRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const navItems: NavItemConfig[] = [
    {
      label: 'Home',
      path: '/',
      num: '01',
      icon: <Home size={15} />,
      colorI: 'rgba(234, 67, 53, 0.32)',
      colorJ: 'rgba(205, 46, 36, 0.22)',
    },
    {
      label: 'Schedule',
      path: '/schedule',
      num: '02',
      icon: <Calendar size={15} />,
      colorI: 'rgba(234, 67, 53, 0.32)',
      colorJ: 'rgba(205, 46, 36, 0.22)',
    },
    {
      label: 'Speakers',
      path: '/speakers',
      num: '03',
      icon: <Users size={15} />,
      colorI: 'rgba(234, 67, 53, 0.32)',
      colorJ: 'rgba(205, 46, 36, 0.22)',
    },
    {
      label: 'Venue',
      path: '/venue',
      num: '04',
      icon: <MapPin size={15} />,
      colorI: 'rgba(234, 67, 53, 0.32)',
      colorJ: 'rgba(205, 46, 36, 0.22)',
    },
    {
      label: 'About',
      path: '/about',
      num: '05',
      icon: <Info size={15} />,
      colorI: 'rgba(234, 67, 53, 0.32)',
      colorJ: 'rgba(205, 46, 36, 0.22)',
    },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-5 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pointer-events-none"
      >
        <nav
          id="site-navbar"
          aria-label="Event Navigation"
          className={`pointer-events-auto w-full max-w-4xl transition-all duration-300 ease-out rounded-full border flex items-center justify-between px-3.5 sm:px-6 md:px-7 gap-2.5 sm:gap-4 ${
            scrolled
              ? 'bg-[#101215]/92 backdrop-blur-xl border-white/15 py-2 sm:py-2.5 shadow-2xl shadow-black/80'
              : 'bg-[#181818]/45 backdrop-blur-sm border-[#242424]/60 py-2.5 sm:py-3'
          }`}
        >
          {/* Brand: [GDG LOGO] DevFest (Ranchi removed when shrunk/scrolled) */}
          <Link
            id="navbar-brand-link"
            to="/"
            onClick={() => {
              sound.playTick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0"
          >
            <GdgLogo size={scrolled ? 18 : 20} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="flex items-baseline gap-1.5 font-sans">
              <span className="font-semibold text-sm sm:text-base text-[#f2f2f2] tracking-tight group-hover:text-white transition-colors">
                DevFest
              </span>
              {/* "Ranchi" text is removed after shrinking */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="text-xs sm:text-sm text-[#80868b] font-normal overflow-hidden whitespace-nowrap"
                  >
                    Ranchi
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {scrolled ? (
            /* Shrunk state: Text becomes icon logos with expanding glowing Google hover effect */
            <div className="hidden md:flex items-center">
              <ul className="nav-google-menu">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <li
                      key={item.label}
                      style={
                        {
                          '--i': item.colorI,
                          '--j': item.colorJ,
                        } as React.CSSProperties
                      }
                      className={isActive ? 'nav-active' : ''}
                      onMouseEnter={() => sound.playTick()}
                      onClick={() => {
                        sound.playSnap();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Link
                        to={item.path}
                        className="w-full h-full flex items-center justify-center focus:outline-none"
                        aria-label={item.label}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-title">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            /* Un-shrunk state: Clean sentence-cased links with 10px typography */
            <div className="hidden md:flex items-center gap-6 lg:gap-7 text-[10px] tracking-[0.06em] font-medium text-[#80868b]">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      sound.playTick();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1 transition-colors focus:outline-none group ${
                      isActive ? 'text-white font-semibold' : 'hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side: Get Tickets & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="navbar-get-tickets-btn"
              type="button"
              onClick={() => {
                sound.playSnap();
                onGetTickets();
              }}
              onMouseMove={handleTicketMouseMove}
              onMouseEnter={handleTicketMouseMove}
              onMouseLeave={handleTicketMouseMove}
              className="nav-ticket-hover-btn group px-3.5 sm:px-4 py-1.5 text-[10px] tracking-[0.06em] font-semibold active:scale-95 focus:outline-none"
            >
              <span ref={ticketBubbleRef} className="hover-bubble" aria-hidden="true" />
              <span className="hover-content relative z-10 flex items-center gap-1.5">
                <span>Get tickets</span>
                <ArrowUpRight
                  size={11}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="navbar-mobile-menu-btn"
              type="button"
              onClick={() => {
                sound.playTick();
                setMobileMenuOpen(true);
              }}
              className="md:hidden p-1.5 rounded-full text-[#80868b] hover:text-white border border-[#262626] transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-Screen Dark Overlay Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:hidden"
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between pb-6 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <GdgLogo size={20} />
                <span className="font-sans font-semibold text-white tracking-tight">
                  DevFest Ranchi '26
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-full border border-[#2b2b2b] text-[#80868b] hover:text-white transition-colors focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sequential Links with Google colored icons */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
                closed: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 },
                },
              }}
              className="py-10 flex flex-col space-y-5"
            >
              {navItems.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 15 },
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                      sound.playTick();
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between text-2xl font-bold font-sans tracking-tight py-2.5 border-b border-[#181818] transition-colors ${
                      location.pathname === link.path ? 'text-white' : 'text-[#a0a0a0] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="p-2 rounded-full text-white"
                        style={{ background: `linear-gradient(45deg, ${link.colorI}, ${link.colorJ})` }}
                      >
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <span className="text-xs font-mono-code text-[#555] tracking-widest">
                      {link.num}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Actions inside overlay */}
            <div className="pt-6 border-t border-[#1f1f1f] space-y-4">
              <button
                type="button"
                onClick={() => {
                  sound.playSnap();
                  setMobileMenuOpen(false);
                  onGetTickets();
                }}
                className="w-full py-3.5 rounded-full border border-white bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold text-center hover:bg-zinc-200 transition-colors"
              >
                Get Tickets ↗
              </button>
              <p className="text-[10px] font-mono-code text-center text-[#555] uppercase tracking-widest">
                OCTOBER 30, 2026 · RANCHI, INDIA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
