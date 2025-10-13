import { fetchIdea, fetchIdeas } from '@/api/jsonFetch'
import { queryOptions } from '@tanstack/react-query'

export const useQueryIdeas = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas(),
  })

export const useQueryIdea = (id: string) =>
  queryOptions({
    queryKey: ['ideas', id],
    queryFn: () => fetchIdea(id),
  })
