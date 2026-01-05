import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, MapPin, Calendar, Package } from 'lucide-react'
import { getDemoProfileByUsername, isDemoMode } from '@/lib/demo-data'
import ListingCard from '@/components/ListingCard'
import type { ListingWithSeller } from '@/types/database'

async function getSeller(username: string) {
  const demoData = getDemoProfileByUsername(username)
  if (demoData) return demoData
  
  if (!isDemoMode()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profile, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

      if (!error && profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: listings } = await (supabase as any)
          .from('listings')
          .select(`*, profiles(*)`)
          .eq('seller_id', profile.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        return { profile, listings: listings || [] }
      }
    } catch {
      // Fall through
    }
  }
  
  return null
}

export default async function SellerPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const data = await getSeller(username)

  if (!data) {
    notFound()
  }

  const { profile, listings } = data
  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <div className="min-h-screen py-12 bg-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link href="/sellers" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#111] transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          All Sellers
        </Link>

        {/* Profile Header */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-4xl md:text-5xl font-black flex-shrink-0 text-orange-600 uppercase shadow-lg shadow-gray-200/50">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-5xl font-black text-[#111] tracking-tight">{profile.username}</h1>
                {profile.is_verified && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 border border-blue-100">
                    <Shield className="w-3.5 h-3.5" />
                    Verified Seller
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-6 text-gray-500 text-sm font-medium mb-6 uppercase tracking-wide">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Member since {memberSince}
                </div>
              </div>

              {profile.bio && (
                <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
              <div className="text-center">
                <p className="text-4xl font-black text-[#111] mb-1">{listings.length}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Listings</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-[#111] mb-1">100%</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-black text-[#111] tracking-tight">{profile.username}&apos;s Inventory</h2>
          </div>

          {listings.length === 0 ? (
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-16 text-center">
              <div className="text-6xl mb-6 opacity-20">👟</div>
              <h3 className="text-xl font-bold mb-2 text-[#111]">No active listings</h3>
              <p className="text-gray-500">This seller doesn&apos;t have any listings right now</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(listings as ListingWithSeller[]).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
