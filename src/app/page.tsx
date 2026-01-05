import Link from 'next/link'
import { ArrowRight, Shield, Repeat, DollarSign, Flame } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import Logo from '@/components/Logo'
import { getFeaturedListings, isDemoMode, demoListings } from '@/lib/demo-data'

async function getListings() {
  if (isDemoMode()) {
    return demoListings.slice(0, 8)
  }
  
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('listings')
      .select(`*, profiles(*)`)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(8)
    
    if (error || !data || data.length === 0) {
      return demoListings.slice(0, 8)
    }
    return data
  } catch {
    return demoListings.slice(0, 8)
  }
}

export default async function Home() {
  const listings = await getListings()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black grid-pattern">
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
          {/* Main Logo Display */}
          <div className="mb-12 flex justify-center animate-fade-in-up">
            <Logo size="xl" variant="stacked" showText={false} />
          </div>

          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none pb-2 pr-4">
            IGNITE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              COLLECTION
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            The premier marketplace for authentic sneakers. <br className="hidden md:block" />
            Buy, sell, and trade with zero fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/browse" className="btn-primary min-w-[200px] group">
              <span className="flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/register" className="btn-secondary min-w-[200px]">
              <span>Start Selling</span>
            </Link>
          </div>
        </div>

        {/* Floating elements decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Ticker / Marquee */}
      <div className="bg-orange-500 text-black overflow-hidden py-3 border-y-2 border-white">
        <div className="flex gap-8 whitespace-nowrap animate-marquee font-black italic text-xl uppercase tracking-wider">
          {Array(10).fill('• Buy • Sell • Trade • No Fees • Verified Authentic •').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-8 border border-[#222] bg-black hover:border-orange-500 transition-all duration-500">
              <div className="w-16 h-16 mb-8 text-orange-500 group-hover:scale-110 transition-transform duration-500">
                <DollarSign className="w-full h-full stroke-[1.5]" />
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase">Zero Fees</h3>
              <p className="text-gray-400 leading-relaxed">
                Maximize your profits. We don't take a cut of your sales. What you list is what you keep.
              </p>
            </div>

            <div className="group p-8 border border-[#222] bg-black hover:border-orange-500 transition-all duration-500">
              <div className="w-16 h-16 mb-8 text-orange-500 group-hover:scale-110 transition-transform duration-500">
                <Repeat className="w-full h-full stroke-[1.5]" />
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase">Direct Trades</h3>
              <p className="text-gray-400 leading-relaxed">
                The only platform that makes trading easy. Propose offers, add cash, and swap pairs securely.
              </p>
            </div>

            <div className="group p-8 border border-[#222] bg-black hover:border-orange-500 transition-all duration-500">
              <div className="w-16 h-16 mb-8 text-orange-500 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-full h-full stroke-[1.5]" />
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase">Verified Legit</h3>
              <p className="text-gray-400 leading-relaxed">
                Every seller is vetted. Every pair is authenticated. Shop with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">New Arrivals</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-none">
                Fresh <span className="text-stroke-white text-transparent">Heat</span>
              </h2>
            </div>
            <Link 
              href="/browse" 
              className="hidden md:flex items-center gap-2 text-white hover:text-orange-500 font-bold uppercase tracking-wide transition-colors"
            >
              View All Drops
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {listings.slice(0, 8).map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                showSeller 
              />
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link 
              href="/browse" 
              className="btn-secondary w-full"
            >
              <span>View All Drops</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600 transform -skew-y-3 origin-bottom-right scale-110" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-black italic">
            READY TO FLIP?
          </h2>
          <p className="text-xl md:text-2xl text-black/80 mb-12 font-medium max-w-2xl mx-auto">
            Join the fastest growing sneaker community. List your first pair in under 60 seconds.
          </p>
          <Link href="/register" className="bg-black text-white font-bold uppercase tracking-wide px-10 py-5 text-lg inline-flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            <span>Create Free Account</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
