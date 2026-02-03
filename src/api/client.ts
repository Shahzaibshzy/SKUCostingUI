import axios, { type AxiosInstance } from 'axios'
import { APP_CONFIG } from '@/config/app.config'

/** Axios instance for real API. Base URL from env; no interceptors for now. */
export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})
