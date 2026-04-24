import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function ProtectedRoute({ children, fallback }) {
  const { user, loading } = useAuth()
  const { isDark } = useTheme()

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
            : 'bg-gradient-to-br from-gray-50 via-blue-50 to-white'
        }`}
      >
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className={`absolute inset-0 border-4 rounded-full ${isDark ? 'border-gray-700' : 'border-gray-300'}`}></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
          </div>
          <p className={`text-base font-medium ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return fallback ? fallback : <Navigate to="/login" replace />
  }

  return children
}
