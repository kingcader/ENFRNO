import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Shield, MapPin, Share2 } from 'lucide-react'
import { getDemoListingBySlug, isDemoMode } from '@/lib/demo-data'
import TradeOfferModal from '@/components/TradeOfferModal'
import MessageSellerButton from '@/components/MessageSellerButton'

const conditionLabels = {
  deadstock: 'Deadstock (DS)',
  like_new: 'Very Near Deadstock (VNDS)',
  used: 'Used',
  worn: 'Worn',
}

async function getListing(slug: string) {
  const demoListing = getDemoListingBySlug(slug)
  if (demoListing) return demoListing
  
  if (!isDemoMode()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('listings')
        .select(`*, profiles(*)`)
        .eq('slug', slug)
        .single()
      
      if (!error && data) return data
    } catch {
      // Fall through
    }
  }
  
  return null
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListing(slug)

  if (!listing) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-12 pb-24 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/browse" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors uppercase tracking-wider text-xs font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-3xl border border-gray-100">
              {listing.images && listing.images.length > 0 ? (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <span className="text-4xl font-bold opacity-20">No Image</span>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                {listing.open_to_trades && (
                  <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/20">
                    Open to Trade
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail gallery */}
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {listing.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-orange-500 transition-colors">
                    <Image
                      src={image}
                      alt={`${listing.title} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">{listing.brand}</span>
              <button className="p-2 text-gray-400 hover:text-black transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase italic leading-[0.9] text-[#111] mb-6">
              {listing.title}
            </h1>

            <div className="text-4xl font-bold text-[#111] mb-8">
              ${listing.price.toLocaleString()}
            </div>

            {/* Quick Info - Fixed Readability */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center hover:border-orange-200 transition-colors">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block mb-1">Size</span>
                <p className="text-3xl font-black text-[#111]">{listing.size}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center hover:border-orange-200 transition-colors">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block mb-1">Condition</span>
                <p className="text-xl font-bold text-[#111] uppercase leading-tight flex items-center justify-center h-[36px]">
                  {conditionLabels[listing.condition]}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <MessageSellerButton 
                listingId={listing.id} 
                sellerId={listing.seller_id}
                sellerName={listing.profiles?.username || 'Seller'}
              />
              {listing.open_to_trades && (
                <TradeOfferModal 
                  listingId={listing.id}
                  listingTitle={listing.title}
                />
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mb-12 border-t border-gray-100 pt-8">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-[#111]">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{listing.description}</p>
              </div>
            )}

            {/* Seller Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold uppercase text-gray-400">
                {listing.profiles?.username?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Link 
                    href={`/seller/${listing.profiles?.username}`}
                    className="font-bold text-lg text-[#111] hover:text-orange-600 transition-colors"
                  >
                    {listing.profiles?.username || 'Seller'}
                  </Link>
                  {listing.profiles?.is_verified && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                {listing.profiles?.location && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                    <MapPin className="w-3 h-3" />
                    {listing.profiles.location}
                  </div>
                )}
              </div>
              <Link 
                href={`/seller/${listing.profiles?.username}`}
                className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
