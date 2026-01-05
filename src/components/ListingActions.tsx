'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ListingActionsProps {
  listingId: string
  status: string
}

export default function ListingActions({ listingId, status }: ListingActionsProps) {
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const toggleStatus = async () => {
    setLoading(true)
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active'
      const { error } = await supabase
        .from('listings')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', listingId)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error updating listing:', error)
      alert('Failed to update listing')
    } finally {
      setLoading(false)
      setShowMenu(false)
    }
  }

  const deleteListing = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error deleting listing:', error)
      alert('Failed to delete listing')
    } finally {
      setLoading(false)
      setShowMenu(false)
    }
  }

  const markAsSold = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status: 'sold', updated_at: new Date().toISOString() })
        .eq('id', listingId)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error updating listing:', error)
      alert('Failed to update listing')
    } finally {
      setLoading(false)
      setShowMenu(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-[#222] rounded-lg transition-colors"
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <MoreVertical className="w-5 h-5" />
        )}
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-1 bg-[#111] border border-[#222] rounded-lg shadow-xl z-50 py-1 min-w-[160px]">
            <button
              onClick={toggleStatus}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[#222] flex items-center gap-2"
            >
              {status === 'active' ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Deactivate
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Activate
                </>
              )}
            </button>
            
            {status === 'active' && (
              <button
                onClick={markAsSold}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#222] flex items-center gap-2 text-green-500"
              >
                ✓ Mark as Sold
              </button>
            )}
            
            <button
              onClick={deleteListing}
              className="w-full px-4 py-2 text-left text-sm hover:bg-[#222] flex items-center gap-2 text-red-500"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}


