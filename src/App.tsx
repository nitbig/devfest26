/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { RsvpModal } from './components/RsvpModal';

// Dedicated Minimal Supporting Pages
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { VenuePage } from './pages/VenuePage';
import { AboutPage } from './pages/AboutPage';

const AnimatedRoutes: React.FC<{ onGetTickets: () => void }> = ({ onGetTickets }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage onGetTickets={onGetTickets} />} />
          <Route path="/schedule" element={<SchedulePage onGetTickets={onGetTickets} />} />
          <Route path="/speakers" element={<SpeakersPage onGetTickets={onGetTickets} />} />
          <Route path="/venue" element={<VenuePage onGetTickets={onGetTickets} />} />
          <Route path="/about" element={<AboutPage onGetTickets={onGetTickets} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  const handleOpenTickets = () => {
    setTicketModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0a0a0a] text-[#f2f2f2] selection:bg-[#4285F4]/30 selection:text-white font-sans antialiased overflow-x-hidden flex flex-col justify-between">
        <ScrollToTop />
        <CustomCursor />

        {/* Subtle Global Background Ambient Accent */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0" aria-hidden="true">
          <div className="absolute -top-[15%] left-[15%] w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] rounded-full bg-gradient-to-br from-[#EA4335]/[0.08] to-transparent blur-[140px]" />
        </div>

        {/* 1. Global Floating Navbar */}
        <Navbar onGetTickets={handleOpenTickets} />

        {/* 2. Main Page Content with Subtle Route Transitions */}
        <main className="relative flex-1 flex flex-col">
          <AnimatedRoutes onGetTickets={handleOpenTickets} />
        </main>

        {/* 3. Global Minimal Footer */}
        <Footer />

        {/* Global Interactive Ticket / Pass Modal */}
        <RsvpModal
          isOpen={ticketModalOpen}
          onClose={() => setTicketModalOpen(false)}
          initialData={{
            name: 'Developer Attendee',
            handle: '@builder',
            role: 'Software Engineer',
            track: 'DevFest Ranchi Full-Access Pass',
          }}
        />
      </div>
    </BrowserRouter>
  );
}
