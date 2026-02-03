import { z } from 'zod'

/** Validation schema for SKU maintenance form (used with React Hook Form + Zod) */
export const skuMaintenanceSchema = z.object({
  skuCode: z.string().min(1, 'SKU Code is required').max(100),
  bundleTypeId: z.string().min(1, 'Bundle Type is required'),
  title: z.string().max(500).optional(),
  description: z.string().max(2000).optional(),
  mainImageUrl: z.string().max(50000).optional(),
  shippingFee: z.number().min(0),
  sellingPrice: z.number().min(0),
})

export type SkuMaintenanceFormValues = z.infer<typeof skuMaintenanceSchema>
