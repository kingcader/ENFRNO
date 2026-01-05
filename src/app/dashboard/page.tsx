'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Package, MessageCircle, Repeat, Settings, TrendingUp, AlertCircle } from 'lucide-react'
import { isDemoMode, demoListings } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'
import ListingCard from '@/components/ListingCard'
import type { ListingWithSeller } from '@/types/database'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [listings, setListings] = useState<ListingWithSeller[]>([])
  const [tradeOfferCount, setTradeOfferCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (!demoUser) {
          router.push('/login')
          return
        }
        setUsername(demoUser.profile.username)
        // Use first 2 demo listings as "user's listings"
        setListings(demoListings.slice(0, 2))
        setTradeOfferCount(3)
        setMessageCount(5)
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) {
            router.push('/login')
            return
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single()

          setUsername(profile?.username || 'User')

          const { data: userListings } = await supabase
            .from('listings')
            .select(`*, profiles(*)`)
            .eq('seller_id', user.id)
            .eq('status', 'active')
            .order('created_at', { ascending: false })

          setListings((userListings || []) as ListingWithSeller[])
        } catch {
          router.push('/login')
          return
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const activeListings = listings.filter(l => l.status === 'active')
  const soldListings = listings.filter(l => l.status === 'sold')

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-500 font-medium text-sm">Demo Mode</p>
              <p className="text-gray-400 text-xs mt-1">
                This is a demo dashboard. Connect Supabase to enable full functionality.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase">Dashboard</h1>
            <p className="text-gray-400 mt-1 uppercase tracking-wide">Welcome back, {username}!</p>
          </div>
          <Link href="/listings/new" className="btn-primary flex items-center gap-2 w-fit">
            <Plus className="w-5 h-5" />
            New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-orange-500 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm text-gray-400 uppercase font-bold tracking-wide">Active</span>
            </div>
            <p className="text-3xl font-black">{activeListings.length}</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-green-500 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-gray-400 uppercase font-bold tracking-wide">Sold</span>
            </div>
            <p className="text-3xl font-black">{soldListings.length}</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center">
                <Repeat className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-gray-400 uppercase font-bold tracking-wide">Trades</span>
            </div>
            <p className="text-3xl font-black">{tradeOfferCount}</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-purple-500 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-gray-400 uppercase font-bold tracking-wide">Messages</span>
            </div>
            <p className="text-3xl font-black">{messageCount}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Link 
            href="/dashboard/listings" 
            className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-orange-500 transition-all group hover:-translate-y-1"
          >
            <Package className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-black text-xl uppercase italic mb-2 group-hover:text-orange-500 transition-colors">
              Manage Listings
            </h3>
            <p className="text-gray-400 text-sm">Edit, pause, or delete your listings</p>
          </Link>

          <Link 
            href="/dashboard/trades" 
            className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-orange-500 transition-all group hover:-translate-y-1"
          >
            <Repeat className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-black text-xl uppercase italic mb-2 group-hover:text-orange-500 transition-colors">
              Trade Offers
            </h3>
            <p className="text-gray-400 text-sm">Review and respond to trade offers</p>
          </Link>

          <Link 
            href="/dashboard/settings" 
            className="bg-[#0a0a0a] border border-[#222] p-6 hover:border-orange-500 transition-all group hover:-translate-y-1"
          >
            <Settings className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-black text-xl uppercase italic mb-2 group-hover:text-orange-500 transition-colors">
              Profile Settings
            </h3>
            <p className="text-gray-400 text-sm">Update your profile and preferences</p>
          </Link>
        </div>

        {/* Your Listings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black uppercase italic">Your Listings</h2>
            <Link href="/dashboard/listings" className="text-orange-500 text-sm font-bold uppercase tracking-wider hover:underline">
              View All →
            </Link>
          </div>

          {activeListings.length === 0 ? (
            <div className="bg-[#0a0a0a] border border-[#222] p-10 text-center">
              <div className="text-6xl mb-4">👟</div>
              <h3 className="text-xl font-bold uppercase mb-2">No listings yet</h3>
              <p className="text-gray-400 mb-6">Create your first listing and start selling!</p>
              <Link href="/listings/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
