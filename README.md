# SKU & Inventory Management Admin Dashboard

Production-ready frontend for SKU and inventory management. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, **TanStack React Query**, **Axios**, and **React Hook Form + Zod**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app redirects to **SKUs** (list). Click a row to open **SKU Maintenance**.

## Mock vs Real API

The app is **frontend-only** and uses **mock data** by default. To switch to the real backend:

1. Open `src/config/app.config.ts`.
2. Set `USE_MOCK_API = false`.
3. Configure `VITE_API_BASE_URL` in `.env` if needed (default `/api`).

No UI or component refactor is required; all data access goes through the service layer.

## Features

- **SKU List:** Table with search, pagination, status badges (Active/Inactive), main image, cost/shipping/selling price, download (CSV). Row click → SKU Maintenance.
- **SKU Maintenance:** Create/edit SKU, rename code, bundle type, add/remove components, editable qty/category/component/cost, auto extended cost and summary (component cost, shipping, selling price, Amazon fee). Save & Cancel.

## Architecture

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for:

- Folder structure and data flow
- Single config flag for mock vs real API
- API-ready pagination and types
- Future-proofing (server-side pagination, roles, marketplaces)

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start dev server         |
| `npm run build` | Production build       |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Tech Stack

- React 18, TypeScript (strict), Vite
- Tailwind CSS v4
- React Router, TanStack React Query, Axios
- React Hook Form + Zod
