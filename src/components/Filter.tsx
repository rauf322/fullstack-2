import type { Idea } from '@/types'

const Filter = ({
  ideas,
  setFilter,
}: {
  ideas: Array<Idea>
  setFilter: (value: string) => void
}) => {
  const myOptions = new Set([...ideas.flatMap((idea) => idea.tags)])
  return (
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
  )
}

export default Filter
