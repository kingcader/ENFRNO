'use client'

import { useState, useEffect } from 'react'
import { Repeat, X } from 'lucide-react'
import { isDemoMode, demoListings } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'
import type { Listing } from '@/types/database'

interface TradeOfferModalProps {
  listingId: string
  listingTitle: string
}

export default function TradeOfferModal({ listingId, listingTitle }: TradeOfferModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [userListings, setUserListings] = useState<Listing[]>([])
  const [selectedListing, setSelectedListing] = useState<string>('')
  const [cashOffer, setCashOffer] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        setIsLoggedIn(!!demoUser)
        if (demoUser) {
          // Use first 2 demo listings as "user's listings"
          setUserListings(demoListings.slice(0, 2) as Listing[])
        }
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          setIsLoggedIn(!!user)
          
          if (user) {
            const { data } = await supabase
              .from('listings')
              .select('*')
              .eq('seller_id', user.id)
              .eq('status', 'active')
            
            if (data) setUserListings(data)
          }
        } catch {
          setIsLoggedIn(false)
        }
      }
    }
    
    if (isOpen) checkAuth()
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      if (isDemoMode()) {
        // Demo mode - simulate success
        await new Promise(resolve => setTimeout(resolve, 500))
        setSuccess(true)
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) throw new Error('Not logged in')

        // @ts-expect-error - Supabase types not generated
        const { error } = await supabase
          .from('trade_offers')
          .insert({
            listing_id: listingId,
            offerer_id: user.id,
            offered_listing_id: selectedListing || null,
            cash_offer: cashOffer ? parseFloat(cashOffer) : null,
            message: message || null,
            status: 'pending'
          })

        if (error) throw error
        setSuccess(true)
      }

      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
        setSelectedListing('')
        setCashOffer('')
        setMessage('')
      }, 2000)
    } catch (error) {
      console.error('Error submitting trade offer:', error)
      alert('Failed to submit trade offer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-secondary flex-1 flex items-center justify-center gap-2"
      >
        <Repeat className="w-5 h-5" />
        Make Trade Offer
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#222]">
            <div>
              <h2 className="text-xl font-bold">Make Trade Offer</h2>
              <p className="text-sm text-gray-400 mt-1">For: {listingTitle}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-[#222] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {success ? (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-2">Offer Sent!</h3>
              <p className="text-gray-400">The seller will review your offer</p>
            </div>
          ) : !isLoggedIn ? (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Login Required</h3>
              <p className="text-gray-400 mb-6">You need to be logged in to make a trade offer</p>
              <a href="/login" className="btn-primary inline-block">
                Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Select Your Listing */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Offer One of Your Listings (Optional)
                </label>
                <select
                  value={selectedListing}
                  onChange={(e) => setSelectedListing(e.target.value)}
                  className="input"
                >
                  <option value="">Select a listing...</option>
                  {userListings.map((listing) => (
                    <option key={listing.id} value={listing.id}>
                      {listing.title} - ${listing.price} - {listing.size}
                    </option>
                  ))}
                </select>
                {userListings.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    You don&apos;t have any active listings. You can still offer cash below.
                  </p>
                )}
              </div>

              {/* Cash Offer */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cash Offer (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={cashOffer}
                    onChange={(e) => setCashOffer(e.target.value)}
                    placeholder="0.00"
                    className="input pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Add cash to sweeten the deal
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the seller about your offer..."
                  className="input min-h-[100px] resize-none"
                  rows={4}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || (!selectedListing && !cashOffer)}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Repeat className="w-5 h-5" />
                    Send Trade Offer
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
