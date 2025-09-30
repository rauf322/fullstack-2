import { Link } from '@tanstack/react-router'
import type { Idea } from '@/types'
import { postDelete } from '@/api/jsonFetch'
import { useMutation } from '@tanstack/react-query'

type IdeaCardProps = {
  idea: Idea
  onDeleteSuccess?: () => void
}

const IdeaCard = ({ idea, onDeleteSuccess }: IdeaCardProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: postDelete,
    onSuccess: () => {
      onDeleteSuccess?.()
    },
  })
  async function handleDelete(id: number) {
    try {
      await mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="relative bg-stone-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-stone-700 group">
      <Link
        to="/ideas/$ideaId"
        params={{ ideaId: idea.id.toString() }}
        className="block p-6 hover:bg-stone-750"
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
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleDelete(idea.id)
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded transition-all duration-200"
      >
        Delete
      </button>
    </div>
  )
}

export default IdeaCard
