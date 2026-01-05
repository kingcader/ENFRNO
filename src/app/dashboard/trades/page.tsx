'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, X, Clock, AlertCircle } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'

interface TradeOffer {
  id: string
  status: 'pending' | 'accepted' | 'rejected'
  cash_offer: number | null
  message: string | null
  created_at: string
  listing: {
    title: string
    price: number
    images: string[]
  }
  offeredListing?: {
    title: string
    price: number
    images: string[]
  }
  offerer: {
    username: string
  }
}

// Demo trade offers
const demoTradeOffers: TradeOffer[] = [
  {
    id: 'trade-1',
    status: 'pending',
    cash_offer: 50,
    message: 'Interested in trading my Chicago 1s for your Bred 11s! Can add $50 on top.',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    listing: {
      title: 'Jordan 11 Retro Bred',
      price: 380,
      images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=200&h=200&fit=crop']
    },
    offeredListing: {
      title: 'Jordan 1 Retro High OG Chicago',
      price: 350,
      images: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200&h=200&fit=crop']
    },
    offerer: { username: 'SneakerKing' }
  },
  {
    id: 'trade-2',
    status: 'pending',
    cash_offer: 100,
    message: 'Would love to trade! Let me know if this works.',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    listing: {
      title: 'Yeezy Boost 350 V2 Zebra',
      price: 280,
      images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=200&h=200&fit=crop']
    },
    offeredListing: {
      title: 'Nike Dunk Low Panda',
      price: 150,
      images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop']
    },
    offerer: { username: 'KicksMaster' }
  },
  {
    id: 'trade-3',
    status: 'accepted',
    cash_offer: null,
    message: 'Straight trade?',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    listing: {
      title: 'Nike Air Max 90 Infrared',
      price: 160,
      images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop']
    },
    offeredListing: {
      title: 'New Balance 550 White Green',
      price: 120,
      images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop']
    },
    offerer: { username: 'SoleTrader' }
  }
]

export default function TradesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [trades, setTrades] = useState<TradeOffer[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (!demoUser) {
          router.push('/login')
          return
        }
        setTrades(demoTradeOffers)
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) {
            router.push('/login')
            return
          }

          // Fetch trade offers - simplified for demo
          setTrades([])
        } catch {
          router.push('/login')
          return
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleAction = async (tradeId: string, action: 'accept' | 'reject') => {
    setActionLoading(tradeId)
    
    if (isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setTrades(prev => prev.map(t => 
        t.id === tradeId ? { ...t, status: action === 'accept' ? 'accepted' : 'rejected' } : t
      ))
    }
    
    setActionLoading(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const pendingTrades = trades.filter(t => t.status === 'pending')
  const completedTrades = trades.filter(t => t.status !== 'pending')

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-[#111] transition-colors mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111] tracking-tight">Trade Offers</h1>
          <p className="text-gray-500 mt-2 text-lg">Review and respond to trade requests</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-600 font-bold text-sm">Demo Mode</p>
              <p className="text-orange-600/80 text-xs mt-1">
                These are demo trade offers. Connect Supabase to receive real offers.
              </p>
            </div>
          </div>
        )}

        {trades.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6 opacity-20">🤝</div>
            <h3 className="text-xl font-bold text-[#111] mb-2">No trade offers yet</h3>
            <p className="text-gray-500 mb-8">When someone wants to trade with you, it&apos;ll show up here</p>
            <Link href="/browse" className="btn-primary inline-block shadow-none">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Pending Trades */}
            {pendingTrades.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#111]">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Pending ({pendingTrades.length})
                </h2>
                <div className="space-y-6">
                  {pendingTrades.map(trade => (
                    <TradeCard 
                      key={trade.id} 
                      trade={trade}
                      onAction={handleAction}
                      loading={actionLoading === trade.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Trades */}
            {completedTrades.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-[#111]">History</h2>
                <div className="space-y-6">
                  {completedTrades.map(trade => (
                    <TradeCard 
                      key={trade.id} 
                      trade={trade}
                      onAction={handleAction}
                      loading={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function TradeCard({ 
  trade, 
  onAction, 
  loading 
}: { 
  trade: TradeOffer
  onAction: (id: string, action: 'accept' | 'reject') => void
  loading: boolean
}) {
  const isPending = trade.status === 'pending'
  const isAccepted = trade.status === 'accepted'
  
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#111]">{trade.offerer.username}</span>
          <span className="text-gray-500">wants to trade</span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
          isPending ? 'bg-orange-100 text-orange-700' :
          isAccepted ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}>
          {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
        </span>
      </div>

      {/* Trade Details */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 relative">
        {/* Their listing */}
        <div className="flex-1 w-full bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
            {trade.offeredListing?.images?.[0] ? (
              <img src={trade.offeredListing.images[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">👟</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">They offer</p>
            <p className="font-bold text-[#111] text-sm truncate">{trade.offeredListing?.title || 'Cash Only'}</p>
            {trade.offeredListing && (
              <p className="text-orange-600 font-bold">${trade.offeredListing.price}</p>
            )}
          </div>
        </div>

        <div className="text-2xl text-gray-300 rotate-90 md:rotate-0">→</div>

        {/* Your listing */}
        <div className="flex-1 w-full bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
            {trade.listing.images?.[0] ? (
              <img src={trade.listing.images[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">👟</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Your listing</p>
            <p className="font-bold text-[#111] text-sm truncate">{trade.listing.title}</p>
            <p className="text-orange-600 font-bold">${trade.listing.price}</p>
          </div>
        </div>
      </div>

      {/* Cash Offer */}
      {trade.cash_offer && trade.cash_offer > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6 text-center">
          <span className="text-green-600 font-bold">+${trade.cash_offer} cash included</span>
        </div>
      )}

      {/* Message */}
      {trade.message && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <p className="text-gray-500 text-sm italic">
            &ldquo;{trade.message}&rdquo;
          </p>
        </div>
      )}

      {/* Actions */}
      {isPending && (
        <div className="flex gap-4">
          <button
            onClick={() => onAction(trade.id, 'accept')}
            disabled={loading}
            className="flex-1 btn-primary flex items-center justify-center gap-2 shadow-none"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-5 h-5" />
                Accept
              </>
            )}
          </button>
          <button
            onClick={() => onAction(trade.id, 'reject')}
            disabled={loading}
            className="flex-1 btn-secondary flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 hover:border-red-200 border-gray-200"
          >
            <X className="w-5 h-5" />
            Decline
          </button>
        </div>
      )}
    </div>
  )
}
