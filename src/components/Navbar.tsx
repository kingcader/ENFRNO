'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, User, LogOut, Plus } from 'lucide-react'
import Logo from './Logo'
import { isDemoMode } from '@/lib/demo-data'
import { getDemoUser, demoLogout } from '@/lib/demo-auth'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        setIsLoggedIn(!!demoUser)
        setUsername(demoUser?.profile.username || '')
        return
      }
      
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsLoggedIn(!!user)
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single()
          setUsername((profile as { username: string } | null)?.username || '')
        }
      } catch {
        setIsLoggedIn(false)
      }
    }
    
    checkAuth()
    
    const handleStorage = () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        setIsLoggedIn(!!demoUser)
        setUsername(demoUser?.profile.username || '')
      }
    }
    
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = async () => {
    if (isDemoMode()) {
      demoLogout()
      setIsLoggedIn(false)
      setUsername('')
    } else {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch {
        // Ignore errors
      }
    }
    router.push('/')
    router.refresh()
  }

  const isHome = pathname === '/'

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
        scrolled || !isHome ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo & Search */}
            <div className="flex items-center gap-12">
              <Logo size="md" className={isHome && !scrolled ? "text-black" : "text-black"} />
              
              <form onSubmit={handleSearch} className="hidden lg:flex items-center">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for kicks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-transparent border border-gray-200 rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all ${
                      isHome && !scrolled ? 'bg-white/50 border-transparent placeholder-gray-500' : ''
                    }`}
                  />
                </div>
              </form>
            </div>

            {/* Desktop Nav Links */}
            <div className="flex items-center gap-8">
              <Link 
                href="/how-it-works" 
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                How It Works
              </Link>
              <Link 
                href="/browse" 
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Buy
              </Link>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <Link 
                    href="/listings/new"
                    className="btn-primary py-2 px-4 text-sm flex items-center gap-2 h-10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Sell</span>
                  </Link>
                  
                  <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <Link 
                    href="/login" 
                    className="text-sm font-medium hover:text-orange-600 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/register" 
                    className="btn-primary py-2 px-6 text-sm h-10"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar (Logo Only) */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-center">
        <Logo size="md" showText={true} />
      </nav>
    </>
  )
}
