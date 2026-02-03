import { useState, useCallback } from 'react'
import { APP_CONFIG } from '@/config/app.config'

export interface UsePaginationResult {
  page: number
  pageSize: number
  setPage: (p: number) => void
  setPageSize: (s: number) => void
  totalPages: number
  setTotalPages: (n: number) => void
  nextPage: () => void
  prevPage: () => void
  canNext: boolean
  canPrev: boolean
}

export function usePagination(initialPageSize = APP_CONFIG.defaultPageSize): UsePaginationResult {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState<number>(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)

  const setPageSize = useCallback((s: number) => {
    setPageSizeState(Math.min(Math.max(1, s), APP_CONFIG.maxPageSize))
    setPage(1)
  }, [])

  const nextPage = useCallback(() => setPage((p) => Math.min(p + 1, totalPages)), [totalPages])
  const prevPage = useCallback(() => setPage((p) => Math.max(p - 1, 1)), [])

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    totalPages,
    setTotalPages,
    nextPage,
    prevPage,
    canNext: page < totalPages,
    canPrev: page > 1,
  }
}
