import { useQueryIdea } from '@/api/useQueryHelper'
import FormEdit from '@/components/FormEdit'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideaId/edit/')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryIdea(params.ideaId))
  },
})

function RouteComponent() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(useQueryIdea(ideaId))
  console.log(idea)
  return (
    <div className='bg-stone-950 min-h-screen p-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-white mb-8'>
          Edit existing Idea
        </h1>
        <FormEdit idea={idea} />
      </div>
    </div>
  )
}
