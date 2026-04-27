import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { addBlock } from '../utils/blockchain'
import { MainLayout } from '../components/MainLayout'
import { Package, Scale, Leaf } from 'lucide-react'
import toast from 'react-hot-toast'

export function AddProduce() {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const generateBatchNumber = () => {
    const hex = Math.random().toString(16).substring(2, 10).toUpperCase()
    return `BATCH-${hex}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const batchNumber = generateBatchNumber()
      await supabase.from('produce').insert({
        batch_number: batchNumber,
        name,
        quantity: parseInt(quantity),
        source,
        received_by: user.email,
      })
      await addBlock(supabase, `PRODUCE_REGISTERED: ${batchNumber} | ${name} | ${quantity} | ${source}`)
      toast.success(`Batch ${batchNumber} created`)
      navigate('/inventory')
    } catch (error) {
      toast.error(error.message || 'Failed to add produce')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout breadcrumb={['Inventory', 'Add Produce']}>
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Register Produce</h1>
          <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 text-gray-600 dark:text-gray-400">Create a new batch and add it to your inventory</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                <Package size={14} className="sm:w-4 sm:h-4" /> Produce Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Tomatoes, Wheat, Corn..."
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                <Scale size={14} className="sm:w-4 sm:h-4" /> Quantity (kg)
              </label>
              <input
                type="number"
                required
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                <Leaf size={14} className="sm:w-4 sm:h-4" /> Source
              </label>
              <select
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">Select source</option>
                <option value="Farm">Farm</option>
                <option value="Supplier">Supplier</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating batch...' : 'Create Batch'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
