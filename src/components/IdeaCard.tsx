import { Link } from '@tanstack/react-router'
import type { Idea } from '@/types'

const IdeaCard = ({ idea }: { idea: Idea }) => {
  return (
    <Link
      key={idea.id}
      to="/ideas/$ideaId"
      params={{ ideaId: idea.id.toString() }}
      className="bg-stone-800 rounded-lg shadow-md p-6 hover:shadow-xl hover:bg-stone-750 transition-all duration-200 border border-stone-700"
    >
      <h2 className="text-xl font-semibold text-white mb-3">{idea.title}</h2>
      <p className="text-stone-400 text-sm mb-4 line-clamp-3">
        {idea.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {idea.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-amber-900 text-amber-200 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {idea.tags.length > 3 && (
          <span className="text-stone-500 text-xs px-2 py-1">
            +{idea.tags.length - 3} more
          </span>
        )}
      </div>
      <div className="text-xs text-stone-500">
        {new Date(idea.createdAt).toLocaleDateString()}
      </div>
    </Link>
  )
}

export default IdeaCard
