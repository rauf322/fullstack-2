import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Lightbulb } from 'lucide-react'
import type { Idea } from '@/types'
import IdeaCard from '@/components/IdeaCard'
import { useQueryIdeas } from '@/api/useQueryHelper'
import Filter from '@/components/Filter'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/ideas/')({
  component: Ideas,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryIdeas())
  },
})

export function Ideas() {
  const { data: ideas } = useSuspenseQuery(useQueryIdeas())
  const [filter, setFilter] = useState('All Categories')

  const { user } = useAuth()
  const filteredIdeas: Array<Idea> = ideas.filter((idea: Idea) => {
    if (filter === 'All Categories' || idea.tags.includes(filter)) {
      return idea
    }
  })
  return (
    <div className='bg-stone-950 min-h-screen p-4 sm:p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3'>
          <Lightbulb className='text-amber-500' size={36} strokeWidth={2.5} />
          Shop Ideas
        </h1>
        <Filter ideas={ideas} setFilter={setFilter} />
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6'>
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}
