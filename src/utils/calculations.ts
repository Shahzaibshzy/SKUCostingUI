import type { SkuComponent } from '@/types'

/** Extended cost = quantity * cost per unit */
export function extendedCost(quantity: number, cost: number): number {
  return Math.round(quantity * cost * 100) / 100
}

/** Sum of extended costs for all components */
export function totalComponentCost(components: SkuComponent[]): number {
  return components.reduce((sum, c) => sum + c.extendedCost, 0)
}

/** Recompute extended cost for a single component */
export function withRecalculatedExtendedCost(c: SkuComponent): SkuComponent {
  return { ...c, extendedCost: extendedCost(c.quantity, c.cost) }
}

/** Recompute all extended costs and return new array */
export function recalculateComponentCosts(components: SkuComponent[]): SkuComponent[] {
  return components.map(withRecalculatedExtendedCost)
}

/** Amazon fee ~9.8% of selling price (example) */
export function amazonFee(sellingPrice: number): number {
  return Math.round(sellingPrice * 0.098 * 100) / 100
}

/** Format currency for display */
export function formatCurrency(value: number): string {
  return value.toFixed(2)
}
