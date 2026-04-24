export function StatCard({ title, value, unit = '', icon: Icon = null, variant = 'default' }) {
  const variants = {
    default: 'from-blue-50 to-blue-100/50 border-l-4 border-blue-600',
    success: 'from-green-50 to-emerald-100/50 border-l-4 border-green-600',
    warning: 'from-orange-50 to-yellow-100/50 border-l-4 border-orange-600',
    danger: 'from-red-50 to-pink-100/50 border-l-4 border-red-600',
  }

  return (
    <div className={`bg-gradient-to-br ${variants[variant]} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">
            {value}
            {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
          </p>
        </div>
        <div className="text-5xl opacity-20">{Icon || '📊'}</div>
      </div>
    </div>
  )
}
