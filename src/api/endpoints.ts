import type {
  PaginatedResponse,
  ListQueryParams,
  SkuListItem,
  SkuDetail,
  BundleType,
  Category,
  ComponentOption,
} from '@/types'
import { apiClient } from './client'

/** Build query string from ListQueryParams */
function buildListQuery(params: ListQueryParams): string {
  const sp = new URLSearchParams()
  sp.set('page', String(params.page))
  sp.set('pageSize', String(params.pageSize))
  if (params.search) sp.set('search', params.search)
  if (params.sortBy) sp.set('sortBy', params.sortBy)
  if (params.sortOrder) sp.set('sortOrder', params.sortOrder)
  return sp.toString()
}

/** Real API: fetch paginated SKU list (stub – not called when USE_MOCK_API) */
export async function apiFetchSkuList(params: ListQueryParams): Promise<PaginatedResponse<SkuListItem>> {
  const qs = buildListQuery(params)
  const { data } = await apiClient.get<PaginatedResponse<SkuListItem>>(`/skus?${qs}`)
  return data
}

/** Real API: get SKU by id */
export async function apiFetchSkuById(id: string): Promise<SkuDetail | null> {
  const { data } = await apiClient.get<SkuDetail | null>(`/skus/${id}`)
  return data
}

/** Real API: create or update SKU */
export async function apiSaveSku(payload: Partial<SkuDetail> & { skuCode: string }): Promise<SkuDetail> {
  const { data } = await apiClient.post<SkuDetail>('/skus', payload)
  return data
}

/** Real API: rename SKU code */
export async function apiRenameSkuCode(id: string, newCode: string): Promise<{ skuCode: string }> {
  const { data } = await apiClient.patch<{ skuCode: string }>(`/skus/${id}/code`, { skuCode: newCode })
  return data
}

/** Real API: bundle types */
export async function apiFetchBundleTypes(): Promise<BundleType[]> {
  const { data } = await apiClient.get<BundleType[]>('/bundle-types')
  return data
}

/** Real API: categories */
export async function apiFetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>('/categories')
  return data
}

/** Real API: component options */
export async function apiFetchComponentOptions(): Promise<ComponentOption[]> {
  const { data } = await apiClient.get<ComponentOption[]>('/components')
  return data
}
