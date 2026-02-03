import { useQuery } from '@tanstack/react-query'
import { fetchSkuList } from '@/services'
import type { ListQueryParams } from '@/types'

export function useSkuList(params: ListQueryParams) {
  return useQuery({
    queryKey: ['skus', params.page, params.pageSize, params.search],
    queryFn: () => fetchSkuList(params),
  })
}
