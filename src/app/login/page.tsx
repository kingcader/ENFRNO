'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'
import { demoLogin } from '@/lib/demo-auth'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isDemoMode()) {
        // Demo mode login
        const result = demoLogin(email, password)
        if (result.success) {
          // Trigger storage event for other components
          window.dispatchEvent(new Event('storage'))
          router.push('/dashboard')
        } else {
          setError(result.error || 'Login failed')
        }
      } else {
        // Supabase login
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
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
          <h1 className="text-3xl font-bold text-[#111] mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to your ENFRNO account</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-600 font-bold text-sm">Demo Mode</p>
              <p className="text-orange-600/80 text-xs mt-1">
                Use any email and password (6+ chars) to login. Data is stored locally.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Email</label>
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
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Password</label>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-12 text-base shadow-none hover:shadow-lg hover:shadow-orange-500/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign In'
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

          {/* Sign Up Link */}
          <p className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-orange-600 font-bold hover:text-orange-700 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
