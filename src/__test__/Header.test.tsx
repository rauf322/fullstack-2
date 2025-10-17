import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'
import { fireEvent, render, screen } from '@testing-library/react'

test('check if header is correct', async () => {
  vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    useNavigate: () => vi.fn(),
  }))
  render(
    <AuthProvider>
      <Header />
    </AuthProvider>,
  )

  const links = screen.getAllByRole('link')
  const linkHrefs = links.map((link) => link.getAttribute('href'))
  const linkToRegister = screen.getByText('Register')
  expect(linkHrefs).toEqual(['/', '/', '/ideas', '/register', '/login'])
  expect(linkHrefs).toHaveLength(5)
  fireEvent.click(linkToRegister)
})

// TODO TRY TO MAKE MEMORYHISTORY
//
// test('clicking link change URL', async () => {
//   const history = createMemoryHistory({ initialEntries: ['/'] })
//   const rootRoute = createRootRoute({
//     component: () => (
//       <AuthProvider>
//         <Header />
//       </AuthProvider>
//     ),
//   })
//   const router = createRouter({
//     routeTree: rootRoute,
//     history,
//   })
//   render(<RouterProvider router={router} />)
//
//   const loginLink = screen.getByText('Login')
//   fireEvent.click(loginLink)
//   expect(history.location.pathname).toBe('/login')
// })
