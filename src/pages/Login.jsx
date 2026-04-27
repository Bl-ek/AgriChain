import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Leaf, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
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
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-white">AgriChain</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            {/* Logo */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-xl bg-green-600 dark:bg-green-700 mb-2.5 sm:mb-3 md:mb-4">
                <Leaf size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2.5 sm:mt-3 md:mt-4">AgriChain</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2">Agricultural Supply Chain Management</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 flex items-center gap-2">
                  <Mail size={14} className="sm:w-4 sm:h-4" /> Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 flex items-center gap-2">
                  <Lock size={14} className="sm:w-4 sm:h-4" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Contact your administrator for access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
