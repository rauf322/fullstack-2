import { fireEvent, render, waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FormCreate from '@/components/FormCreate'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/api/jsonFetch', () => ({
  postIdea: vi.fn().mockResolvedValue({ success: true }),
}))

const queryClient = new QueryClient()

test('test FormCreate', async () => {
  const title = 'My title'
  const description = 'My description'
  const tags = ['test', 'idea']
  const { postIdea } = await import('@/api/jsonFetch')

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <FormCreate />
    </QueryClientProvider>,
  )
  const titleId = screen.getByTestId('input-title') as HTMLInputElement
  const descriptionId = screen.getByTestId(
    'input-textarea',
  ) as HTMLTextAreaElement
  const tagsId = screen.getByTestId('input-tags') as HTMLSelectElement
  fireEvent.change(tagsId, { target: { value: tags.join(',') } })
  fireEvent.change(titleId, { target: { value: title } })
  fireEvent.change(descriptionId, { target: { value: description } })
  expect(titleId.value).toBe(title)
  expect(descriptionId.value).toBe(description)
  expect(tagsId.value).toBe(tags.join(','))

  const submitButton = screen.getByText('Create Idea')
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(postIdea).toHaveBeenCalledTimes(1)
    const callArgs = (postIdea as any).mock.calls[0]
    expect(callArgs[0]).toEqual({
      title: title,
      description: description,
      tags: tags,
    })
  })
})
