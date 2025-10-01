import { postUpdate } from '@/api/jsonFetch'
import type { Idea } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

const FormCreate = ({ idea }: { idea: Idea }) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState(() => idea.title)

  const { mutateAsync } = useMutation({
    mutationFn: postUpdate,
    onSuccess: () => {
      navigate({ to: '/ideas', replace: true })
    },
  })

  const [description, setDescription] = useState(() => idea.description)
  const [tags, setTags] = useState<Array<string>>(() => idea.tags)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const id = idea.id
    const createdAt = idea.createdAt
    await mutateAsync({ id, title, tags, description, createdAt})
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-semibold text-stone-300 mb-2'
        >
          Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors'
          placeholder='Enter your shop idea title'
        />
      </div>

      <div>
        <label
          htmlFor='description'
          className='block text-sm font-semibold text-stone-300 mb-2'
        >
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className='w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none'
          placeholder='Describe your idea in detail'
        />
      </div>

      <div>
        <label
          htmlFor='tags'
          className='block text-sm font-semibold text-stone-300 mb-2'
        >
          Tags
        </label>
        <input
          id='tags'
          type='text'
          value={tags.join(' ')}
          onChange={(e) => {
            const arrTags: Array<string> = e.target.value.split(' ')
            setTags(arrTags)
          }}
          className='w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors'
          placeholder='Enter tags separated by spaces'
        />
        <p className='text-stone-500 text-sm mt-2'>
          Separate tags with spaces (e.g., Technology E-commerce Creative)
        </p>
      </div>

      <button
        type='submit'
        className='w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors'
      >
        Confirmed
      </button>
    </form>
  )
}

export default FormCreate
