import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRight, Leaf, BarChart3, Lock, Zap, Shield, Users } from 'lucide-react'

export function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 dark:bg-gray-950 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf size={20} className="sm:w-6 sm:h-6 text-green-600" />
            <span className="text-lg sm:text-xl font-bold text-white dark:text-white">AgriChain</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <button
                onClick={() => navigate('/')}
                className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-all"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-18 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            Agricultural Supply Chain <span className="text-green-600">Made Simple</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            Real-time tracking, blockchain verification, and intelligent inventory management for modern farms and suppliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-all flex items-center justify-center sm:justify-start gap-2"
              >
                Get Started <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 mb-12 sm:mb-18 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { label: 'Real-time Tracking', value: '24/7' },
            { label: 'Uptime Guarantee', value: '99.9%' },
            { label: 'Data Secure', value: 'AES-256' },
          ].map((stat, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 md:p-8 text-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-18 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-gray-900 dark:text-white">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              icon: BarChart3,
              title: 'Real-time Dashboard',
              desc: 'Monitor stock levels, dispatches, and alerts instantly with live updates',
            },
            {
              icon: Shield,
              title: 'Blockchain Audit Trail',
              desc: 'Immutable record of every transaction for complete transparency',
            },
            {
              icon: Lock,
              title: 'Secure & Encrypted',
              desc: 'Enterprise-grade security with AES-256 encryption and RLS policies',
            },
            {
              icon: Zap,
              title: 'Instant Dispatch',
              desc: 'Quick and efficient produce dispatch with automatic inventory updates',
            },
            {
              icon: BarChart3,
              title: 'Detailed Reports',
              desc: 'Comprehensive analytics on stock, transactions, and blockchain integrity',
            },
            {
              icon: Users,
              title: 'Multi-user Support',
              desc: 'Collaborate with teams with role-based access control',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                <Icon size={28} className="sm:w-8 sm:h-8 text-green-600 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-18 md:py-24 mb-12 sm:mb-18 md:mb-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-gray-900 dark:text-white">Built on Modern Tech</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { name: 'React 18', desc: 'Modern UI library' },
            { name: 'Tailwind CSS', desc: 'Utility-first styling' },
            { name: 'Supabase', desc: 'PostgreSQL backend' },
            { name: 'Blockchain', desc: 'Custom SHA-256' },
          ].map((tech, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 md:p-6 text-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="font-bold text-base sm:text-lg text-green-600">{tech.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-18 md:py-24">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-10 md:p-16 text-center bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Ready to Transform Your Supply Chain?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-gray-600 dark:text-gray-300">Start managing your agricultural supply chain with intelligence and transparency.</p>
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="px-6 sm:px-8 py-2.5 sm:py-4 bg-green-600 text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-green-700 transition-all inline-flex items-center justify-center gap-2"
            >
              Get Started Today <ArrowRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-18 md:mt-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">© 2026 AgriChain. Built with precision for agricultural excellence.</p>
        </div>
      </footer>
    </div>
  )
}
