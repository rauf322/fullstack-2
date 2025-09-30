import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanstackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'

export const Route = createRootRoute({
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
      <Header />
      <HeadContent />
      <Outlet />
      <TanstackDevtools />
    </div>
  ),
})
