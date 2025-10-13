import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { Idea } from '@/types'
import { useQueryIdeas } from '@/api/useQueryHelper'
import IdeaCard from '@/components/IdeaCard'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(useQueryIdeas())
  },
})

function HomePage() {
  const { data: ideas } = useSuspenseQuery(useQueryIdeas(3))
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Welcome to Shop Ideas
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-stone-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Discover, create, and share innovative shop ideas. Transform your
            entrepreneurial vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              to="/ideas"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-center"
            >
              Browse Ideas
            </Link>
            {user && (
              <Link
                to="/new"
                className="bg-stone-800 hover:bg-stone-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-stone-700 text-center"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
        {ideas.length > 0 && (
          <div className="mt-12 sm:mt-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Latest Ideas
              </h2>
              <Link
                to="/ideas"
                className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea: Idea) => (
                <IdeaCard key={idea._id} idea={idea} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
