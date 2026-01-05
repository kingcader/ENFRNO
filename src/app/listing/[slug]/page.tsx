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
  // Try demo data first
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
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/browse" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-wider text-sm font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-[#111] border border-[#222]">
              {listing.images && listing.images.length > 0 ? (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {listing.open_to_trades && (
                  <span className="badge badge-trade">Open to Trades</span>
                )}
              </div>
            </div>

            {/* Thumbnail gallery */}
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {listing.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden bg-[#111] cursor-pointer hover:border-orange-500 border border-transparent transition-all">
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
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-gray-400 uppercase font-bold tracking-widest">{listing.brand}</span>
                <h1 className="text-4xl md:text-5xl font-black mt-1 uppercase italic leading-none">{listing.title}</h1>
              </div>
              <button className="p-3 bg-[#111] hover:bg-[#222] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-5xl font-black text-orange-500 mb-8 italic">
              ${listing.price.toLocaleString()}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0a0a0a] border border-[#222] p-4">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Size</span>
                <p className="text-2xl font-black mt-1">{listing.size}</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222] p-4">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Condition</span>
                <p className="text-2xl font-black mt-1 uppercase">{conditionLabels[listing.condition]}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
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
              <div className="mb-10">
                <h3 className="font-bold text-lg mb-3 uppercase tracking-wide">Description</h3>
                <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
              </div>
            )}

            {/* Seller Card */}
            <div className="bg-[#0a0a0a] border border-[#222] p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#222] flex items-center justify-center text-xl font-bold uppercase text-gray-400">
                  {listing.profiles?.username?.charAt(0).toUpperCase() || 'S'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/seller/${listing.profiles?.username}`}
                      className="font-bold text-lg hover:text-orange-500 transition-colors uppercase"
                    >
                      {listing.profiles?.username || 'Seller'}
                    </Link>
                    {listing.profiles?.is_verified && (
                      <span className="badge badge-verified flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  {listing.profiles?.location && (
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1 uppercase tracking-wide font-medium">
                      <MapPin className="w-4 h-4" />
                      {listing.profiles.location}
                    </div>
                  )}
                </div>
              </div>

              {listing.profiles?.bio && (
                <p className="text-gray-400 text-sm mb-6">{listing.profiles.bio}</p>
              )}

              <Link 
                href={`/seller/${listing.profiles?.username}`}
                className="btn-secondary w-full"
              >
                <span>View All Listings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
