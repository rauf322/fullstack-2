import { createFileRoute } from '@tanstack/react-router'
import type { Idea } from '@/types/types'
import { fetchIdea } from '@/api/jsonFetch'

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetails,
  loader: async ({
    params,
  }: {
    params: Record<string, string>
  }): Promise<Idea> => {
    return fetchIdea(params.ideaId)
  },
})

function IdeaDetails() {
  const idea = Route.useLoaderData()
  console.log(idea)
  return <div className='bg-white min-h-screen'>Hello {idea.title}</div>
}
