import type { SkuComponent } from '@/types'
import { extendedCost, totalComponentCost, amazonFee } from './calculations'

/** Recompute extended cost for one component */
export function componentExtendedCost(quantity: number, cost: number): number {
  return extendedCost(quantity, cost)
}

/** Sum of all component extended costs */
export function sumComponentCost(components: SkuComponent[]): number {
  return totalComponentCost(components)
}

/** Compute Amazon fee from selling price */
export function computeAmazonFee(sellingPrice: number): number {
  return amazonFee(sellingPrice)
}
