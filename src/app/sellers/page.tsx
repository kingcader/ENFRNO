import Link from 'next/link'
import { Shield, MapPin, Package } from 'lucide-react'
import { getDemoSellers, isDemoMode } from '@/lib/demo-data'

async function getSellers() {
  // Always use demo data for now
  const demoSellers = getDemoSellers()
  
  if (!isDemoMode()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_verified', true)
        .limit(20)

      if (!error && profiles && profiles.length > 0) {
        const sellersWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            const { count } = await supabase
              .from('listings')
              .select('*', { count: 'exact', head: true })
              .eq('seller_id', profile.id)
              .eq('status', 'active')
            return { ...profile, listing_count: count || 0 }
          })
        )
        return sellersWithCounts
      }
    } catch {
      // Fall through to demo data
    }
  }
  
  return demoSellers
}

export default async function SellersPage() {
  const sellers = await getSellers()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase italic">
            VERIFIED <span className="text-stroke-white text-transparent">SELLERS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Shop with confidence from our community of trusted and verified sellers. 
            Each seller has been vetted to ensure authentic products and reliable service.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
          <div className="text-center p-8 bg-[#0a0a0a] border border-[#222]">
            <p className="text-4xl font-black text-orange-500 italic">{sellers.length}+</p>
            <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Verified Sellers</p>
          </div>
          <div className="text-center p-8 bg-[#0a0a0a] border border-[#222]">
            <p className="text-4xl font-black text-orange-500 italic">500+</p>
            <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Active Listings</p>
          </div>
          <div className="text-center p-8 bg-[#0a0a0a] border border-[#222]">
            <p className="text-4xl font-black text-orange-500 italic">50</p>
            <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">States Covered</p>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <Link
              key={seller.id}
              href={`/seller/${seller.username}`}
              className="bg-[#050505] border border-[#222] p-6 hover:border-orange-500 transition-all group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#222] flex items-center justify-center text-2xl font-bold flex-shrink-0 text-gray-500 uppercase">
                  {seller.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-xl truncate group-hover:text-orange-500 transition-colors uppercase italic">
                      {seller.username}
                    </h3>
                    {seller.is_verified && (
                      <span className="flex-shrink-0 badge badge-verified flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  {seller.location && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase tracking-wide">
                      <MapPin className="w-3 h-3" />
                      {seller.location}
                    </div>
                  )}
                </div>
              </div>

              {seller.bio && (
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed h-10">{seller.bio}</p>
              )}

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 border-t border-[#222] pt-4">
                <Package className="w-4 h-4" />
                <span>{seller.listing_count} active listings</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-[#111] to-black border border-[#222] p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors duration-500" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase italic mb-4">Want to become a verified seller?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join our community of trusted sellers. Complete your profile and start listing to begin the verification process.
            </p>
            <Link href="/register" className="btn-primary inline-block">
              Start Selling Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
