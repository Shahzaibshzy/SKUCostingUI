import { useQuery } from '@tanstack/react-query'
import { fetchSkuById } from '@/services'

export function useSkuDetail(id: string | null) {
  return useQuery({
    queryKey: ['sku', id],
    queryFn: () => (id ? fetchSkuById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
  })
}
