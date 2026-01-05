'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface TradeOfferActionsProps {
  offerId: string
}

export default function TradeOfferActions({ offerId }: TradeOfferActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAction = async (status: 'accepted' | 'rejected') => {
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('trade_offers')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', offerId)

      if (error) throw error
      
      router.refresh()
    } catch (error) {
      console.error('Error updating trade offer:', error)
      alert('Failed to update trade offer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleAction('accepted')}
        disabled={loading}
        className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors disabled:opacity-50"
        title="Accept"
      >
        <Check className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleAction('rejected')}
        disabled={loading}
        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors disabled:opacity-50"
        title="Reject"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}


