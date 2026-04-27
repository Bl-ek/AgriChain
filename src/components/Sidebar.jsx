import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Leaf, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'

export function Sidebar() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
      toast.success('Logged out')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/add-produce', label: 'Add Produce' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/dispatch', label: 'Dispatch' },
    { path: '/reports', label: 'Reports' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf size={20} className="sm:w-6 sm:h-6 text-green-600" />
            <span className="text-base sm:text-lg md:text-xl font-bold text-white">AgriChain</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs lg:text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-green-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {user && (
              <>
                <span className="text-xs lg:text-sm text-gray-400 hidden lg:inline truncate">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs lg:text-sm font-medium transition-all"
                >
                  <LogOut size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-1 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <div className="border-t border-gray-700 pt-1.5 mt-1.5 space-y-1">
                <div className="px-3 py-2 text-xs text-gray-400 truncate">{user.email}</div>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-medium transition-all"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
