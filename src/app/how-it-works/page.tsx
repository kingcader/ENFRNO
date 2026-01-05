import Link from 'next/link'
import { Flame, DollarSign, Shield, Repeat, Users, Zap, ArrowRight } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 hero-gradient text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Flame className="w-16 h-16 text-orange-500 mx-auto mb-6 flame-logo" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            THE MARKETPLACE<br />
            <span className="text-orange-500">BUILT FOR THE CULTURE</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Buy, sell, and trade sneakers without the fees. ENFRNO connects you directly with other collectors.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="aspect-video bg-[#111] rounded-2xl flex items-center justify-center border border-[#222]">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
              </div>
              <p className="text-gray-400">Watch how ENFRNO works</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            WHY CHOOSE <span className="text-orange-500">ENFRNO</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Platform Fees</h3>
              <p className="text-gray-400">
                No seller fees, no buyer premiums. Keep 100% of what you earn. We believe the culture shouldn&apos;t be taxed.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Repeat className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Trading</h3>
              <p className="text-gray-400">
                Trade sneakers directly with other collectors. Swap pairs, add cash, and find the shoes you&apos;ve been hunting.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Sellers</h3>
              <p className="text-gray-400">
                Our verification process ensures you&apos;re dealing with trusted members of the community. Buy with confidence.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Community</h3>
              <p className="text-gray-400">
                Connect with sneakerheads in your area. Meet up locally for same-day pickups and instant gratification.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast & Simple</h3>
              <p className="text-gray-400">
                List your sneakers in under a minute. Our streamlined process gets your kicks in front of buyers fast.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-8 hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Built for Culture</h3>
              <p className="text-gray-400">
                Made by sneakerheads, for sneakerheads. We understand the game because we live it every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            HOW IT <span className="text-orange-500">WORKS</span>
          </h2>

          <div className="space-y-12">
            {/* For Sellers */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg">🔥</span>
                For Sellers (FLIP)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">Create Account</h4>
                    <p className="text-gray-400 text-sm">Sign up for free in seconds. Add your location to connect with local buyers.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">List Your Sneakers</h4>
                    <p className="text-gray-400 text-sm">Upload photos, set your price, and choose if you&apos;re open to trades.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">Connect & Sell</h4>
                    <p className="text-gray-400 text-sm">Receive messages and trade offers. Arrange meetups and close deals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Buyers */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg">👟</span>
                For Buyers (DRIP)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">Browse Listings</h4>
                    <p className="text-gray-400 text-sm">Search by brand, size, condition, or location to find your grails.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">Message Sellers</h4>
                    <p className="text-gray-400 text-sm">Ask questions, negotiate, or make a trade offer directly.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 pt-8">
                    <h4 className="font-bold mb-2">Cop Your Kicks</h4>
                    <p className="text-gray-400 text-sm">Meet up locally or arrange shipping. Get your sneakers same day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            READY TO JOIN THE<br />
            <span className="text-orange-500">MOVEMENT</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Create your free account and start buying, selling, and trading today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/browse" className="btn-secondary text-lg px-10 py-4">
              Browse Sneakers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


