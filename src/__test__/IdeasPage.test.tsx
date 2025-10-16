import { AuthProvider } from '@/context/AuthContext'
import { Ideas } from '@/routes/ideas'
import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

vi.mock('@tanstack/react-query', () => ({
  useSuspenseQuery: vi.fn(() => ({
    data: [
      {
        _id: '1',
        title: 'Test Idea',
        user: 'user1',
        description: 'This is a test idea description.',
        tags: ['test', 'idea'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        _id: '2',
        title: 'Second Idea',
        user: 'user2',
        description: 'This is another test idea description.',
        tags: ['sample', 'idea'],
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
      },
    ],
  })),
}))

vi.mock('@/api/useQueryHelper', () => ({
  useQueryIdeas: () => ({}),
}))

const mockToken = {
  accessToken: 'fake-token',
  user: { id: '1', name: 'Test User', email: 'test@gmail.com' },
}

vi.mock('@/api/auth', () => ({
  refreshToken: () => mockToken,
}))

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => () => ({}),
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}))

vi.mock('@/components/IdeaCard', () => ({
  default: ({ idea }: any) => <div>{idea.title}</div>,
}))

vi.mock('@/components/Filter', () => ({
  default: () => <div>Filter</div>,
}))

test('render Ideas page', () => {
  const screen = render(
    <AuthProvider>
      <Ideas />
    </AuthProvider>,
  )
  const title = screen.getByText('Test Idea')
  expect(title.textContent).toBe('Test Idea')
  expect(title).toBeDefined()
})
