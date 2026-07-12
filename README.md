# Wayz Driver Finder

Trusted rides across Naypyitaw. Pick a route, find licensed drivers, call directly — no accounts, no waiting.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
```

The app works offline with built-in fallback data (45 drivers, 26 locations). No backend required.

## Backend (optional)

```bash
npm run server       # Start API on port 8080
# or run both together:
npm start            # Frontend + backend concurrently
```

The Vite dev server proxies `/api/*` to `localhost:8080`. Database auto-initializes on first request.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (port 3000) |
| `npm run server` | Express API server (port 8080) |
| `npm start` | Both servers concurrently |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Features

- Route-matched driver search with pickup/destination dropdowns
- Interactive Leaflet map with OSRM routing
- Full driver roster with name/vehicle search
- City tour landmark guide with Google Maps links
- Contact form saved to SQLite
- English / Myanmar (Burmese) i18n
- Mobile-responsive layout
- Fallback data when API is unavailable

## Tech Stack

Vue 3 · Vite · Pinia · Vue Router · vue-i18n · Axios · Leaflet · Express · SQLite (better-sqlite3)
