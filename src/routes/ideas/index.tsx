import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { Idea } from '@/types'
import IdeaCard from '@/components/IdeaCard'
import { useQueryOptions } from '@/api/useQueryHelper'
import Filter from '@/components/Filter'

export const Route = createFileRoute('/ideas/')({
  component: Ideas,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryOptions())
  },
})

function Ideas() {
  const { data: ideas } = useSuspenseQuery(useQueryOptions())
  const [filter, setFilter] = useState('All Categories')
  const filteredIdeas: Array<Idea> = ideas.filter((idea) => {
    if (filter === 'All Categories' || idea.tags.includes(filter)) {
      return idea
    }
  })
  return (
    <div className='bg-stone-950 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold text-white mb-8'>Shop Ideas</h1>
        <Filter ideas={ideas} setFilter={setFilter} />
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6'>
          {filteredIdeas
            .sort((a: Idea, b: Idea) => b.createdAt.localeCompare(a.createdAt))
            .map((idea) => (
              <IdeaCard idea={idea} />
            ))}
        </div>
      </div>
    </div>
  )
}
