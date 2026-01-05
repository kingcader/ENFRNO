'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff, MapPin, AlertCircle } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'
import { demoRegister } from '@/lib/demo-auth'
import Logo from '@/components/Logo'

const STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
]

export default function RegisterPage() {
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [state, setState] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isDemoMode()) {
        // Demo mode registration
        const result = demoRegister(email, password, username, state)
        if (result.success) {
          window.dispatchEvent(new Event('storage'))
          router.push('/dashboard')
        } else {
          setError(result.error || 'Registration failed')
        }
      } else {
        // Supabase registration
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        })

        if (signUpError) throw signUpError

        if (authData.user) {
          // @ts-ignore - Supabase types not generated
          await supabase.from('profiles').insert({
            id: authData.user.id,
            username,
            state,
          })
        }

        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const isDemo = isDemoMode()

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <Logo size="xl" variant="stacked" showText={false} />
          </div>
          <h1 className="text-3xl font-bold text-[#111] mb-2 tracking-tight">Join ENFRNO</h1>
          <p className="text-gray-500 text-sm">Create your free account and start trading</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-600 font-bold text-sm">Demo Mode</p>
              <p className="text-orange-600/80 text-xs mt-1">
                Create a demo account to explore all features. Data is stored locally.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Username *</label>
            <div className="relative group/input">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-orange-600 transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                placeholder="sneakerhead123"
                className="input pl-12 h-12 bg-gray-50 focus:bg-white"
                required
                minLength={3}
                maxLength={20}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Email *</label>
            <div className="relative group/input">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-orange-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input pl-12 h-12 bg-gray-50 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Password *</label>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-orange-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pl-12 pr-12 h-12 bg-gray-50 focus:bg-white"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* State */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">State *</label>
            <div className="relative group/input">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/input:text-orange-600 transition-colors z-10" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input pl-12 h-12 bg-gray-50 focus:bg-white appearance-none"
                required
              >
                <option value="">Select your state</option>
                {STATES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer group/checkbox">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
              <span className="text-sm text-gray-500">
                I agree to the{' '}
                <Link href="/terms" className="text-orange-600 font-medium hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-600 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-12 text-base shadow-none hover:shadow-lg hover:shadow-orange-500/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-wide">
              <span className="px-4 bg-white text-gray-400">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-600 font-bold hover:text-orange-700 transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
