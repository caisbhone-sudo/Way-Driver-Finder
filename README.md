# Wayz Driver Finder

Trusted rides across Naypyitaw. Pick a route, find licensed drivers, call directly — no accounts, no waiting.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

The app works offline with built-in fallback data (45 drivers, 26 locations). No backend required.

## Backend (optional)

```bash
cd api
php -f init_db.php         # Create wayz.db with seed data
php -S localhost:8080      # Start API server
```

The Vite dev server proxies `/api/*` to `localhost:8080`. See `api/` for the 5 PHP endpoints.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (port 3000) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `php -f api/init_db.php` | Seed SQLite database |
| `php -S localhost:8080 -t api` | Start PHP API |

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

Vue 3 · Vite · Pinia · Vue Router · vue-i18n · Axios · Leaflet · PHP · SQLite
