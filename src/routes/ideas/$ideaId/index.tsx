import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchIdea } from '@/api/jsonFetch'
import IdeaCardDesc from '@/components/IdeaCardDesc'

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  })

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetails,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  },
})

function IdeaDetails() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))
  return (
    <div className="bg-stone-950 min-h-screen p-8">
      <IdeaCardDesc idea={idea} />
    </div>
  )
}
