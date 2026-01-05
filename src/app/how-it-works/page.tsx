import Link from 'next/link'
import { Flame, DollarSign, Shield, Repeat, Users, Zap, ArrowRight, Video } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero */}
      <section className="py-20 md:py-32 text-center bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-8">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#111] leading-tight">
            The Marketplace<br />
            <span className="text-orange-600">Built for Culture</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Buy, sell, and trade sneakers without the fees. ENFRNO connects you directly with other collectors in a secure environment.
          </p>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="aspect-video bg-[#111] rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl shadow-gray-200">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
              </div>
              <p className="text-white font-medium tracking-wide">Watch how ENFRNO works</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 tracking-tight">
              Why Choose ENFRNO?
            </h2>
            <p className="text-gray-500 text-lg">The advantages of trading on our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<DollarSign className="w-6 h-6 text-orange-600" />}
              title="Zero Platform Fees"
              description="No seller fees, no buyer premiums. Keep 100% of what you earn. We believe the culture shouldn't be taxed."
            />
            <FeatureCard 
              icon={<Repeat className="w-6 h-6 text-blue-600" />}
              title="Easy Trading"
              description="Trade sneakers directly with other collectors. Swap pairs, add cash, and find the shoes you've been hunting."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-green-600" />}
              title="Verified Sellers"
              description="Our verification process ensures you're dealing with trusted members of the community. Buy with confidence."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-purple-600" />}
              title="Local Community"
              description="Connect with sneakerheads in your area. Meet up locally for same-day pickups and instant gratification."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="Fast & Simple"
              description="List your sneakers in under a minute. Our streamlined process gets your kicks in front of buyers fast."
            />
            <FeatureCard 
              icon={<Flame className="w-6 h-6 text-red-500" />}
              title="Built for Culture"
              description="Made by sneakerheads, for sneakerheads. We understand the game because we live it every day."
            />
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 bg-[#FAFAFA] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">Simple steps to start trading</p>
          </div>

          <div className="space-y-20">
            {/* For Sellers */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-[#111]">For Sellers (Flip)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepCard 
                  title="Create Account" 
                  desc="Sign up for free in seconds. Add your location to connect with local buyers."
                />
                <StepCard 
                  title="List Your Sneakers" 
                  desc="Upload photos, set your price, and choose if you're open to trades."
                />
                <StepCard 
                  title="Connect & Sell" 
                  desc="Receive messages and trade offers. Arrange meetups and close deals."
                />
              </div>
            </div>

            {/* For Buyers */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-[#111]">For Buyers (Drip)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepCard 
                  title="Browse Listings" 
                  desc="Search by brand, size, condition, or location to find your grails."
                />
                <StepCard 
                  title="Message Sellers" 
                  desc="Ask questions, negotiate, or make a trade offer directly."
                />
                <StepCard 
                  title="Cop Your Kicks" 
                  desc="Meet up locally or arrange shipping. Get your sneakers same day."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center bg-[#111] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
          {/* Abstract Glow */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-tight">
              Ready to Join the<br />
              <span className="text-orange-500">Movement</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Create your free account and start buying, selling, and trading today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary bg-white text-[#111] hover:bg-gray-100 border-none px-8 py-4 h-auto shadow-none">
                Get Started Free
              </Link>
              <Link href="/browse" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white px-8 py-4 h-auto">
                Browse Sneakers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#111] mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function StepCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 transition-colors hover:shadow-lg hover:shadow-orange-500/5">
      <h4 className="font-bold text-[#111] mb-2 text-lg">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
