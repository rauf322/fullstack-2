import { createFileRoute } from '@tanstack/react-router'
import FormCreate from '@/components/FormCreate'

export const Route = createFileRoute('/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-stone-950 min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
          Create New Idea
        </h1>
        <FormCreate />
      </div>
    </div>
  )
}
