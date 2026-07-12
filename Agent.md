# Agent Instructions

## Tech Stack
- **Runtime**: Node.js
- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Custom CSS (design tokens + responsive)
- **Maps**: Leaflet + OSRM routing
- **State**: Pinia
- **Routing**: Vue Router
- **HTTP**: Axios
- **i18n**: vue-i18n (en, mm)
- **Backend**: Node.js + Express + better-sqlite3 (optional — app works offline with fallback data)

## Project Structure
```
├── index.html                 # Vite entry HTML
├── package.json
├── vite.config.js             # Dev server (port 3000) + /api proxy
├── public/
├── server/                    # Node.js + SQLite backend
│   ├── index.js               # Express server (port 8080)
│   ├── db.js                  # DB init + seed data
│   └── routes/
│       ├── drivers.js         # GET /drivers
│       ├── locations.js       # GET /locations
│       └── contact.js         # POST /contact
└── src/
    ├── app.js                 # Vue entry — mounts Pinia, Router, i18n
    ├── App.vue                # Root — layout shell + router-view
    ├── api/                   # Axios instance & API modules
    │   ├── index.js           # Axios base config
    │   └── drivers.js         # fetchDrivers, fetchLocations, submitContact
    ├── assets/
    │   └── style.css          # All CSS (tokens, layout, components, responsive)
    ├── components/            # Reusable UI components
    │   ├── AppHeader.vue      # Nav, language toggle, mobile menu
    │   ├── AppFooter.vue      # Footer with links
    │   ├── SectionHeader.vue  # Eyebrow + title + subtitle
    │   ├── DriverCard.vue     # Driver profile card with call button
    │   ├── DriverMap.vue      # Leaflet map + OSRM routing + markers
    │   ├── RouteMeter.vue     # Distance / duration readout
    │   ├── LocationDetail.vue # Sidebar landmark details
    │   ├── LandmarkModal.vue  # Teleported landmark list modal
    │   └── ToastNotification.vue
    ├── composables/           # Vue composables
    │   ├── useToast.js        # Reactive toast notification
    │   └── useGeolocation.js  # GPS + reverse geocoding
    ├── langs/                 # vue-i18n locale files
    │   ├── index.js           # i18n instance
    │   ├── en.js              # English translations
    │   └── mm.js              # Myanmar (Burmese) translations
    ├── layouts/
    │   └── MainLayout.vue     # Header + main + footer shell
    ├── pages/                 # Route-level page components
    │   ├── HomePage.vue       # Hero, trust strip, why cards
    │   ├── DriversPage.vue    # Map + route search + driver matches
    │   ├── DriverListPage.vue # Full roster with name/vehicle filter
    │   ├── ServicesPage.vue   # City tour + landmark modal
    │   ├── AboutPage.vue      # About + highlights + stats
    │   ├── ContactPage.vue    # Contact info + form with API submit
    │   ├── faq/Index.vue      # FAQ placeholder
    │   ├── users/Index.vue    # User management placeholder
    │   └── profile/Index.vue  # Profile form placeholder
    ├── router/
    │   └── index.js           # 9 routes with lazy loading
    ├── stores/                # Pinia stores
    │   ├── appStore.js        # Language state + localStorage
    │   └── driverStore.js     # Drivers, locations, search logic
    └── utility/               # Helpers & static data
        ├── helpers.js         # Haversine, nearest hub, location matching
        ├── mapIcons.js        # Leaflet SVG icons & marker factories
        └── data.js            # Fallback: 45 drivers, 26 locations, routes
```

## Scripts
- `npm run dev` — Start Vite dev server (port 3000)
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run server` — Start API server (port 8080)
- `npm start` — Run both frontend + backend concurrently

## Principles
- Follow SOLID principles
- Keep code simple and maintainable
- Use short, clear English in all communication
