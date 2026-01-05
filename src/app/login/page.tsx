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
    <div className="min-h-screen flex items-center justify-center py-20 px-4 hero-gradient bg-black">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <Logo size="xl" variant="stacked" showText={false} />
          </div>
          <h1 className="text-4xl font-black uppercase italic mb-2">Welcome Back</h1>
          <p className="text-gray-400 uppercase tracking-wide text-sm font-bold">Sign in to your ENFRNO account</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-500 font-bold uppercase text-sm tracking-wide">Demo Mode</p>
              <p className="text-gray-400 text-xs mt-1">
                Use any email and password (6+ chars) to login. Data is stored locally.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-[#050505] border border-[#222] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          {/* Hover glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
          
          <div className="relative z-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-bold uppercase tracking-wide">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/input:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOU@EXAMPLE.COM"
                  className="input pl-12 bg-[#0a0a0a] focus:bg-black h-12 uppercase"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within/input:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-12 pr-12 bg-[#0a0a0a] focus:bg-black h-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-14 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#222]" />
              </div>
              <div className="relative flex justify-center text-sm uppercase tracking-widest font-bold">
                <span className="px-4 bg-[#050505] text-gray-600">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-orange-500 font-bold uppercase hover:underline tracking-wide ml-1">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
