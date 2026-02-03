import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchSkuById,
  saveSku,
  renameSkuCode,
  fetchBundleTypes,
  fetchCategories,
  fetchComponentOptions,
} from '@/services'
import { Button, Select } from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { skuMaintenanceSchema, type SkuMaintenanceFormValues } from '@/schemas/skuMaintenance.schema'
import { sumComponentCost, computeAmazonFee } from '@/utils/skuMaintenanceCalculations'
import { recalculateComponentCosts, extendedCost } from '@/utils/calculations'
import type { SkuComponent, BundleType, Category, ComponentOption } from '@/types'

const newComponentId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

function buildComponentFromOption(
  opt: ComponentOption,
  categories: Category[],
  qty = 1
): SkuComponent {
  const cat = categories.find((c) => c.id === opt.categoryId)
  return {
    id: newComponentId(),
    quantity: qty,
    categoryId: opt.categoryId,
    categoryName: cat?.name ?? opt.categoryId,
    componentId: opt.id,
    componentName: opt.name,
    cost: opt.cost,
    extendedCost: extendedCost(qty, opt.cost),
  }
}

export function SkuMaintenancePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id

  const form = useForm<SkuMaintenanceFormValues>({
    resolver: zodResolver(skuMaintenanceSchema),
    defaultValues: {
      skuCode: '',
      bundleTypeId: '',
      title: '',
      description: '',
      mainImageUrl: '',
      shippingFee: 0,
      sellingPrice: 0,
    },
  })
  const { setValue, watch, trigger } = form
  const skuCode = watch('skuCode')
  const bundleTypeId = watch('bundleTypeId')
  const title = watch('title')
  const description = watch('description')
  const mainImageUrl = watch('mainImageUrl')
  const shippingFee = watch('shippingFee')
  const sellingPrice = watch('sellingPrice')
  const [components, setComponents] = useState<SkuComponent[]>([])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const { data: sku, isLoading: loadingSku } = useQuery({
    queryKey: ['sku', id],
    queryFn: () => (id ? fetchSkuById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
  })

  const { data: bundleTypes = [] } = useQuery({
    queryKey: ['bundleTypes'],
    queryFn: fetchBundleTypes,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data: componentOptions = [] } = useQuery({
    queryKey: ['componentOptions'],
    queryFn: fetchComponentOptions,
  })

  useEffect(() => {
    if (sku) {
      setValue('skuCode', sku.skuCode)
      setValue('bundleTypeId', sku.bundleTypeId)
      setValue('title', sku.title ?? '')
      setValue('description', '')
      setValue('mainImageUrl', sku.mainImageUrl ?? '')
      setValue('shippingFee', sku.shippingFee)
      setValue('sellingPrice', sku.sellingPrice)
      setComponents(sku.components.map((c) => ({ ...c })))
    } else if (isNew) {
      setValue('skuCode', '')
      setValue('bundleTypeId', bundleTypes[0]?.id ?? '')
      setValue('title', '')
      setValue('description', '')
      setValue('mainImageUrl', '')
      setValue('shippingFee', 0)
      setValue('sellingPrice', 0)
      setComponents([])
    }
  }, [sku, isNew, bundleTypes, setValue])

  const bundleTypeOptions = useMemo(
    () => bundleTypes.map((b: BundleType) => ({ value: b.id, label: b.name })),
    [bundleTypes]
  )

  const categoryOptions = useMemo(
    () => categories.map((c: Category) => ({ value: c.id, label: c.name })),
    [categories]
  )

  const componentOptionsByCategory = useMemo(() => {
    const map = new Map<string, ComponentOption[]>()
    for (const opt of componentOptions) {
      const list = map.get(opt.categoryId) ?? []
      list.push(opt)
      map.set(opt.categoryId, list)
    }
    return map
  }, [componentOptions])

  const componentCost = useMemo(() => sumComponentCost(components), [components])
  const amazonFeeAmount = useMemo(() => computeAmazonFee(sellingPrice), [sellingPrice])

  const updateComponent = (compId: string, updates: Partial<SkuComponent>) => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== compId) return c
        const next = { ...c, ...updates }
        if ('quantity' in updates || 'cost' in updates) {
          next.extendedCost = extendedCost(next.quantity, next.cost)
        }
        if (updates.categoryId !== undefined) {
          const cat = categories.find((x) => x.id === updates.categoryId)
          next.categoryName = cat?.name ?? next.categoryName
        }
        if (updates.componentId !== undefined) {
          const opt = componentOptions.find((x) => x.id === updates.componentId)
          if (opt) {
            next.componentName = opt.name
            next.cost = opt.cost
            next.extendedCost = extendedCost(next.quantity, opt.cost)
          }
        }
        return next
      })
    )
  }

  const addComponent = () => {
    const firstCat = categories[0]
    const opts = firstCat ? componentOptionsByCategory.get(firstCat.id) ?? [] : []
    const opt = opts[0]
    if (opt) {
      const newComp = buildComponentFromOption(opt, categories)
      setComponents((prev) => [...prev, newComp])
    } else {
      setComponents((prev) => [
        ...prev,
        {
          id: newComponentId(),
          quantity: 1,
          categoryId: '',
          categoryName: '',
          componentId: '',
          componentName: '',
          cost: 0,
          extendedCost: 0,
        },
      ])
    }
  }

  const removeComponent = (compId: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== compId))
    toast.info('Component removed.')
  }

  const renameMutation = useMutation({
    mutationFn: ({ id, code }: { id: string; code: string }) => renameSkuCode(id, code),
    onSuccess: (_, { code }) => {
      setValue('skuCode', code)
      toast.success('SKU code renamed.')
    },
    onError: () => toast.error('Failed to rename SKU code.'),
  })

  const saveMutation = useMutation({
    mutationFn: () =>
      saveSku({
        id: id ?? undefined,
        skuCode,
        bundleTypeId,
        bundleTypeName: bundleTypes.find((b) => b.id === bundleTypeId)?.name ?? '',
        components: recalculateComponentCosts(components),
        mainImageUrl: mainImageUrl?.trim() ? mainImageUrl.trim() : null,
        title: title?.trim() ?? '',
        componentCost,
        shippingFee,
        sellingPrice,
        amazonFee: amazonFeeAmount,
      }),
    onSuccess: () => {
      toast.success(isNew ? 'SKU created.' : 'SKU updated.')
      queryClient.invalidateQueries({ queryKey: ['skus'] })
      queryClient.invalidateQueries({ queryKey: ['sku', id] })
      navigate('/skus')
    },
    onError: () => toast.error('Failed to save SKU.'),
  })

  const handleRename = () => {
    if (!id) return
    const newCode = window.prompt('New SKU Code', skuCode)
    if (newCode != null && newCode.trim()) renameMutation.mutate({ id, code: newCode.trim() })
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setValue('mainImageUrl', String(reader.result))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSave = async () => {
    const valid = await trigger()
    if (!valid) return
    saveMutation.mutate()
  }

  const handleCancel = () => {
    navigate('/skus')
  }

  if (id && loadingSku) {
    return (
      <div className="animate-in-fade flex items-center justify-center p-12 text-gray-500">
        Loading...
      </div>
    )
  }

  if (id && sku === null) {
    return (
      <div className="animate-in-fade p-6 text-red-600">
        SKU not found.
        <Button variant="secondary" className="ml-2 mt-2" onClick={() => navigate('/skus')}>
          Back to list
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1400px] animate-in-fade">
      <h1 className="mb-4 text-xl font-bold text-gray-900 transition-all duration-300 ease-in-out sm:mb-6 sm:text-2xl">
        SKU Maintenance
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left: form + components */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md sm:p-5">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="min-w-0 flex-1 sm:min-w-[200px]">
                <label className="mb-1 block text-sm font-medium text-gray-700">SKU</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...form.register('skuCode')}
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-[#f3f4f6] px-3 py-2 text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="SKU Code"
                  />
                  {id && (
                    <Button variant="secondary" onClick={handleRename}>
                      Rename
                    </Button>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1 sm:min-w-[180px]">
                <Select
                  label="Bundle Type"
                  options={bundleTypeOptions}
                  value={bundleTypeId}
                  onChange={(e) => setValue('bundleTypeId', e.target.value)}
                  placeholder="Select..."
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Generate SKU</Button>
                <Link to="/skus/new"><Button variant="primary">+ Add New</Button></Link>
              </div>
            </div>

            {/* Item details: title + description */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">Item details</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Product title</label>
                  <input
                    type="text"
                    {...form.register('title')}
                    placeholder="e.g. Rokinon 16mm F2.0 Lens Bundle"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Description (optional)</label>
                  <textarea
                    {...form.register('description')}
                    placeholder="Short description of the product..."
                    rows={3}
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto overscroll-x-contain rounded-lg border border-gray-200 scroll-smooth">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#93c5fd] text-gray-900">
                    <th className="px-3 py-2 font-medium">Qty.</th>
                    <th className="px-3 py-2 font-medium">Category</th>
                    <th className="px-3 py-2 font-medium">Component</th>
                    <th className="px-3 py-2 font-medium">Cost</th>
                    <th className="px-3 py-2 font-medium">Ext. Cost</th>
                    <th className="w-12 px-3 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((c, idx) => (
                    <tr
                      key={c.id}
                      className={`border-t border-gray-200 transition-colors duration-200 ease-in-out ${idx % 2 === 1 ? 'bg-[#dbeafe]' : 'bg-white'}`}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={1}
                          value={c.quantity}
                          onChange={(e) => updateComponent(c.id, { quantity: Number(e.target.value) || 1 })}
                          className="w-16 rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-center text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={c.categoryId}
                          onChange={(e) => {
                            const catId = e.target.value
                            updateComponent(c.id, { categoryId: catId, componentId: '', componentName: '', cost: 0, extendedCost: 0 })
                          }}
                          className="w-full max-w-[180px] rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="">Select...</option>
                          {categoryOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={c.componentId}
                          onChange={(e) => {
                            const optId = e.target.value
                            const opt = componentOptions.find((x) => x.id === optId)
                            if (opt) updateComponent(c.id, { componentId: opt.id, componentName: opt.name, cost: opt.cost })
                          }}
                          className="w-full max-w-[240px] rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="">Select...</option>
                          {(c.categoryId ? componentOptionsByCategory.get(c.categoryId) ?? [] : componentOptions).map((opt) => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={c.cost}
                          onChange={(e) => updateComponent(c.id, { cost: Number(e.target.value) || 0 })}
                          className="w-20 rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-right text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </td>
                      <td className="px-3 py-2 font-medium text-gray-700">{c.extendedCost.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => removeComponent(c.id)}
                          className="rounded bg-[#ef4444] p-1.5 text-white transition-all duration-200 ease-in-out hover:bg-red-600 active:scale-95"
                          title="Delete"
                          aria-label="Delete component"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="primary" onClick={addComponent} className="inline-flex items-center gap-1 text-base">
                +
              </Button>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: image upload + preview + summary */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md sm:p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">Main image</h3>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-gray-600">Image URL (optional)</label>
              <input
                type="text"
                {...form.register('mainImageUrl')}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 bg-[#f3f4f6] px-3 py-2 text-sm text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                aria-label="Upload image"
              />
              <Button
                variant="secondary"
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="w-full sm:w-auto"
              >
                Upload image
              </Button>
              {(mainImageUrl?.startsWith('data:') || mainImageUrl?.startsWith('http')) && mainImageUrl.trim() && (
                <button
                  type="button"
                  onClick={() => setValue('mainImageUrl', '')}
                  className="text-xs text-red-600 transition-colors duration-200 ease-in-out hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="group aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              {mainImageUrl?.trim() ? (
                <img src={mainImageUrl.trim()} alt="" className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
                  <span className="text-4xl">🖼</span>
                  <span className="text-sm">No image</span>
                  <span className="text-xs">Use URL or upload</span>
                </div>
              )}
            </div>
            {title?.trim() && (
              <p className="mt-3 text-sm font-medium text-gray-800">{title.trim()}</p>
            )}
            {description?.trim() && (
              <p className="mt-1 text-sm text-gray-600">{description.trim()}</p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md sm:p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between transition-colors duration-200 ease-in-out">
                <dt className="text-gray-600">Component Cost</dt>
                <dd className="font-medium text-gray-900">{componentCost.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between transition-colors duration-200 ease-in-out">
                <dt className="text-gray-600">Shipping Fee</dt>
                <dd className="font-medium text-gray-900">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    {...form.register('shippingFee', { valueAsNumber: true, setValueAs: (v) => (v === '' || Number.isNaN(v) ? 0 : Number(v)) })}
                    className="w-20 rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-right text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </dd>
              </div>
              <div className="flex justify-between transition-colors duration-200 ease-in-out">
                <dt className="text-gray-600">Selling Price</dt>
                <dd className="font-medium text-gray-900">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    {...form.register('sellingPrice', { valueAsNumber: true, setValueAs: (v) => (v === '' || Number.isNaN(v) ? 0 : Number(v)) })}
                    className="w-20 rounded border border-gray-300 bg-[#f3f4f6] px-2 py-1 text-right text-gray-900 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </dd>
              </div>
              <div className="flex justify-between transition-colors duration-200 ease-in-out">
                <dt className="text-gray-600">Amazon Fee</dt>
                <dd className="font-medium text-gray-900">{amazonFeeAmount.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
