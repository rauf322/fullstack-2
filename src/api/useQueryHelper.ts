import { fetchIdea, fetchIdeas } from '@/api/jsonFetch'
import { queryOptions } from '@tanstack/react-query'

export const useQueryIdeas = (_limit?: number) =>
  queryOptions({
    queryKey: ['ideas', { limit: _limit }],
    queryFn: () => fetchIdeas(_limit),
  })

export const useQueryIdea = (id: string) =>
  queryOptions({
    queryKey: ['ideas', id],
    queryFn: () => fetchIdea(id),
  })
