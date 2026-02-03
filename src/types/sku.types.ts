/** SKU status for list display */
export type SkuStatus = 'Active' | 'Inactive'

/** Fulfillment channel */
export type FulfilledBy = 'Seller' | 'Amazon'

/** Condition code (e.g. new-new) */
export type Condition = string

/** SKU list row - matches table columns */
export interface SkuListItem {
  id: string
  skuCode: string
  asin: string
  active: SkuStatus
  fulfilledBy: FulfilledBy
  condition: Condition
  title: string
  qty: number
  mainImageUrl: string | null
  totalCost: number
  shippingFee: number
  sellingPrice: number
}

/** SKU detail for maintenance page */
export interface SkuDetail {
  id: string
  skuCode: string
  bundleTypeId: string
  bundleTypeName: string
  components: SkuComponent[]
  mainImageUrl: string | null
  title: string
  /** Computed: sum of component extended costs */
  componentCost: number
  shippingFee: number
  sellingPrice: number
  amazonFee: number
}

/** Single component row in SKU maintenance */
export interface SkuComponent {
  id: string
  quantity: number
  categoryId: string
  categoryName: string
  componentId: string
  componentName: string
  cost: number
  extendedCost: number
}

/** Bundle type option for dropdown */
export interface BundleType {
  id: string
  name: string
}

/** Category option for component dropdown */
export interface Category {
  id: string
  name: string
  sortOrder?: number
}

/** Component option (product) for dropdown */
export interface ComponentOption {
  id: string
  name: string
  categoryId: string
  cost: number
}
