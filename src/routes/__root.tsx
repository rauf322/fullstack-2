import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanstackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share with your start ups ideas',
      },
      {
        title: 'Idea Shop',
      },
    ],
  }),
  component: () => (
    <div>
      <Toaster />
      <Header />
      <HeadContent />
      <Outlet />
      {import.meta.env.DEV && <TanstackDevtools />}
    </div>
  ),
  notFoundComponent: () => (
    <div className='min-h-screen bg-stone-950 flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-white mb-4'>404</h1>
        <p className='text-2xl text-stone-400 mb-8'>Page Not Found</p>
        <a
          href='/'
          className='bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block'
        >
          Go Home
        </a>
      </div>
    </div>
  ),
})
