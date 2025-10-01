import type { Idea } from '@/types'
import api from '@/lib/axios'

export async function fetchIdea(ideaId: number): Promise<Idea> {
  const res = await api.get(`ideas/${ideaId}`)
  return res.data
}

export async function fetchIdeas(): Promise<Array<Idea>> {
  const res = await api.get(`/ideas`)
  return res.data
}

export async function postIdea(
  newIdea: Omit<Idea, 'createdAt' | 'id'>,
): Promise<Idea> {
  const res = await api.post('/ideas', {
    ...newIdea,
    createdAt: new Date().toISOString(),
  })
  return res.data
}

export async function postDelete(postId: number): Promise<void> {
  await api.delete(`/ideas/${postId}`)
}

export async function postUpdate(updatedData: Idea): Promise<Idea> {
  const res = await api.put(`ideas/${updatedData.id}`, updatedData)
  return res.data
}
