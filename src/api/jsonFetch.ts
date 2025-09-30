import type { Idea } from '@/types/types'

export async function fetchIdea(idea: string): Promise<Idea> {
  const res = await fetch(`/api/ideas/${idea}`)
  if (!res.ok) throw new Error('idea is not fetched')
  const data = await res.json()
  return data
}

export async function fetchIdeas(): Promise<Array<Idea>> {
  const res = await fetch(`/api/ideas`)
  if (!res.ok) throw new Error('idea is not fetched')
  const data = await res.json()
  return data
}
