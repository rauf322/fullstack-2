import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { Idea } from '@/types'
import { useQueryOptions } from '@/api/useQueryHelper'
import IdeaCard from '@/components/IdeaCard'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryOptions())
  },
})

function HomePage() {
  const { data: threeIdeas } = useSuspenseQuery(useQueryOptions())
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to Shop Ideas
          </h1>
          <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto">
            Discover, create, and share innovative shop ideas. Transform your
            entrepreneurial vision into reality.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/ideas"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Browse Ideas
            </Link>
            <Link to="/new">
              <button className="bg-stone-800 hover:bg-stone-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-stone-700">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        {threeIdeas.length > 1 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Latest Ideas</h2>
              <Link
                to="/ideas"
                className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {threeIdeas
                .sort((a: Idea, b: Idea) =>
                  b.createdAt.localeCompare(a.createdAt),
                )
                .slice(0, 3)
                .map((idea) => (
                  <IdeaCard idea={idea} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
