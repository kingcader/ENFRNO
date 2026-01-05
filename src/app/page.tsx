import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, TrendingUp } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { isDemoMode, demoListings } from '@/lib/demo-data'

async function getListings() {
  if (isDemoMode()) {
    return demoListings.slice(0, 4)
  }
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data } = await supabase
      .from('listings')
      .select(`*, profiles(*)`)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(4)
    return data || demoListings.slice(0, 4)
  } catch {
    return demoListings.slice(0, 4)
  }
}

export default async function Home() {
  const listings = await getListings()
  const heroImage = listings[0]?.images[0] || 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop'

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-white">
      {/* 1. Immersive Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left: Text Content */}
            <div className="relative z-10 text-center lg:text-left">
              {/* Removed "Zero Fees" badge as requested */}
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#111] mb-6 leading-[0.9]">
                THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  ENFRNO
                </span><br />
                STANDARD
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                Join the marketplace built for the culture. Buy, sell, and trade authentic sneakers without the middleman tax.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/browse" className="btn-primary h-14 text-lg px-8 shadow-xl shadow-orange-500/20">
                  Start Shopping
                </Link>
                <Link href="/listings/new" className="btn-secondary h-14 text-lg px-8">
                  List for Free
                </Link>
              </div>
              
              {/* Trust Stats */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-400">
                <div>
                  <p className="text-2xl font-bold text-[#111]">10K+</p>
                  <p className="text-xs uppercase tracking-wider font-semibold">Pairs Traded</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-[#111]">0%</p>
                  <p className="text-xs uppercase tracking-wider font-semibold">Seller Fees</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-[#111]">100%</p>
                  <p className="text-xs uppercase tracking-wider font-semibold">Verified</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-blue-50 rounded-[3rem] transform rotate-3 scale-90" />
              <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none transform hover:scale-105 transition-transform duration-700 ease-out">
                <Image
                  src={heroImage}
                  alt="Featured Sneaker"
                  fill
                  className="object-contain drop-shadow-2xl z-10"
                  priority
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-700 hidden md:block">
                  <p className="text-xs text-gray-500 font-bold uppercase">Condition</p>
                  <p className="text-lg font-black text-green-500">DEADSTOCK</p>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-1000 hidden md:block">
                  <p className="text-xs text-gray-500 font-bold uppercase">Market Value</p>
                  <p className="text-lg font-black text-[#111]">$450.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Brand (Logos) */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Shop Top Brands</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Nike', 'Jordan', 'Adidas', 'Yeezy', 'New Balance'].map((brand) => (
              <Link 
                key={brand} 
                href={`/browse?brand=${brand}`}
                className="text-2xl md:text-3xl font-black italic tracking-tighter hover:text-orange-600 transition-colors"
              >
                {brand.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Category (Visual Grid) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2">SHOP BY SILHOUETTE</h2>
              <p className="text-gray-500">Find your favorite style</p>
            </div>
            <Link href="/browse" className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-black pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Jordan 1', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=500&h=600&fit=crop' },
              { name: 'Dunks', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop' },
              { name: 'Yeezy', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=600&fit=crop' },
              { name: 'New Balance', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=600&fit=crop' },
            ].map((cat) => (
              <Link 
                key={cat.name} 
                href={`/browse?q=${cat.name}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
              >
                <Image 
                  src={cat.img} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-xl font-black italic uppercase tracking-wider">{cat.name}</p>
                  <span className="text-white/80 text-xs font-medium group-hover:text-orange-400 transition-colors flex items-center gap-1">
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Drops */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter">TRENDING NOW</h2>
              <p className="text-gray-500">The most traded pairs this week</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/browse" className="btn-secondary min-w-[200px]">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Features (Why ENFRNO) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-6">BUILT FOR THE COMMUNITY</h2>
            <p className="text-lg text-gray-500">
              We stripped away the corporate fees and complex processes. ENFRNO is sneaker trading simplified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Seller Fees</h3>
              <p className="text-gray-500 leading-relaxed">
                Keep 100% of your sale price. No hidden processing fees, no commission. You earned it, you keep it.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Authentication First</h3>
              <p className="text-gray-500 leading-relaxed">
                Every pair passes through our multi-point verification center. Digital and physical checks ensure 100% authenticity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Trades</h3>
              <p className="text-gray-500 leading-relaxed">
                Trade your kicks for theirs. Add cash on top or request it. Our system handles the logistics securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-[#111] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
             <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-orange-600 rounded-full blur-[150px]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-8">
              READY TO HEAT UP?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join the fastest growing sneaker marketplace today. List your first item in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="btn-primary bg-white text-black hover:bg-gray-100 border-none h-14 px-10 text-lg">
                Get Started
              </Link>
              <Link href="/browse" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white h-14 px-10 text-lg">
                Browse Kicks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
