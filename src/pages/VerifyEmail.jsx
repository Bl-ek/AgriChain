import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../supabaseClient'

export function VerifyEmail() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract token_hash from URL fragment
        // Supabase sends: #type=emailconfirmation&token_hash=...&refresh_token=...
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const tokenHash = hashParams.get('token_hash')

        if (!tokenHash) {
          setStatus('error')
          setMessage('Invalid verification link')
          return
        }

        // Verify the OTP token
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'email',
        })

        if (error) {
          setStatus('error')
          setMessage(error.message || 'Email verification failed')
          toast.error('Verification failed')
          return
        }

        if (data?.user) {
          setStatus('success')
          setMessage('Email verified successfully! Redirecting...')
          toast.success('Email verified!')

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/', { replace: true })
          }, 2000)
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('An error occurred during verification')
        toast.error('Verification error')
      }
    }

    verifyEmail()
  }, [navigate])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center">
        <div className="flex items-center gap-2">
          <Leaf size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-white">AgriChain</span>
        </div>
      </div>

      {/* Verification Card */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 text-center">
            {/* Status Icon */}
            <div className="inline-flex items-center justify-center w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full mb-4 sm:mb-6">
              {status === 'verifying' && (
                <Loader size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
              )}
              {status === 'error' && (
                <AlertCircle size={48} className="text-red-600 dark:text-red-400" />
              )}
            </div>

            {/* Message */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {status === 'verifying' && 'Verifying Email'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>

            {/* Action Button */}
            {status === 'error' && (
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
