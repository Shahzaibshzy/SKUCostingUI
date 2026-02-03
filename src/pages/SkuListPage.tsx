import { useState, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSkuList } from '@/hooks/useSkuList'
import { usePagination } from '@/hooks/usePagination'
import { Button, Badge } from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { APP_CONFIG } from '@/config/app.config'
import { exportSkuListToCsv } from '@/utils/csvExport'
import type { SkuListItem } from '@/types'
import { formatCurrency } from '@/utils/calculations'

export function SkuListPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [search, setSearch] = useState('')
  const pagination = usePagination(APP_CONFIG.defaultPageSize)

  const listParams = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search: search || undefined,
    }),
    [pagination.page, pagination.pageSize, search]
  )

  const { data, isLoading, isError } = useSkuList(listParams)

  useEffect(() => {
    if (data) {
      pagination.setTotalPages(data.totalPages)
    }
  }, [data?.totalPages])

  const handleDownload = () => {
    if (!data?.data) {
      toast.error('No data to download.')
      return
    }
    const rows = data.data.map((s: SkuListItem) => ({
      skuCode: s.skuCode,
      asin: s.asin,
      active: s.active,
      fulfilledBy: s.fulfilledBy,
      condition: s.condition,
      title: s.title,
      qty: s.qty,
      totalCost: s.totalCost,
      shippingFee: s.shippingFee,
      sellingPrice: s.sellingPrice,
    }))
    exportSkuListToCsv(rows, 'skus.csv')
    toast.success('SKU list downloaded.')
  }

  const handleRowClick = (id: string) => {
    navigate(`/skus/${id}`)
  }

  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-bold text-gray-900 transition-all duration-300 ease-in-out sm:mb-6 sm:text-2xl">
        SKUs
      </h1>

      <div className="mb-4 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <div className="relative w-full min-w-0 flex-1 sm:max-w-md">
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              pagination.setPage(1)
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-gray-900 placeholder:text-gray-500 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
            🔍
          </span>
        </div>
        <Link to="/skus/new" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">
            + Add New
          </Button>
        </Link>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="w-full shrink-0 sm:w-auto"
        >
          <span aria-hidden>↓</span>
          Download
        </Button>
      </div>

      <div className="mb-2 flex justify-end text-sm text-gray-600 transition-opacity duration-200 ease-in-out">
        Total matching records: {data?.total ?? 0}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md">
        {isLoading && (
          <div className="animate-in-fade p-8 text-center text-gray-500">Loading...</div>
        )}
        {isError && (
          <div className="animate-in-fade p-8 text-center text-red-600">Failed to load SKUs.</div>
        )}
        {data && !isLoading && (
          <>
            <div className="overflow-x-auto overscroll-x-contain scroll-smooth">
              <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#3b82f6] text-white">
                    <th className="px-3 py-3 font-medium sm:px-4">#</th>
                    <th className="px-3 py-3 font-medium sm:px-4">SKU Code</th>
                    <th className="px-3 py-3 font-medium sm:px-4">ASIN</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Active</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Fulfilled By</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Edit Amazon / $</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Condition</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Title</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Qty</th>
                    <th className="px-3 py-3 font-medium sm:px-4">New Qty</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Status</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Main Image</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Total Cost</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Shipping Fee</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Selling Price</th>
                    <th className="px-3 py-3 font-medium sm:px-4">New Price</th>
                    <th className="px-3 py-3 font-medium sm:px-4">Statu</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((row, idx) => (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                      className={`cursor-pointer border-b border-gray-100 transition-all duration-200 ease-in-out hover:bg-blue-50/80 active:bg-blue-100/80 ${
                        idx % 2 === 0 ? 'bg-[#dcfce7]' : 'bg-[#ffedd5]'
                      }`}
                    >
                      <td className="px-3 py-2.5 sm:px-4">{(pagination.page - 1) * pagination.pageSize + idx + 1}</td>
                      <td className="px-3 py-2.5 font-medium sm:px-4">{row.skuCode}</td>
                      <td className="px-3 py-2.5 sm:px-4">{row.asin}</td>
                      <td className="px-3 py-2.5 sm:px-4">
                        <Badge status={row.active} />
                      </td>
                      <td className="px-3 py-2.5 sm:px-4">{row.fulfilledBy}</td>
                      <td className="px-3 py-2.5 sm:px-4">
                        <button type="button" className="mr-1 rounded bg-blue-500 p-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 active:scale-95" title="Amazon">a</button>
                        <button type="button" className="rounded bg-blue-500 p-1.5 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 active:scale-95" title="Price">$</button>
                      </td>
                      <td className="px-3 py-2.5 sm:px-4">{row.condition}</td>
                      <td className="max-w-[140px] truncate px-3 py-2.5 sm:max-w-[180px] sm:px-4" title={row.title}>{row.title}</td>
                      <td className="px-3 py-2.5 sm:px-4">
                        <span className="inline-flex items-center gap-1">
                          {row.qty}
                          <span className="cursor-pointer text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700" title="Edit">✎</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5 sm:px-4"></td>
                      <td className="px-3 py-2.5 sm:px-4"></td>
                      <td className="px-3 py-2.5 sm:px-4">
                        {row.mainImageUrl ? (
                          <img src={row.mainImageUrl} alt="" className="h-10 w-10 rounded border border-gray-200 object-cover transition-transform duration-200 ease-in-out group-hover:scale-105" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 sm:px-4">{formatCurrency(row.totalCost)}</td>
                      <td className="px-3 py-2.5 sm:px-4">{formatCurrency(row.shippingFee)}</td>
                      <td className="px-3 py-2.5 sm:px-4">
                        <span className="inline-flex items-center gap-1">
                          {formatCurrency(row.sellingPrice)}
                          <span className="cursor-pointer text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700" title="Edit">✎</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5 sm:px-4"></td>
                      <td className="px-3 py-2.5 sm:px-4"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-200 ease-in-out sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={pagination.prevPage} disabled={!pagination.canPrev} className="flex-1 sm:flex-none">
                  Previous
                </Button>
                <Button variant="secondary" onClick={pagination.nextPage} disabled={!pagination.canNext} className="flex-1 sm:flex-none">
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
