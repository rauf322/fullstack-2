import { postUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const [name, setName] = useState(() => localStorage.getItem('name') ?? '')
  const [email, setEmail] = useState(() => localStorage.getItem('email') ?? '')
  const { setAccessToken, setUser } = useAuth()

  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      toast.success('Successfully registered! Welcome!')
      navigate({ to: '/ideas' })
    },
  })

  useEffect(() => {
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
  }, [name, email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !name) {
      const errorMsg = 'Please fill all the fields'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
      return
    }
    try {
      await mutateAsync({
        name: name,
        email: email,
        password: password,
      })
    } catch (err: any) {
      const errorMsg = err.message || 'Registration failed'
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
            Create Account
          </h1>
          <p className="text-stone-400 text-base sm:text-lg">
            Join us and start sharing your ideas
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
              htmlFor="name"
              className="block text-sm font-semibold text-stone-300 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Enter your name"
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>

          <p className="text-stone-400 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
