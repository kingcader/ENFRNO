import type { Profile, Listing, ListingWithSeller, TradeOffer } from '@/types/database'

// Demo profiles
export const demoProfiles: Profile[] = [
  {
    id: 'demo-user-1',
    username: 'SneakerKing',
    full_name: 'Michael J',
    avatar_url: null,
    bio: 'OG sneaker collector since 2010. Only authentic heat. Over 500 verified sales. Quick responses, fair prices.',
    location: 'Brooklyn, NY',
    state: 'NY',
    is_verified: true,
    created_at: '2020-01-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-user-2',
    username: 'HeatCheck',
    full_name: 'Sarah L',
    avatar_url: null,
    bio: 'LA-based reseller. Quick shipping, fair prices. DM for deals!',
    location: 'Los Angeles, CA',
    state: 'CA',
    is_verified: true,
    created_at: '2021-03-20T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-user-3',
    username: 'KicksMaster',
    full_name: 'James T',
    avatar_url: null,
    bio: 'Jordan collector. Mostly DS pairs. Chicago local meetups available.',
    location: 'Chicago, IL',
    state: 'IL',
    is_verified: true,
    created_at: '2019-08-10T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-user-4',
    username: 'SoleTrader',
    full_name: 'Alex M',
    avatar_url: null,
    bio: 'New Balance & Yeezy specialist. Always looking for trades!',
    location: 'Miami, FL',
    state: 'FL',
    is_verified: true,
    created_at: '2022-01-05T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-user-5',
    username: 'J4Collector',
    full_name: 'David K',
    avatar_url: null,
    bio: 'Jordan 4 enthusiast. Building the ultimate collection.',
    location: 'Houston, TX',
    state: 'TX',
    is_verified: true,
    created_at: '2021-11-15T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-user-6',
    username: 'DunkDaily',
    full_name: 'Emma R',
    avatar_url: null,
    bio: 'Dunk lover. SB and regular dunks. All sizes available.',
    location: 'Portland, OR',
    state: 'OR',
    is_verified: true,
    created_at: '2020-06-22T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
]

// Demo listings
export const demoListings: ListingWithSeller[] = [
  {
    id: 'listing-1',
    seller_id: 'demo-user-1',
    title: 'Jordan 1 Retro High OG Chicago',
    description: 'Brand new, deadstock pair of the iconic Jordan 1 Chicago. Comes with original box and all accessories. These are the 2015 retro release. Size 10 mens.',
    brand: 'Jordan',
    model: 'Air Jordan 1 Retro High OG',
    size: '10M',
    condition: 'deadstock',
    price: 350,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop'],
    slug: 'jordan-1-chicago',
    status: 'active',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[0],
  },
  {
    id: 'listing-2',
    seller_id: 'demo-user-2',
    title: 'Yeezy Boost 350 V2 Zebra',
    description: 'OG Zebra colorway. Worn twice, excellent condition. Comes with box.',
    brand: 'Adidas',
    model: 'Yeezy 350 V2',
    size: '11M',
    condition: 'like_new',
    price: 280,
    open_to_trades: false,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&h=800&fit=crop'],
    slug: 'yeezy-350-zebra',
    status: 'active',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[1],
  },
  {
    id: 'listing-3',
    seller_id: 'demo-user-3',
    title: 'Nike Dunk Low Panda',
    description: 'Black and white colorway. Deadstock with tags. Perfect everyday sneaker.',
    brand: 'Nike',
    model: 'Dunk Low',
    size: '9.5M',
    condition: 'deadstock',
    price: 150,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop'],
    slug: 'dunk-low-panda',
    status: 'active',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[2],
  },
  {
    id: 'listing-4',
    seller_id: 'demo-user-4',
    title: 'New Balance 550 White Green',
    description: 'Clean everyday sneaker. Gently used, great condition.',
    brand: 'New Balance',
    model: '550',
    size: '10.5M',
    condition: 'used',
    price: 120,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop'],
    slug: 'nb-550-white-green',
    status: 'active',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[3],
  },
  {
    id: 'listing-5',
    seller_id: 'demo-user-5',
    title: 'Jordan 4 Retro Black Cat',
    description: 'All black J4. Brand new deadstock. One of the cleanest colorways.',
    brand: 'Jordan',
    model: 'Air Jordan 4',
    size: '12M',
    condition: 'deadstock',
    price: 420,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&h=800&fit=crop'],
    slug: 'jordan-4-black-cat',
    status: 'active',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[4],
  },
  {
    id: 'listing-6',
    seller_id: 'demo-user-6',
    title: 'Nike Air Max 90 Infrared',
    description: 'Classic AM90 in the iconic infrared colorway. Worn a few times.',
    brand: 'Nike',
    model: 'Air Max 90',
    size: '9M',
    condition: 'like_new',
    price: 160,
    open_to_trades: false,
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'],
    slug: 'air-max-90-infrared',
    status: 'active',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[5],
  },
  {
    id: 'listing-7',
    seller_id: 'demo-user-1',
    title: 'Jordan 11 Retro Bred',
    description: 'The legendary Bred 11s. Deadstock condition with OG everything.',
    brand: 'Jordan',
    model: 'Air Jordan 11',
    size: '10M',
    condition: 'deadstock',
    price: 380,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop'],
    slug: 'jordan-11-bred',
    status: 'active',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[0],
  },
  {
    id: 'listing-8',
    seller_id: 'demo-user-2',
    title: 'Nike SB Dunk Low Travis Scott',
    description: 'Cactus Jack special. Light wear, still in great shape.',
    brand: 'Nike',
    model: 'SB Dunk Low',
    size: '10M',
    condition: 'used',
    price: 1200,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&h=800&fit=crop'],
    slug: 'sb-dunk-travis-scott',
    status: 'active',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[1],
  },
  {
    id: 'listing-9',
    seller_id: 'demo-user-3',
    title: 'Adidas Forum Low Bad Bunny',
    description: 'Bad Bunny collab. Super clean, DS condition.',
    brand: 'Adidas',
    model: 'Forum Low',
    size: '9M',
    condition: 'deadstock',
    price: 250,
    open_to_trades: false,
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop'],
    slug: 'forum-bad-bunny',
    status: 'active',
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[2],
  },
  {
    id: 'listing-10',
    seller_id: 'demo-user-4',
    title: 'Nike Air Force 1 Low White',
    description: 'Classic all-white AF1s. Brand new, never worn.',
    brand: 'Nike',
    model: 'Air Force 1 Low',
    size: '11M',
    condition: 'deadstock',
    price: 110,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop'],
    slug: 'af1-low-white',
    status: 'active',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[3],
  },
  {
    id: 'listing-11',
    seller_id: 'demo-user-5',
    title: 'Jordan 3 Retro Fire Red',
    description: 'Fire Red 3s. Iconic colorway. DS with receipt.',
    brand: 'Jordan',
    model: 'Air Jordan 3',
    size: '10.5M',
    condition: 'deadstock',
    price: 290,
    open_to_trades: true,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'],
    slug: 'jordan-3-fire-red',
    status: 'active',
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[4],
  },
  {
    id: 'listing-12',
    seller_id: 'demo-user-6',
    title: 'Converse Chuck 70 High Black',
    description: 'Classic high top Chuck 70s. Like new condition.',
    brand: 'Converse',
    model: 'Chuck 70',
    size: '8M',
    condition: 'like_new',
    price: 65,
    open_to_trades: false,
    images: ['https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&h=800&fit=crop'],
    slug: 'chuck-70-black',
    status: 'active',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    profiles: demoProfiles[5],
  },
]

// Demo trade offers
export const demoTradeOffers: TradeOffer[] = []

// Check if we're in demo mode (no Supabase configured)
// This works both on client and server
export function isDemoMode(): boolean {
  // Check environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Demo mode if no URL/key, or if they are placeholder values
  if (!url || !key) return true
  if (url.includes('your_supabase') || url.includes('your-project')) return true
  if (key.includes('your_supabase') || key.includes('your-anon-key')) return true
  
  return false
}

// Get demo listings with optional filters
export function getDemoListings(filters?: {
  search?: string
  brand?: string
  size?: string
  condition?: string
  state?: string
  openToTrades?: boolean
}): ListingWithSeller[] {
  let results = [...demoListings]

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.brand.toLowerCase().includes(q) ||
      l.model?.toLowerCase().includes(q)
    )
  }

  if (filters?.brand) {
    results = results.filter(l => l.brand === filters.brand)
  }

  if (filters?.size) {
    results = results.filter(l => l.size === filters.size)
  }

  if (filters?.condition) {
    results = results.filter(l => l.condition === filters.condition)
  }

  if (filters?.state) {
    results = results.filter(l => l.profiles.state === filters.state)
  }

  if (filters?.openToTrades) {
    results = results.filter(l => l.open_to_trades)
  }

  return results
}

// Get demo listing by slug
export function getDemoListingBySlug(slug: string): ListingWithSeller | undefined {
  return demoListings.find(l => l.slug === slug)
}

// Get demo profile by username
export function getDemoProfileByUsername(username: string): { profile: Profile; listings: ListingWithSeller[] } | undefined {
  const profile = demoProfiles.find(p => p.username.toLowerCase() === username.toLowerCase())
  if (!profile) return undefined
  
  const listings = demoListings.filter(l => l.seller_id === profile.id)
  return { profile, listings }
}

// Get all demo sellers with listing counts
export function getDemoSellers(): (Profile & { listing_count: number })[] {
  return demoProfiles.map(p => ({
    ...p,
    listing_count: demoListings.filter(l => l.seller_id === p.id).length,
  }))
}

// Featured listings (first 4)
export function getFeaturedListings(): ListingWithSeller[] {
  return demoListings.slice(0, 4)
}
