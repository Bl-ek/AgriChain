import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Leaf, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with theme toggle */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf size={20} className="text-green-600 sm:w-6 sm:h-6" />
          <span className="text-lg sm:text-xl font-bold text-white">AgriChain</span>
        </div>
        <button
          onClick={toggle}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-0">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-green-600 mb-3 sm:mb-4">
                <Leaf size={24} className="text-white sm:w-7 sm:h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 sm:mt-4">AgriChain</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">Agricultural Supply Chain Management</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail size={14} className="sm:w-4 sm:h-4" /> Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock size={14} className="sm:w-4 sm:h-4" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
              Contact your administrator for access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
