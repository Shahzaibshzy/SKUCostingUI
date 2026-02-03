import type { SkuListItem, SkuDetail, BundleType, Category, ComponentOption } from '@/types'
import type { SKUItem, Bundle } from './referenceMockData'
import {
  skuItems,
  sampleBundle,
  bundleTypesList,
  categoriesList,
  availableComponents,
} from './referenceMockData'

function slug(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function mapSkuItemToListItem(item: SKUItem): SkuListItem {
  return {
    id: String(item.id),
    skuCode: item.skuCode,
    asin: item.asin,
    active: item.active ? 'Active' : 'Inactive',
    fulfilledBy: item.fulfilledBy as 'Seller' | 'Amazon',
    condition: item.condition,
    title: item.title,
    qty: item.qty,
    mainImageUrl: item.mainImage || null,
    totalCost: item.totalCost,
    shippingFee: item.shippingFee,
    sellingPrice: item.sellingPrice,
  }
}

export function mapBundleToSkuDetail(bundle: Bundle, id: string): SkuDetail {
  return {
    id,
    skuCode: bundle.sku,
    bundleTypeId: slug(bundle.bundleType),
    bundleTypeName: bundle.bundleType,
    components: bundle.components.map((c) => ({
      id: `c-${c.id}`,
      quantity: c.qty,
      categoryId: slug(c.category),
      categoryName: c.category,
      componentId: `comp-${c.id}`,
      componentName: c.component,
      cost: c.cost,
      extendedCost: c.extCost,
    })),
    mainImageUrl: bundle.productImage || null,
    title: bundle.productName,
    componentCost: bundle.componentCost,
    shippingFee: bundle.shippingFee,
    sellingPrice: bundle.sellingPrice,
    amazonFee: bundle.amazonFee,
  }
}

export function getReferenceSkuList(): SkuListItem[] {
  return skuItems.map(mapSkuItemToListItem)
}

export function getReferenceBundleTypes(): BundleType[] {
  return bundleTypesList.map((name, i) => ({ id: slug(name) || `b-${i}`, name }))
}

export function getReferenceCategories(): Category[] {
  return categoriesList.map((name, i) => ({ id: slug(name) || `cat-${i}`, name, sortOrder: i }))
}

export function getReferenceComponentOptions(): ComponentOption[] {
  return availableComponents.map((c, i) => ({
    id: `opt-${i}-${slug(c.name)}`,
    name: c.name,
    categoryId: slug(c.category),
    cost: c.cost,
  }))
}

const referenceList = getReferenceSkuList()
const detailByListId = new Map<string, SkuDetail>()
referenceList.forEach((item, index) => {
  if (index === 0) {
    detailByListId.set(item.id, mapBundleToSkuDetail(sampleBundle, item.id))
  } else {
    detailByListId.set(item.id, {
      id: item.id,
      skuCode: item.skuCode,
      bundleTypeId: 'rokinon-lens',
      bundleTypeName: 'Rokinon Lens',
      components: [],
      mainImageUrl: item.mainImageUrl,
      title: item.title,
      componentCost: item.totalCost,
      shippingFee: item.shippingFee,
      sellingPrice: item.sellingPrice,
      amazonFee: Math.round(item.sellingPrice * 0.098 * 100) / 100,
    })
  }
})

export function getReferenceSkuDetailById(id: string): SkuDetail | undefined {
  return detailByListId.get(id) ?? (id === '1' ? mapBundleToSkuDetail(sampleBundle, '1') : undefined)
}
