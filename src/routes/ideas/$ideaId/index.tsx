import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import IdeaCardDesc from '@/components/IdeaCardDesc'
import { useQueryIdea } from '@/api/useQueryHelper'

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetails,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryIdea(params.ideaId))
  },
})

function IdeaDetails() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(useQueryIdea(ideaId))
  return (
    <div className='bg-stone-950 min-h-screen p-8'>
      <IdeaCardDesc idea={idea} />
    </div>
  )
}
