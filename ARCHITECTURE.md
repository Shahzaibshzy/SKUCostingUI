# SKU & Inventory Management – Architecture

## Overview

This is a frontend-only admin dashboard. Data is provided by a **configurable data layer**: either **mock data** (default) or a **real backend API**. Switching between them requires changing a single flag; no UI or component refactor is needed.

## Mock vs Real API

- **Config:** `src/config/app.config.ts`
- **Flag:** `USE_MOCK_API = true` (mock) or `false` (real API)
- **Single switch:** Only this flag is changed when connecting to the real backend. All UI, hooks, and pages use the same service interface.

## Folder Structure

```
src/
  api/           # Real API client (Axios) and endpoint functions
  config/        # App config, including USE_MOCK_API
  mocks/         # Mock data and mock service implementations
  services/      # Data abstraction: calls mock or api based on config
  pages/         # Route-level pages (SKU List, SKU Maintenance)
  components/    # Reusable UI (layout, ui primitives)
  hooks/         # usePagination, useSkuList, useSkuDetail
  types/         # Shared TypeScript types
  schemas/       # Zod validation schemas (e.g. SKU maintenance form)
  utils/         # Calculations, CSV export, helpers
```

## Data Flow

1. **UI / Pages** never import from `api/` or `mocks/` directly.
2. **Hooks** (e.g. `useSkuList`, `useSkuDetail`) call **services** only.
3. **Services** (`src/services/skuService.ts`) read `APP_CONFIG.useMockApi` and call either mock or API functions. All functions return the same shapes (e.g. `PaginatedResponse<SkuListItem>`, `SkuDetail | null`).

So:

- **Mock:** `services/skuService.ts` → `mocks/skuMockService.ts` → `mocks/data/*`
- **Real API:** `services/skuService.ts` → `api/endpoints.ts` → Axios → backend

## Pagination & Search

- **Current (mock):** Client-side pagination and search over in-memory data. `ListQueryParams` (page, pageSize, search) is already in place.
- **Future (real API):** Same `ListQueryParams` can be sent to the backend; only the implementation in `api/endpoints.ts` (and possibly `mocks/skuMockService.ts`) changes. No change required in pages or hooks.

## Future-Proofing

- **Server-side pagination:** Keep using `ListQueryParams`; backend returns `PaginatedResponse<T>`. Hooks and table stay the same.
- **Large datasets:** List page and services are built for paginated data; switch to API and server-side pagination when ready.
- **Role-based UI:** Add auth/role checks in layout or route guards; services can later send auth headers via the same Axios client.
- **More marketplaces:** Extend types and services (e.g. `SkuListItem.marketplace`); UI can branch on role or feature flags.

## Tech Stack

- **React 18** + **TypeScript** (strict)
- **Vite** – build and dev server
- **Tailwind CSS** – styling (v4 + Vite plugin)
- **React Router** – routing
- **TanStack React Query** – server state (list, detail)
- **Axios** – HTTP client for real API
- **React Hook Form + Zod** – SKU maintenance form validation

## Key Files

| Purpose              | File(s) |
|----------------------|--------|
| Mock vs API switch   | `src/config/app.config.ts` |
| Data access entry    | `src/services/skuService.ts` |
| Mock implementations | `src/mocks/skuMockService.ts`, `src/mocks/data/*` |
| Real API calls       | `src/api/endpoints.ts`, `src/api/client.ts` |
| List page            | `src/pages/SkuListPage.tsx` |
| Maintenance page     | `src/pages/SkuMaintenancePage.tsx` |
| List hook            | `src/hooks/useSkuList.ts` |
| Maintenance schema   | `src/schemas/skuMaintenance.schema.ts` |
