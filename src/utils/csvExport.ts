/**
 * Mock CSV export for SKU list.
 * In production, this could call an API endpoint that returns a file.
 */
export function exportSkuListToCsv(rows: Array<Record<string, unknown>>, filename = 'skus.csv'): void {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0]!)
  const line = (obj: Record<string, unknown>) =>
    headers.map((h) => {
      const v = obj[h]
      const s = v == null ? '' : String(v)
      return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s
    }).join(',')
  const csv = [headers.join(','), ...rows.map((r) => line(r))].join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
