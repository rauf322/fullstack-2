import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-stone-900 text-white shadow-xl border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-amber-500 transition-colors"
            >
              Shop Ideas
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-stone-400 hover:text-white transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/ideas"
                className="text-stone-400 hover:text-white transition-colors font-medium"
              >
                Ideas
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
