'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, User, Menu, X, LogOut, Plus } from 'lucide-react'
import Logo from './Logo'
import { isDemoMode } from '@/lib/demo-data'
import { getDemoUser, demoLogout } from '@/lib/demo-auth'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Handle scroll effect
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
          setUsername(profile?.username || '')
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHome ? 'bg-black/95 backdrop-blur-md border-b border-[#222] py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Search */}
          <div className="flex items-center gap-8">
            <Logo size="md" />
            
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="SEARCH KICKS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-b border-gray-700 text-white placeholder-gray-600 pl-10 pr-4 py-2 w-64 text-sm font-bold uppercase tracking-wide focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/how-it-works" 
              className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="/browse" 
              className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Buy
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <Link 
                  href="/listings/new"
                  className="btn-primary py-2 px-5 text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>List Item</span>
                </Link>
                
                <div className="flex items-center gap-4 border-l border-gray-800 pl-6">
                  <Link href="/dashboard" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
                    <div className="w-8 h-8 rounded-none bg-[#222] border border-[#333] flex items-center justify-center transform -skew-x-6">
                      <User className="w-4 h-4 transform skew-x-6" />
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-white transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6 pl-4">
                <Link 
                  href="/login" 
                  className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="btn-primary py-2 px-6 text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-[#222] absolute w-full left-0">
          <div className="px-4 py-6 space-y-6 h-screen">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="SEARCH KICKS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12"
                />
              </div>
            </form>
            <div className="flex flex-col gap-4">
              <Link href="/how-it-works" className="text-xl font-black italic uppercase" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/browse" className="text-xl font-black italic uppercase" onClick={() => setIsMenuOpen(false)}>
                Buy Sneakers
              </Link>
              <Link href="/sellers" className="text-xl font-black italic uppercase" onClick={() => setIsMenuOpen(false)}>
                Verified Sellers
              </Link>
              
              <div className="border-t border-[#222] my-4 pt-4"></div>

              {isLoggedIn ? (
                <>
                  <Link href="/listings/new" className="text-xl font-black italic uppercase text-orange-500" onClick={() => setIsMenuOpen(false)}>
                    + List New Item
                  </Link>
                  <Link href="/dashboard" className="text-xl font-black italic uppercase" onClick={() => setIsMenuOpen(false)}>
                    My Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="text-left text-xl font-black italic uppercase text-gray-500 mt-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" className="btn-secondary text-center py-3" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-center py-3" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
