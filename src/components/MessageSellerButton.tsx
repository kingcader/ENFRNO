'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'

interface MessageSellerButtonProps {
  listingId: string
  sellerId: string
  sellerName: string
}

export default function MessageSellerButton({ listingId, sellerId, sellerName }: MessageSellerButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        setIsLoggedIn(!!getDemoUser())
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          setIsLoggedIn(!!user)
        } catch {
          setIsLoggedIn(false)
        }
      }
    }
    checkAuth()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)

    try {
      if (isDemoMode()) {
        // Demo mode - just simulate success
        await new Promise(resolve => setTimeout(resolve, 500))
        setSuccess(true)
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) throw new Error('Not logged in')

        // @ts-expect-error - Supabase types not generated
        const { error } = await supabase
          .from('messages')
          .insert({
            sender_id: user.id,
            receiver_id: sellerId,
            listing_id: listingId,
            content: message.trim(),
          })

        if (error) throw error
        setSuccess(true)
      }

      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
        setMessage('')
      }, 2000)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex-1 flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Message Seller
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
        <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl w-full max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#222]">
            <div>
              <h2 className="text-xl font-bold">Message {sellerName}</h2>
              <p className="text-sm text-gray-400 mt-1">Ask a question about this listing</p>
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
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-400">The seller will respond soon</p>
            </div>
          ) : !isLoggedIn ? (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Login Required</h3>
              <p className="text-gray-400 mb-6">You need to be logged in to message sellers</p>
              <a href="/login" className="btn-primary inline-block">
                Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I'm interested in this listing..."
                className="input min-h-[150px] resize-none mb-4"
                rows={5}
                autoFocus
              />
              
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
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
