import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, MapPin, Calendar } from 'lucide-react'
import { getDemoProfileByUsername, isDemoMode } from '@/lib/demo-data'
import ListingCard from '@/components/ListingCard'

async function getSeller(username: string) {
  // Try demo data first
  const demoData = getDemoProfileByUsername(username)
  if (demoData) return demoData
  
  if (!isDemoMode()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

      if (!error && profile) {
        const { data: listings } = await supabase
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
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link href="/sellers" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          All Sellers
        </Link>

        {/* Profile Header */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-4xl md:text-5xl font-bold flex-shrink-0">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-black">{profile.username}</h1>
                {profile.is_verified && (
                  <span className="badge badge-verified flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified Seller
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {memberSince}
                </div>
              </div>

              {profile.bio && (
                <p className="text-gray-300 max-w-2xl">{profile.bio}</p>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8">
              <div className="text-center">
                <p className="text-3xl font-black text-orange-500">{listings.length}</p>
                <p className="text-sm text-gray-400">Listings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div>
          <h2 className="text-2xl font-black mb-6">{profile.username}&apos;s Listings</h2>

          {listings.length === 0 ? (
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-10 text-center">
              <div className="text-6xl mb-4">👟</div>
              <h3 className="text-xl font-bold mb-2">No active listings</h3>
              <p className="text-gray-400">This seller doesn&apos;t have any listings right now</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
