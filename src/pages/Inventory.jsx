import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useTheme } from '../context/ThemeContext'
import { MainLayout } from '../components/MainLayout'
import { Search, Package } from 'lucide-react'

export function Inventory() {
  const [produce, setProduce] = useState([])
  const [filteredProduce, setFilteredProduce] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => {
    fetchProduce()
  }, [])

  useEffect(() => {
    const filtered = produce.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.batch_number.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProduce(filtered)
  }, [searchTerm, produce])

  const fetchProduce = async () => {
    try {
      setLoading(true)
      const { data } = await supabase.from('produce').select('*').order('date_received', { ascending: false })
      setProduce(data || [])
    } catch (error) {
      console.error('Error fetching produce:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout title="Inventory">
        <div className="flex items-center justify-center h-96">
          <div className="relative w-12 h-12">
            <div className={`absolute inset-0 border-4 rounded-full ${isDark ? 'border-gray-700' : 'border-gray-300'}`}></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout breadcrumb={['Inventory', 'All Batches']}>
      <div className="space-y-8">
        {/* Header & Search */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>Inventory</h1>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                {filteredProduce.length} batches • {filteredProduce.reduce((sum, p) => sum + p.quantity, 0)} kg total
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-50 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search batches or produce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-md text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 ${
                isDark
                  ? 'bg-gray-900/40 border-gray-700/40 text-gray-50 placeholder-gray-600'
                  : 'bg-white/40 border-white/60 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Table */}
        {filteredProduce.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/50'}`}>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Batch</th>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Name</th>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Qty</th>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Source</th>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>By</th>
                    <th className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProduce.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-b transition-colors last:border-0 group ${
                        isDark
                          ? 'border-gray-700/20 hover:bg-gray-800/40'
                          : 'border-gray-200/30 hover:bg-gray-100/50'
                      }`}
                    >
                      <td className={`px-6 py-4 text-sm font-mono rounded-lg group-hover:shadow-md ${isDark ? 'text-green-400' : 'text-green-700 bg-green-100/50'}`}>
                        {item.batch_number}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.name}</td>
                      <td className={`px-6 py-4 text-sm font-bold text-green-600`}>{item.quantity} kg</td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{item.source}</td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{item.received_by}</td>
                      <td className={`px-6 py-4 text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                        {new Date(item.date_received).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center shadow-sm">
            <div className="flex flex-col items-center gap-3">
              {searchTerm ? <Search size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} /> : <Package size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />}
              <p className={`text-lg font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {searchTerm ? 'No batches found' : 'No produce in inventory'}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
