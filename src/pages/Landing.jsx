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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf size={24} className="text-green-600" />
            <span className="text-xl font-bold text-white dark:text-white">AgriChain</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Agricultural Supply Chain <span className="text-green-600">Made Simple</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Real-time tracking, blockchain verification, and intelligent inventory management for modern farms and suppliers.
          </p>
          <div className="flex gap-4 justify-center">
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
            )}
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12 mb-24">
        <div className="grid grid-cols-3 gap-8">
          {[
            { label: 'Real-time Tracking', value: '24/7' },
            { label: 'Uptime Guarantee', value: '99.9%' },
            { label: 'Data Secure', value: 'AES-256' },
          ].map((stat, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                <Icon size={32} className="text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-6 py-24 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Built on Modern Tech</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React 18', desc: 'Modern UI library' },
            { name: 'Tailwind CSS', desc: 'Utility-first styling' },
            { name: 'Supabase', desc: 'PostgreSQL backend' },
            { name: 'Blockchain', desc: 'Custom SHA-256' },
          ].map((tech, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
              <p className="font-bold text-lg text-green-600">{tech.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-16 text-center bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Transform Your Supply Chain?</h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">Start managing your agricultural supply chain with intelligence and transparency.</p>
          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-all inline-flex items-center gap-2"
            >
              Get Started Today <ArrowRight size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">© 2026 AgriChain. Built with precision for agricultural excellence.</p>
        </div>
      </footer>
    </div>
  )
}
