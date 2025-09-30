import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { postIdea } from '@/api/jsonFetch'

export const Route = createFileRoute('/new/')({
  component: RouteComponent,
})
function getFromLocal(item: string): string | Array<string> {
  const temp = localStorage.getItem(item)
  if (temp) {
    return JSON.parse(temp)
  } else {
    return item == 'tags' ? [] : ''
  }
}

function RouteComponent() {
  const navigate = useNavigate()

  const [title, setTitle] = useState(() => getFromLocal('title') as string)

  const [description, setDescription] = useState(
    () => getFromLocal('description') as string,
  )
  const [tags, setTags] = useState<Array<string>>(
    () => getFromLocal('tags') as Array<string>,
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postIdea,
    onSuccess: () => {
      navigate({ to: '/ideas' })
    },
  })

  useEffect(() => {
    localStorage.setItem('title', JSON.stringify(title))
    localStorage.setItem('description', JSON.stringify(description))
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [title, description, tags])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (title && description && (tags.length > 1 || tags[0].length > 0)) {
      try {
        await mutateAsync({
          title,
          description,
          tags,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.message('Please fill all the fields')
    }
  }

  return (
    <div className="bg-stone-950 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Create New Idea</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter your shop idea title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
              placeholder="Describe your idea in detail"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags.join(' ')}
              onChange={(e) => {
                const arrTags: Array<string> = e.target.value.split(' ')
                setTags(arrTags)
              }}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter tags separated by spaces"
            />
            <p className="text-stone-500 text-sm mt-2">
              Separate tags with spaces (e.g., Technology E-commerce Creative)
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending ? true : false}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Create Idea
          </button>
        </form>
      </div>
    </div>
  )
}
