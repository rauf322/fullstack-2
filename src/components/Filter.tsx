import { postDeleteAll } from '@/api/jsonFetch'
import type { Idea } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Filter = ({
  ideas,
  setFilter,
}: {
  ideas: Array<Idea>
  setFilter: (value: string) => void
}) => {
  const myOptions = new Set([...ideas.flatMap((idea) => idea.tags)])
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: postDeleteAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] })
    },
  })

  async function handleDeleteAll() {
    try {
      await mutateAsync()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-between items-center'>
      <select
        onChange={(e) => setFilter(e.target.value)}
        className='bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-2 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors cursor-pointer'
      >
        <option value='All Categories'>All Categories</option>
        {Array.from(myOptions)
          .sort()
          .map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      <button
        onClick={handleDeleteAll}
        className='bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors font-semibold'
      >
        Delete All
      </button>
    </div>
  )
}

export default Filter
