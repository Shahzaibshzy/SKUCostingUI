import type {
  PaginatedResponse,
  ListQueryParams,
  SkuListItem,
  SkuDetail,
  BundleType,
  Category,
  ComponentOption,
} from '@/types'
import { APP_CONFIG } from '@/config/app.config'
import * as mock from '@/mocks/skuMockService'
import * as api from '@/api/endpoints'

/**
 * Single SKU service abstraction.
 * UI and hooks use this only; they never import mocks or api directly.
 * Toggle USE_MOCK_API in config to switch data source.
 */
const useMock = APP_CONFIG.useMockApi

export function fetchSkuList(params: ListQueryParams): Promise<PaginatedResponse<SkuListItem>> {
  return useMock ? mock.fetchSkuList(params) : api.apiFetchSkuList(params)
}

export function fetchSkuById(id: string): Promise<SkuDetail | null> {
  return useMock ? mock.fetchSkuById(id) : api.apiFetchSkuById(id)
}

export function saveSku(payload: Partial<SkuDetail> & { id?: string; skuCode: string }): Promise<SkuDetail> {
  return useMock ? mock.saveSku(payload) : api.apiSaveSku(payload)
}

export function renameSkuCode(id: string, newCode: string): Promise<{ skuCode: string }> {
  return useMock ? mock.renameSkuCode(id, newCode) : api.apiRenameSkuCode(id, newCode)
}

export function fetchBundleTypes(): Promise<BundleType[]> {
  return useMock ? mock.fetchBundleTypes() : api.apiFetchBundleTypes()
}

export function fetchCategories(): Promise<Category[]> {
  return useMock ? mock.fetchCategories() : api.apiFetchCategories()
}

export function fetchComponentOptions(): Promise<ComponentOption[]> {
  return useMock ? mock.fetchComponentOptions() : api.apiFetchComponentOptions()
}
