import type { Idea } from '@/types'

const IdeaCardDesc = ({ idea }: { idea: Idea }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-stone-800 rounded-lg shadow-md p-6 border border-stone-700">
        <h1 className="text-3xl font-bold text-white mb-4">{idea.title}</h1>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-400 uppercase mb-2">
            Description
          </h2>
          <p className="text-stone-300 leading-relaxed">{idea.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-400 uppercase mb-2">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-900 text-amber-200 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-stone-700 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-stone-400">ID:</span>
              <span className="ml-2 text-stone-300">{idea.id}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-400">Created:</span>
              <span className="ml-2 text-stone-300">
                {new Date(idea.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaCardDesc
