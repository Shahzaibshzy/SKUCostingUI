import type {
  PaginatedResponse,
  ListQueryParams,
  SkuListItem,
  SkuDetail,
  BundleType,
  Category,
  ComponentOption,
} from '@/types'
import { MOCK_SKU_LIST, getMockSkuDetailById } from './data'
import { getCustomDetail, setCustomSku, mergeWithBaseList } from './skuStore'
import { MOCK_BUNDLE_TYPES } from './data/bundleTypes'
import { MOCK_CATEGORIES } from './data/categories'
import { MOCK_COMPONENT_OPTIONS } from './data/componentOptions'

function paginate<T>(arr: T[], page: number, pageSize: number): { data: T[]; total: number; totalPages: number } {
  const total = arr.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const data = arr.slice(start, start + pageSize)
  return { data, total, totalPages }
}

function filterBySearch(items: SkuListItem[], search: string | undefined): SkuListItem[] {
  if (!search?.trim()) return items
  const q = search.trim().toLowerCase()
  return items.filter(
    (s) =>
      s.skuCode.toLowerCase().includes(q) ||
      s.asin.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q)
  )
}

/** Mock SKU list with pagination and search - merges base list with in-memory created/updated items */
export function fetchSkuList(params: ListQueryParams): Promise<PaginatedResponse<SkuListItem>> {
  return new Promise((resolve) => {
    const merged = mergeWithBaseList(MOCK_SKU_LIST)
    const filtered = filterBySearch(merged, params.search)
    const { data, total, totalPages } = paginate(filtered, params.page, params.pageSize)
    setTimeout(
      () =>
        resolve({
          data,
          total,
          page: params.page,
          pageSize: params.pageSize,
          totalPages,
        }),
      150
    )
  })
}

/** Mock get SKU by id - custom (created/updated) first, then base mock */
export function fetchSkuById(id: string): Promise<SkuDetail | null> {
  return new Promise((resolve) => {
    const custom = getCustomDetail(id)
    if (custom) {
      setTimeout(() => resolve(custom), 50)
      return
    }
    const detail = getMockSkuDetailById(id)
    setTimeout(() => resolve(detail ?? null), 100)
  })
}

/** Mock create/update SKU - persists to in-memory store and returns detail */
export function saveSku(payload: Partial<SkuDetail> & { id?: string; skuCode: string }): Promise<SkuDetail> {
  return new Promise((resolve) => {
    const id = payload.id ?? `sku-${Date.now()}`
    const detail: SkuDetail = {
      id,
      skuCode: payload.skuCode ?? '',
      bundleTypeId: payload.bundleTypeId ?? '',
      bundleTypeName: payload.bundleTypeName ?? '',
      components: payload.components ?? [],
      mainImageUrl: payload.mainImageUrl ?? null,
      title: payload.title ?? '',
      componentCost: payload.componentCost ?? 0,
      shippingFee: payload.shippingFee ?? 0,
      sellingPrice: payload.sellingPrice ?? 0,
      amazonFee: payload.amazonFee ?? 0,
    }
    setCustomSku(detail)
    setTimeout(() => resolve(detail), 200)
  })
}

/** Mock rename SKU code */
export function renameSkuCode(_id: string, newCode: string): Promise<{ skuCode: string }> {
  return new Promise((resolve) => setTimeout(() => resolve({ skuCode: newCode }), 100))
}

/** Mock bundle types */
export function fetchBundleTypes(): Promise<BundleType[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...MOCK_BUNDLE_TYPES]), 50))
}

/** Mock categories */
export function fetchCategories(): Promise<Category[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...MOCK_CATEGORIES].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))), 50)
  )
}

/** Mock component options */
export function fetchComponentOptions(): Promise<ComponentOption[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...MOCK_COMPONENT_OPTIONS]), 50))
}
