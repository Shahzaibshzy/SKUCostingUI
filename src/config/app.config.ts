/**
 * Single source of truth for mock vs real API.
 * Set to false when backend is ready; no UI or component changes required.
 */
export const USE_MOCK_API = true

export const APP_CONFIG = {
  useMockApi: USE_MOCK_API,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  defaultPageSize: 10,
  maxPageSize: 100,
} as const
