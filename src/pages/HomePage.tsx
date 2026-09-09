/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { StatsAndCountdown } from '../components/StatsAndCountdown';
import { AboutSection } from '../components/AboutSection';
import { ExperiencesSection } from '../components/ExperiencesSection';
import { EventDetailsSection } from '../components/EventDetailsSection';
<<<<<<< HEAD
=======
import { TicketsSection } from '../components/TicketsSection';
import { SponsorsSection } from '../components/SponsorsSection';
>>>>>>> update
import { FinalCtaSection } from '../components/FinalCtaSection';

interface HomePageProps {
  onGetTickets: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetTickets }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        onGetTickets={onGetTickets}
        onExplore={handleExplore}
      />

      {/* Stats & Countdown */}
      <StatsAndCountdown />

      {/* About Section */}
      <AboutSection />

      {/* Experiences Section */}
      <ExperiencesSection
        onSelectItem={(item) => {
          if (item.id === 'talks' || item.id === 'workshops' || item.id === 'build') {
            navigate('/schedule');
          } else {
            navigate('/about');
          }
        }}
      />

      {/* Event Details Section */}
      <EventDetailsSection
        onViewSchedule={() => navigate('/schedule')}
      />

<<<<<<< HEAD
=======
      {/* Sponsors & Partners Section */}
      <SponsorsSection />

      {/* Tickets & Passes Section */}
      <TicketsSection
        onGetTickets={onGetTickets}
      />

>>>>>>> update
      {/* Final CTA */}
      <FinalCtaSection
        onGetTickets={onGetTickets}
      />
    </>
  );
};
