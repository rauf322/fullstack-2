import type { Idea } from '@/types'
import api from '@/lib/axios'

export async function fetchIdea(ideaId: string): Promise<Idea> {
  const res = await api.get(`ideas/${ideaId}`)
  return res.data
}

export async function fetchIdeas(_limit?: number): Promise<Array<Idea>> {
  const res = await api.get(`/ideas`, {
    params: _limit ? { _limit: _limit } : {},
  })
  return res.data
}

export async function postIdea(
  newIdea: Pick<Idea, 'title' | 'description' | 'tags'>,
): Promise<Idea> {
  const res = await api.post('/ideas', {
    ...newIdea,
  })
  return res.data
}

export async function postDelete(postId: string): Promise<void> {
  await api.delete(`/ideas/${postId}`)
}

export async function putIdeas(
  updatedData: Omit<Idea, 'user' | 'createdAt'>,
): Promise<Idea> {
  console.log(updatedData)
  const res = await api.put(`ideas/${updatedData._id}`, updatedData)
  return res.data
}

export async function postDeleteAll(): Promise<void> {
  await api.delete(`/ideas/`)
}
