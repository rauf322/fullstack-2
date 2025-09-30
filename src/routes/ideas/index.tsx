import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({
  component: Ideas,
})

function Ideas() {
  return <div className='bg-white min-h-screen'>Hello "/ideas/"!</div>
}
