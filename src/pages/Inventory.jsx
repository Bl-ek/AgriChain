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
      <div className="space-y-6 sm:space-y-8">
        {/* Header & Search */}
        <div className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-3 sm:mb-6 gap-1.5">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Inventory</h1>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 dark:text-gray-400">
                {filteredProduce.length} batches • {filteredProduce.reduce((sum, p) => sum + p.quantity, 0)} kg total
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 opacity-50 text-gray-600 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search batches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm md:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Table */}
        {filteredProduce.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-x-auto shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Batch</th>
                    <th className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Name</th>
                    <th className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Qty</th>
                    <th className="hidden sm:table-cell px-3 md:px-6 py-2.5 sm:py-3 md:py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Source</th>
                    <th className="hidden md:table-cell px-6 py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">By</th>
                    <th className="hidden lg:table-cell px-6 py-4 text-left font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProduce.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-0">
                      <td className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 font-mono text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 truncate">
                        {item.batch_number}
                      </td>
                      <td className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 font-semibold text-gray-900 dark:text-white truncate">{item.name}</td>
                      <td className="px-2 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-4 font-bold text-green-600 whitespace-nowrap">{item.quantity} kg</td>
                      <td className="hidden sm:table-cell px-3 md:px-6 py-2.5 sm:py-3 md:py-4 text-gray-700 dark:text-gray-300 truncate">{item.source}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-gray-600 dark:text-gray-400 truncate">{item.received_by}</td>
                      <td className="hidden lg:table-cell px-6 py-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(item.date_received).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-8 sm:py-12 md:py-16 px-4 text-center shadow-sm">
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
              {searchTerm ? <Search size={24} className="sm:w-7 sm:h-7 text-gray-400 dark:text-gray-500" /> : <Package size={24} className="sm:w-7 sm:h-7 text-gray-400 dark:text-gray-500" />}
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400 dark:text-gray-500">
                {searchTerm ? 'No batches found' : 'No produce in inventory'}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
