import { queryOptions } from '@tanstack/react-query'
import { fetchIdeas } from './jsonFetch'

export const useQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas(),
  })
