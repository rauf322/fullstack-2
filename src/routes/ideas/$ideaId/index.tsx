import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import IdeaCardDesc from '@/components/IdeaCardDesc'
import { useQueryIdea } from '@/api/useQueryHelper'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetails,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryIdea(params.ideaId))
  },
})

function IdeaDetails() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(useQueryIdea(ideaId))
  const { user } = useAuth()
  return (
    <div className='bg-stone-950 min-h-screen p-8'>
      <IdeaCardDesc idea={idea} user={user} />
    </div>
  )
}
