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

          // @ts-expect-error - Supabase types not fully inferred in demo mode
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single()

          setUsername((profile as { username: string } | null)?.username || 'User')

          // @ts-expect-error - Supabase types not fully inferred in demo mode
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
    <div className="min-h-screen pt-12 pb-24 md:pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-600 font-bold text-sm">Demo Mode</p>
              <p className="text-orange-600/80 text-xs mt-1">
                This is a demo dashboard. Connect Supabase to enable full functionality.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#111] tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1 text-lg">Welcome back, {username}!</p>
          </div>
          <Link href="/listings/new" className="btn-primary flex items-center gap-2 w-fit shadow-none">
            <Plus className="w-5 h-5" />
            New Listing
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Active</span>
            </div>
            <p className="text-3xl font-bold text-[#111]">{activeListings.length}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Sold</span>
            </div>
            <p className="text-3xl font-bold text-[#111]">{soldListings.length}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Repeat className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Trades</span>
            </div>
            <p className="text-3xl font-bold text-[#111]">{tradeOfferCount}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Messages</span>
            </div>
            <p className="text-3xl font-bold text-[#111]">{messageCount}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/dashboard/listings" 
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
              <Package className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
            </div>
            <h3 className="font-bold text-lg text-[#111] mb-2 group-hover:text-orange-600 transition-colors">
              Manage Listings
            </h3>
            <p className="text-gray-500 text-sm">Edit, pause, or delete your listings</p>
          </Link>

          <Link 
            href="/dashboard/trades" 
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
              <Repeat className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
            </div>
            <h3 className="font-bold text-lg text-[#111] mb-2 group-hover:text-orange-600 transition-colors">
              Trade Offers
            </h3>
            <p className="text-gray-500 text-sm">Review and respond to trade offers</p>
          </Link>

          <Link 
            href="/dashboard/settings" 
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
              <Settings className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
            </div>
            <h3 className="font-bold text-lg text-[#111] mb-2 group-hover:text-orange-600 transition-colors">
              Profile Settings
            </h3>
            <p className="text-gray-500 text-sm">Update your profile and preferences</p>
          </Link>
        </div>

        {/* Your Listings */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#111]">Your Listings</h2>
            <Link href="/dashboard/listings" className="text-orange-600 text-sm font-bold hover:text-orange-700 transition-colors">
              View All →
            </Link>
          </div>

          {activeListings.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-6 opacity-20">👟</div>
              <h3 className="text-xl font-bold text-[#111] mb-2">No listings yet</h3>
              <p className="text-gray-500 mb-8">Create your first listing and start selling!</p>
              <Link href="/listings/new" className="btn-primary inline-flex items-center gap-2 shadow-none">
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
