# DevFest Ranchi '26

The official website for **DevFest Ranchi 2026**, organized by Google Developer Groups (GDG) Ranchi.

Built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Server:** Express (for local/production serving)

## Project Structure

```
├── public/
│   ├── GDevs.svg
│   └── assets/
├── src/
│   ├── components/       # Reusable UI components (Hero, Navbar, Footer, Schedule, etc.)
│   ├── pages/             # Route-level pages (Home, About, Speakers, Schedule, Venue)
│   ├── utils/             # Utility helpers (e.g. sound.ts)
│   ├── App.tsx            # Root app component / routes
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── index.html
├── vite.config.ts
├── metadata.json
├── package.json
└── .env.example
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd devfest-ranchi-26
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in the values:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the app locally**
   ```bash
   npm run dev
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project with `tsc` |
| `npm run clean` | Remove build artifacts (`dist`, `server.js`) |

## Pages

- **Home** — Landing page with hero, about, stats/countdown, experiences, tracks, sponsors, tickets, and FAQ sections
- **About** — Event and community details
- **Speakers** — Speaker lineup
- **Schedule** — Event schedule/agenda
- **Venue** — Venue information for Ranchi

## About GDG Ranchi

Google Developer Groups (GDG) Ranchi is a community of developers interested in Google's developer technologies. DevFest is GDG's flagship annual event bringing together developers for talks, workshops, and networking.
