import type { SkuListItem, SkuDetail } from '@/types'

/** Generate many SKU list items for pagination/search testing */
function generateSkuListItems(count: number, startIndex: number): SkuListItem[] {
  const statuses = ['Active', 'Inactive'] as const
  const conditions = ['new-new', 'used-like-new'] as const
  const fulfilledBy = ['Seller', 'Amazon'] as const
  const items: SkuListItem[] = []
  for (let i = 0; i < count; i++) {
    const id = `sku-${startIndex + i + 1}`
    const skuCode = `${30 + (i % 10)}-${String.fromCharCode(86 + (i % 10))}${String.fromCharCode(74 + (i % 10))}T-${String.fromCharCode(89 + (i % 10))}V${3 + (i % 10)}Y`
    items.push({
      id,
      skuCode,
      asin: `B00I8BICB${(i % 10)}`,
      active: statuses[i % 2],
      fulfilledBy: fulfilledBy[i % 2],
      condition: conditions[i % 2],
      title: i === 0
        ? 'Sony Alpha a6000 Mirrorless Digital Camera...'
        : `SKU Product ${i + 1} - Camera Lens Bundle...`,
      qty: i % 2 === 0 ? 95 : 0,
      mainImageUrl: i < 5 ? '/vite.svg' : null,
      totalCost: 280 + i * 100,
      shippingFee: 0,
      sellingPrice: 498 + i * 20,
    })
  }
  return items
}

export const MOCK_SKU_LIST: SkuListItem[] = [
  {
    id: 'sku-1',
    skuCode: '30-VVJT-YV3Y',
    asin: 'B00I8BICB2',
    active: 'Inactive',
    fulfilledBy: 'Seller',
    condition: 'new-new',
    title: 'Sony Alpha a6000 Mirrorless Digital Camera...',
    qty: 0,
    mainImageUrl: '/vite.svg',
    totalCost: 580.84,
    shippingFee: 0,
    sellingPrice: 498,
  },
  {
    id: 'sku-2',
    skuCode: '31-WWKU-ZW4Z',
    asin: 'B00I8BICB3',
    active: 'Active',
    fulfilledBy: 'Seller',
    condition: 'new-new',
    title: 'Canon EOS R5 Full Frame Mirrorless Camera...',
    qty: 95,
    mainImageUrl: '/vite.svg',
    totalCost: 3200,
    shippingFee: 0,
    sellingPrice: 3899,
  },
  ...generateSkuListItems(4115, 2),
]

/** One detailed SKU for maintenance - Rokinon bundle from screenshot */
export const MOCK_SKU_DETAIL: SkuDetail = {
  id: 'sku-pz-16m',
  skuCode: 'PZ_16M-FX-082619',
  bundleTypeId: 'rokinon',
  bundleTypeName: 'Rokinon Lens',
  mainImageUrl: '/vite.svg',
  title: 'Rokinon 16mm F2.0 Aspherical Wide Angle Lens for Fuji X w/Lens Hood + Protective Lens Case, Spider Flex Tripod & Other Accessory Bundle',
  componentCost: 293.5,
  shippingFee: 0,
  sellingPrice: 389.3,
  amazonFee: 38.12,
  components: [
    { id: 'c1', quantity: 1, categoryId: 'tripod', categoryName: '9. Tripod/Monopod', componentId: 'tripod-1', componentName: 'Spider Tripod', cost: 2, extendedCost: 2 },
    { id: 'c2', quantity: 1, categoryId: 'filters', categoryName: 'Filters', componentId: 'filter-77', componentName: '77 FLK', cost: 6, extendedCost: 6 },
    { id: 'c3', quantity: 1, categoryId: 'accessories', categoryName: 'Accessories', componentId: 'cap-keeper', componentName: 'Cap Keeper', cost: 0.5, extendedCost: 0.5 },
    { id: 'c4', quantity: 1, categoryId: 'lens-rokinon', categoryName: '2. Lens/Rokinon', componentId: 'rokinon-16', componentName: 'ROKINON 16mm F2.0 Ultra Wide Angle Lens (Lens Hood and Pouch incl...)', cost: 285, extendedCost: 285 },
  ],
}

/** Map SKU list id -> detail for maintenance; others get generated detail */
export function getMockSkuDetailById(id: string): SkuDetail | undefined {
  if (id === MOCK_SKU_DETAIL.id) return { ...MOCK_SKU_DETAIL, components: MOCK_SKU_DETAIL.components.map(c => ({ ...c })) }
  const listItem = MOCK_SKU_LIST.find(s => s.id === id)
  if (!listItem) return undefined
  return {
    id: listItem.id,
    skuCode: listItem.skuCode,
    bundleTypeId: 'rokinon',
    bundleTypeName: 'Rokinon Lens',
    mainImageUrl: listItem.mainImageUrl,
    title: listItem.title,
    componentCost: listItem.totalCost,
    shippingFee: listItem.shippingFee,
    sellingPrice: listItem.sellingPrice,
    amazonFee: Math.round(listItem.sellingPrice * 0.098 * 100) / 100,
    components: [
      { id: 'c1', quantity: 1, categoryId: 'lens-rokinon', categoryName: '2. Lens/Rokinon', componentId: 'rokinon-16', componentName: 'ROKINON 16mm F2.0 Lens', cost: listItem.totalCost, extendedCost: listItem.totalCost },
    ],
  }
}
