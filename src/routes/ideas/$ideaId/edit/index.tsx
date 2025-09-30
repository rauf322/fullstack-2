import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideaId/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>He</div>
}
