import { logoutUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Lightbulb } from 'lucide-react'

export default function Header() {
  const { accessToken, user, setAccessToken, setUser } = useAuth()
  const navigate = useNavigate()
  async function handleLogout() {
    setAccessToken(null)
    setUser(null)
    await logoutUser()
    toast.success('Logged out successfully')
    navigate({ to: '/', replace: true })
  }
  return (
    <header className='bg-stone-900 text-white shadow-xl border-b border-stone-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
        <nav className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex items-center gap-4 sm:gap-8'>
            <Link
              to='/'
              className='text-xl sm:text-2xl font-bold hover:text-amber-500 transition-colors'
            >
              <Lightbulb
                className='text-amber-500'
                size={28}
                strokeWidth={2.5}
              />
            </Link>
            <div className='flex gap-6'>
              <Link
                to='/'
                className='text-stone-400 hover:text-white transition-colors font-medium hidden sm:inline'
              >
                Home
              </Link>
              <Link
                to='/ideas'
                className='text-stone-400 hover:text-white transition-colors font-medium hidden sm:inline'
              >
                Ideas
              </Link>
              {user && (
                <Link
                  to='/new'
                  className='text-stone-400 hover:text-white transition-colors font-medium'
                >
                  New Idea
                </Link>
              )}
            </div>
          </div>
          {!accessToken && !user ? (
            <div className='flex gap-2 sm:gap-4 border border-stone-700 rounded-lg px-3 sm:px-4 py-2'>
              <Link
                to='/register'
                className='text-stone-400 hover:text-white transition-colors font-medium text-sm sm:text-base'
              >
                Register
              </Link>
              <Link
                to='/login'
                className='text-stone-400 hover:text-white transition-colors font-medium text-sm sm:text-base'
              >
                Login
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-2 sm:gap-4 border border-stone-700 rounded-lg px-3 sm:px-4 py-2'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm'>
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className='text-white font-semibold hidden sm:inline'>
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className='text-stone-400 hover:text-red-400 transition-colors font-medium text-sm sm:text-base'
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
