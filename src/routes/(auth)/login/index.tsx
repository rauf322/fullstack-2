import { logInUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState(() => localStorage.getItem('email') ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { setAccessToken, setUser } = useAuth()

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logInUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      toast.success('Successfully login! Welcome again!')
      navigate({ to: '/ideas', replace: true })
    },
  })

  useEffect(() => {
    localStorage.setItem('email', email)
  }, [email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      const errorMsg = 'Please fill all the fields'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
      return
    }
    if (password.length < 6) {
      const errorMsg = 'Password must be at least 6 characters long'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
      return
    }
    try {
      await mutateAsync({
        email: email,
        password: password,
      })
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
    } finally {
      localStorage.setItem('name', '')
      localStorage.setItem('email', '')
    }
  }

  return (
    <div className="bg-stone-950 min-h-screen p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-3">
            Welcome Back
          </h1>
          <p className="text-stone-400 text-base sm:text-lg">
            Sign in to continue your journey
          </p>
        </div>
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            disabled={isPending}
          >
            Log in
          </button>

          <p className="text-stone-400 text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/register"
              className="text-amber-500 hover:text-amber-400"
            >
              Registration
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
