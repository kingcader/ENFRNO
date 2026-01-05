'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getDemoListings } from '@/lib/demo-data'
import type { ListingWithSeller } from '@/types/database'

const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Yeezy', 'Puma', 'Reebok', 'Converse', 'Vans', 'Other']
const CONDITIONS = [
  { value: 'deadstock', label: 'Deadstock (DS)' },
  { value: 'like_new', label: 'Like New (VNDS)' },
  { value: 'used', label: 'Used' },
  { value: 'worn', label: 'Worn' },
]
const SIZES = [
  '5M', '5.5M', '6M', '6.5M', '7M', '7.5M', '8M', '8.5M', '9M', '9.5M',
  '10M', '10.5M', '11M', '11.5M', '12M', '12.5M', '13M', '14M', '15M'
]
const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

function BrowseContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [listings, setListings] = useState<ListingWithSeller[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '')
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '')
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '')
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '')
  const [openToTradesOnly, setOpenToTradesOnly] = useState(searchParams.get('trades') === 'true')

  const fetchListings = useCallback(async () => {
    setLoading(true)
    
    // Use demo data - works without Supabase
    const filtered = getDemoListings({
      search: searchQuery,
      brand: selectedBrand,
      size: selectedSize,
      condition: selectedCondition,
      state: selectedState,
      openToTrades: openToTradesOnly,
    })
    
    setListings(filtered)
    setLoading(false)
  }, [searchQuery, selectedBrand, selectedCondition, selectedSize, selectedState, openToTradesOnly])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const updateURL = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedBrand) params.set('brand', selectedBrand)
    if (selectedCondition) params.set('condition', selectedCondition)
    if (selectedSize) params.set('size', selectedSize)
    if (selectedState) params.set('state', selectedState)
    if (openToTradesOnly) params.set('trades', 'true')
    
    router.push(`/browse?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand('')
    setSelectedCondition('')
    setSelectedSize('')
    setSelectedState('')
    setOpenToTradesOnly(false)
    router.push('/browse')
  }

  const hasActiveFilters = selectedBrand || selectedCondition || selectedSize || selectedState || openToTradesOnly

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase italic">BROWSE KICKS</h1>
          <p className="text-gray-400 text-lg">Find your next pair from our community of sellers</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="SEARCH SNEAKERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && updateURL()}
              className="input pl-12 text-lg uppercase font-bold tracking-wide h-14"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary h-14 flex items-center gap-2 ${showFilters ? 'bg-white text-black' : ''}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[#0a0a0a] border border-[#222] p-6 mb-12 animate-fade-in-down">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="input"
                >
                  <option value="">All Brands</option>
                  {BRANDS.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="input"
                >
                  <option value="">All Sizes</option>
                  {SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="input"
                >
                  <option value="">All Conditions</option>
                  {CONDITIONS.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="input"
                >
                  <option value="">All States</option>
                  {STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Trade Only */}
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#333] hover:border-orange-500 transition-colors w-full h-[50px] bg-[#111]">
                  <input
                    type="checkbox"
                    checked={openToTradesOnly}
                    onChange={(e) => setOpenToTradesOnly(e.target.checked)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <span className="text-sm font-bold uppercase tracking-wide">Open to Trades</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-[#222]">
              <button onClick={updateURL} className="btn-primary">
                Apply Filters
              </button>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-gray-500 hover:text-white uppercase font-bold text-sm tracking-wide flex items-center gap-2 px-4">
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-6 text-gray-400 font-medium uppercase tracking-wide text-sm border-b border-[#222] pb-4">
          {loading ? 'Loading...' : `${listings.length} listings found`}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-[#111] mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-[#111] w-3/4" />
                  <div className="h-6 bg-[#111] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-32 border border-[#222] bg-[#0a0a0a]">
            <div className="text-6xl mb-6 opacity-20">👟</div>
            <h3 className="text-2xl font-black uppercase mb-2">No sneakers found</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Try adjusting your filters or search term to find what you're looking for.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} showSeller />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-20 bg-[#111] w-1/3 mb-4" />
            <div className="h-6 bg-[#111] w-1/4 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="">
                  <div className="aspect-[4/5] bg-[#111] mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-[#111] w-3/4" />
                    <div className="h-6 bg-[#111] w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  )
}
