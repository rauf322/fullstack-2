import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Filter from '@/components/Filter'
import type { Idea } from '@/types'

test('check filter renders all unique tags', async () => {
  const queryClient = new QueryClient()
  const setFilterMock = vi.fn()

  const fakeIdeas: Array<Idea> = [
    {
      _id: '1',
      title: 'E-commerce Platform',
      user: 'user1',
      description: 'Online shopping platform',
      tags: ['tech', 'business'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      _id: '2',
      title: 'Food Delivery App',
      user: 'user2',
      description: 'Quick food delivery service',
      tags: ['business', 'mobile'],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
    {
      _id: '3',
      title: 'AI Chatbot',
      user: 'user3',
      description: 'Intelligent customer support',
      tags: ['tech', 'ai'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03',
    },
  ]

  render(
    <QueryClientProvider client={queryClient}>
      <Filter ideas={fakeIdeas} setFilter={setFilterMock} />
    </QueryClientProvider>,
  )

  const select = screen.getByRole('combobox')
  expect(select).toBeDefined()

  expect(screen.getByText('ai')).toBeDefined()
  expect(screen.getByText('business')).toBeDefined()
  expect(screen.getByText('mobile')).toBeDefined()
  expect(screen.getByText('tech')).toBeDefined()

  fireEvent.change(select, { target: { value: 'tech' } })
  expect((select as HTMLSelectElement).value).toBe('tech')
  fireEvent.change(select, { target: { value: 'All Categories' } })
  expect((select as HTMLSelectElement).value).toBe('All Categories')
})
