import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useTheme } from '../context/ThemeContext'
import { MainLayout } from '../components/MainLayout'
import { Package, Scale, ArrowDownRight, ArrowUpRight, Link as LinkIcon, FileText, Clock, CheckCircle, XCircle } from 'lucide-react'

export function Reports() {
  const [stockSummary, setStockSummary] = useState([])
  const [transactionHistory, setTransactionHistory] = useState([])
  const [blockchainLedger, setBlockchainLedger] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      setLoading(true)

      const { data: produceData } = await supabase.from('produce').select('name, quantity')
      const stockMap = {}
      produceData?.forEach((item) => {
        stockMap[item.name] = (stockMap[item.name] || 0) + item.quantity
      })
      const summary = Object.entries(stockMap).map(([name, total]) => ({ name, total }))
      setStockSummary(summary)

      const { data: produce } = await supabase.from('produce').select('*')
      const { data: dispatches } = await supabase.from('dispatches').select('*')

      const transactions = [
        ...(produce?.map((p) => ({
          id: p.id,
          type: 'RECEIVED',
          batch: p.batch_number,
          name: p.name,
          quantity: p.quantity,
          date: p.date_received,
          detail: `From ${p.source}`,
        })) || []),
        ...(dispatches?.map((d) => ({
          id: d.id,
          type: 'DISPATCHED',
          batch: d.batch_number,
          quantity: d.quantity,
          date: d.date_dispatched,
          detail: `To ${d.destination}`,
        })) || []),
      ].sort((a, b) => new Date(b.date) - new Date(a.date))

      setTransactionHistory(transactions)

      const { data: blocks } = await supabase.from('blockchain').select('*').order('block_index', { ascending: true })

      const ledger = blocks?.map((block, index) => {
        let isIntact = true
        if (index > 0) {
          isIntact = blocks[index - 1].hash === block.previous_hash
        } else {
          isIntact = block.previous_hash === '0'
        }
        return { ...block, isIntact }
      }) || []

      setBlockchainLedger(ledger)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout title="Reports">
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
    <MainLayout breadcrumb={['Reports', 'Analytics']}>
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {/* Stock Summary */}
        <div className="px-4 sm:px-0">
          <div className="mb-3 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Stock Summary</h2>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 dark:text-gray-400">
              {stockSummary.length} produce types tracked
            </p>
          </div>

          {stockSummary.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200/50'}`}>
                    <th className={`px-3 sm:px-6 py-2.5 sm:py-4 text-left font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Package size={14} className="sm:w-4 sm:h-4" /> Produce
                    </th>
                    <th className={`px-3 sm:px-6 py-2.5 sm:py-4 text-left font-bold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Scale size={14} className="sm:w-4 sm:h-4" /> Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockSummary.map((item) => (
                    <tr
                      key={item.name}
                      className={`border-b transition-colors last:border-0 ${
                        isDark
                          ? 'border-gray-700/20 hover:bg-gray-800/40'
                          : 'border-gray-200/30 hover:bg-gray-100/50'
                      }`}
                    >
                      <td className={`px-3 sm:px-6 py-2.5 sm:py-4 font-semibold truncate ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {item.name}
                      </td>
                      <td className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-green-600 whitespace-nowrap">{item.total} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-8 sm:py-12 px-4 text-center shadow-sm">
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No data yet</p>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="px-4 sm:px-0">
          <div className="mb-3 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h2>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 dark:text-gray-400">
              {transactionHistory.length} transactions recorded
            </p>
          </div>

          {transactionHistory.length > 0 ? (
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {transactionHistory.map((tx) => (
                <div
                  key={`${tx.type}-${tx.id}`}
                  className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 transition-all hover:shadow-lg ${
                    tx.type === 'RECEIVED'
                      ? isDark
                        ? 'bg-green-950/30 border-green-700/40 hover:bg-green-950/50'
                        : 'bg-green-100/40 border-green-200/60 hover:bg-green-100/60'
                      : isDark
                      ? 'bg-red-950/30 border-red-700/40 hover:bg-red-950/50'
                      : 'bg-red-100/40 border-red-200/60 hover:bg-red-100/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      {tx.type === 'RECEIVED' ? (
                        <ArrowDownRight size={18} className="sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <ArrowUpRight size={18} className="sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs sm:text-sm font-semibold truncate ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          {tx.batch} {tx.name && `- ${tx.name}`}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{tx.detail}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`font-bold text-sm sm:text-base ${tx.type === 'RECEIVED' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.quantity} kg
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-8 sm:py-12 px-4 text-center shadow-sm">
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No transactions yet</p>
            </div>
          )}
        </div>

        {/* Blockchain Ledger */}
        <div className="px-4 sm:px-0">
          <div className="mb-3 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Blockchain Ledger</h2>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600 dark:text-gray-400">
              Immutable audit trail • {blockchainLedger.length} blocks
            </p>
          </div>

          {blockchainLedger.length > 0 ? (
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {blockchainLedger.map((block) => (
                <div
                  key={block.id}
                  className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 transition-all ${
                    block.isIntact
                      ? isDark
                        ? 'bg-green-950/30 border-green-700/40'
                        : 'bg-green-100/40 border-green-200/60'
                      : isDark
                      ? 'bg-red-950/30 border-red-700/40'
                      : 'bg-red-100/40 border-red-200/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <LinkIcon size={16} className="sm:w-5 sm:h-5 flex-shrink-0" style={{color: isDark ? '#9ca3af' : '#4b5563'}} />
                      <span className={`text-base sm:text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        Block #{block.block_index}
                      </span>
                      <span
                        className={`text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 flex-shrink-0 ${
                          block.isIntact
                            ? isDark
                              ? 'bg-green-900/60 text-green-200'
                              : 'bg-green-200/60 text-green-800'
                            : isDark
                            ? 'bg-red-900/60 text-red-200'
                            : 'bg-red-200/60 text-red-800'
                        }`}
                      >
                        {block.isIntact ? (
                          <>
                            <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5" /> Verified
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="sm:w-3.5 sm:h-3.5" /> Broken
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={`text-xs space-y-0.5 sm:space-y-1 font-mono ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    <p className="flex items-start gap-1.5 sm:gap-2">
                      <FileText size={12} className="mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate"><strong>Data:</strong> {block.data}</span>
                    </p>
                    <p className="flex items-start gap-1.5 sm:gap-2">
                      <LinkIcon size={12} className="mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate"><strong>Hash:</strong> {block.hash.substring(0, 16)}...</span>
                    </p>
                    <p className={`flex items-start gap-1.5 sm:gap-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      <Clock size={12} className="mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate">{new Date(block.timestamp).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-8 sm:py-12 px-4 text-center shadow-sm">
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No blockchain data yet</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
