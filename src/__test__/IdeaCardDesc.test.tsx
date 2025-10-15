import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import IdeasCardDesc from '@/components/IdeaCardDesc'
import type { Idea, UserCredentials } from '@/types'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  useNavigate: () => vi.fn(),
}))

const queryClient = new QueryClient()
test('check render Idea Card Desc', async () => {
  const idea: Idea = {
    _id: '1',
    title: 'Test Idea',
    user: 'User',
    description: 'This is a test idea description.',
    tags: ['test', 'idea'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  }
  const user: UserCredentials = {
    email: 'email@gmail.com',
    id: '1',
    name: 'test',
  }

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <IdeasCardDesc idea={idea} user={user} />
    </QueryClientProvider>,
  )

  const ideaTitle = screen.getByTestId('idea-title')
  expect(ideaTitle.textContent).toBe(idea.title)
})
