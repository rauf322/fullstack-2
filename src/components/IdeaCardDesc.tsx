import { postDelete } from '@/api/jsonFetch'
import type { Idea } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'

const IdeaCardDesc = ({ idea }: { idea: Idea }) => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: postDelete,
    onSuccess: () => {
      navigate({ to: '/ideas', replace: true })
    },
  })

  async function handleDelete(id: string) {
    try {
      await mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='bg-stone-800 rounded-lg shadow-md p-6 border border-stone-700'>
        <h1 className='text-3xl font-bold text-white mb-4'>{idea.title}</h1>

        <div className='mb-6'>
          <h2 className='text-sm font-semibold text-stone-400 uppercase mb-2'>
            Description
          </h2>
          <p className='text-stone-300 leading-relaxed'>{idea.description}</p>
        </div>

        <div className='mb-6'>
          <h2 className='text-sm font-semibold text-stone-400 uppercase mb-2'>
            Tags
          </h2>
          <div className='flex flex-wrap gap-2'>
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className='bg-amber-900 text-amber-200 text-sm px-3 py-1 rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className='border-t border-stone-700 pt-4 mt-4'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-semibold text-stone-400'>ID:</span>
              <span className='ml-2 text-stone-300'>{idea._id}</span>
            </div>
            <div>
              <span className='font-semibold text-stone-400'>Created:</span>
              <span className='ml-2 text-stone-300'>
                {new Date(idea.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-3 mt-6'>
          <Link
            to='/ideas/$ideaId/edit'
            params={{ ideaId: idea._id.toString() }}
            className='bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-200'
          >
            Edit Idea
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(idea._id)
            }}
            className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default IdeaCardDesc
