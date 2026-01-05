'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { isDemoMode, demoListings } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'
import type { ListingWithSeller } from '@/types/database'

export default function ManageListingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<ListingWithSeller[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (!demoUser) {
          router.push('/login')
          return
        }
        // Use demo listings as "user's listings"
        setListings(demoListings.slice(0, 4))
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) {
            router.push('/login')
            return
          }

          const { data } = await supabase
            .from('listings')
            .select(`*, profiles(*)`)
            .eq('seller_id', user.id)
            .order('created_at', { ascending: false })

          setListings((data || []) as ListingWithSeller[])
        } catch {
          router.push('/login')
          return
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleDelete = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    
    setActionLoading(listingId)
    
    if (isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setListings(prev => prev.filter(l => l.id !== listingId))
    } else {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.from('listings').delete().eq('id', listingId)
        setListings(prev => prev.filter(l => l.id !== listingId))
      } catch {
        alert('Failed to delete listing')
      }
    }
    
    setActionLoading(null)
  }

  const handleToggleStatus = async (listingId: string, currentStatus: string) => {
    setActionLoading(listingId)
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    if (isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setListings(prev => prev.map(l => 
        l.id === listingId ? { ...l, status: newStatus } : l
      ))
    } else {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.from('listings').update({ status: newStatus }).eq('id', listingId)
        setListings(prev => prev.map(l => 
          l.id === listingId ? { ...l, status: newStatus } : l
        ))
      } catch {
        alert('Failed to update listing')
      }
    }
    
    setActionLoading(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const activeListings = listings.filter(l => l.status === 'active')
  const inactiveListings = listings.filter(l => l.status === 'inactive')
  const soldListings = listings.filter(l => l.status === 'sold' || l.status === 'traded')

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black">Manage Listings</h1>
            <Link href="/listings/new" className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Listing
            </Link>
          </div>
        </div>

        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/50 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-500 font-medium text-sm">Demo Mode</p>
              <p className="text-gray-400 text-xs mt-1">
                These are demo listings. Connect Supabase to manage real listings.
              </p>
            </div>
          </div>
        )}

        {listings.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-10 text-center">
            <div className="text-6xl mb-4">👟</div>
            <h3 className="text-xl font-bold mb-2">No listings yet</h3>
            <p className="text-gray-400 mb-6">Create your first listing and start selling!</p>
            <Link href="/listings/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Listings */}
            {activeListings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  Active ({activeListings.length})
                </h2>
                <div className="space-y-3">
                  {activeListings.map(listing => (
                    <ListingRow 
                      key={listing.id} 
                      listing={listing}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      loading={actionLoading === listing.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Inactive Listings */}
            {inactiveListings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full" />
                  Inactive ({inactiveListings.length})
                </h2>
                <div className="space-y-3">
                  {inactiveListings.map(listing => (
                    <ListingRow 
                      key={listing.id} 
                      listing={listing}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      loading={actionLoading === listing.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sold Listings */}
            {soldListings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  Sold/Traded ({soldListings.length})
                </h2>
                <div className="space-y-3">
                  {soldListings.map(listing => (
                    <ListingRow 
                      key={listing.id} 
                      listing={listing}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      loading={actionLoading === listing.id}
                      isSold
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

function ListingRow({ 
  listing, 
  onDelete, 
  onToggleStatus, 
  loading,
  isSold = false 
}: { 
  listing: ListingWithSeller
  onDelete: (id: string) => void
  onToggleStatus: (id: string, status: string) => void
  loading: boolean
  isSold?: boolean
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 flex items-center gap-4">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#111] flex-shrink-0">
        {listing.images?.[0] ? (
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">👟</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold truncate">{listing.title}</h3>
        <p className="text-sm text-gray-400">
          {listing.size} • {listing.brand} • ${listing.price}
        </p>
      </div>

      {/* Actions */}
      {!isSold && (
        <div className="flex items-center gap-2">
          <Link 
            href={`/listing/${listing.slug}`}
            className="p-2 bg-[#111] rounded-lg hover:bg-[#222] transition-colors"
            title="View Listing"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => onToggleStatus(listing.id, listing.status)}
            disabled={loading}
            className="p-2 bg-[#111] rounded-lg hover:bg-[#222] transition-colors"
            title={listing.status === 'active' ? 'Hide Listing' : 'Activate Listing'}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
            ) : listing.status === 'active' ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5 text-green-500" />
            )}
          </button>
          <button
            onClick={() => onDelete(listing.id)}
            disabled={loading}
            className="p-2 bg-[#111] rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors"
            title="Delete Listing"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
