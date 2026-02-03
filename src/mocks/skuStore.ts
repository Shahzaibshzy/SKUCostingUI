import type { SkuListItem, SkuDetail, FulfilledBy } from '@/types'

/**
 * In-memory store for mock CRUD: created/updated SKUs persist here
 * so they appear in the list until page refresh. API mode uses real backend.
 */
const customDetails = new Map<string, SkuDetail>()
const customListItems = new Map<string, SkuListItem>()

function detailToListItem(d: SkuDetail): SkuListItem {
  const ext = d as SkuDetail & { asin?: string; active?: 'Active' | 'Inactive'; fulfilledBy?: FulfilledBy; condition?: string; qty?: number }
  return {
    id: d.id,
    skuCode: d.skuCode,
    asin: ext.asin ?? '',
    active: ext.active ?? 'Active',
    fulfilledBy: (ext.fulfilledBy ?? 'Seller') as FulfilledBy,
    condition: ext.condition ?? 'new-new',
    title: d.title ?? '',
    qty: ext.qty ?? 0,
    mainImageUrl: d.mainImageUrl,
    totalCost: d.componentCost ?? 0,
    shippingFee: d.shippingFee ?? 0,
    sellingPrice: d.sellingPrice ?? 0,
  }
}

export function getCustomDetail(id: string): SkuDetail | undefined {
  return customDetails.get(id)
}

export function getCustomListItem(id: string): SkuListItem | undefined {
  return customListItems.get(id)
}

export function setCustomSku(detail: SkuDetail): void {
  customDetails.set(detail.id, detail)
  customListItems.set(detail.id, detailToListItem(detail))
}

export function mergeWithBaseList(baseList: SkuListItem[]): SkuListItem[] {
  const overrides = new Map(customListItems)
  const baseIds = new Set(baseList.map((b) => b.id))
  const fromBase = baseList.map((b) => overrides.get(b.id) ?? b)
  const customOnly = [...overrides.values()].filter((c) => !baseIds.has(c.id))
  return [...customOnly, ...fromBase]
}
