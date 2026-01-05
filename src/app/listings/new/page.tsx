'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, AlertCircle, Plus, DollarSign, Package, Repeat } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'
import { getDemoUser } from '@/lib/demo-auth'

const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Yeezy', 'Puma', 'Reebok', 'Converse', 'Vans', 'Other']
const CONDITIONS = [
  { value: 'deadstock', label: 'Deadstock (DS)', desc: 'Brand new, never worn, with tags' },
  { value: 'like_new', label: 'Very Near Deadstock (VNDS)', desc: 'Worn 1-2 times, perfect condition' },
  { value: 'used', label: 'Used', desc: 'Gently used with minor wear' },
  { value: 'worn', label: 'Worn', desc: 'Visible wear but still in good shape' },
]
const SIZES = [
  '4M', '4.5M', '5M', '5.5M', '6M', '6.5M', '7M', '7.5M', '8M', '8.5M', '9M', '9.5M',
  '10M', '10.5M', '11M', '11.5M', '12M', '12.5M', '13M', '14M', '15M', '16M'
]

export default function NewListingPage() {
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Form state
  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [size, setSize] = useState('')
  const [condition, setCondition] = useState('')
  const [price, setPrice] = useState('')
  const [openToTrades, setOpenToTrades] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (!demoUser) {
          router.push('/login')
          return
        }
        setIsLoggedIn(true)
      } else {
        try {
          const { createClient } = await import('@/lib/supabase/client')
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) {
            router.push('/login')
            return
          }
          setIsLoggedIn(true)
        } catch {
          router.push('/login')
          return
        }
      }
      setAuthChecked(true)
    }
    
    checkAuth()
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // For demo, just use placeholder images
    Array.from(files).slice(0, 6 - images.length).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (images.length === 0) {
      setError('Please add at least one photo')
      return
    }

    setLoading(true)

    try {
      if (isDemoMode()) {
        // Demo mode - simulate success
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push('/dashboard')
        return
      }

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Not logged in')

      // Generate slug
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any)
        .from('listings')
        .insert({
          seller_id: user.id,
          title,
          description: description || null,
          brand,
          model: model || null,
          size,
          condition,
          price: parseFloat(price),
          open_to_trades: openToTrades,
          images,
          slug,
          status: 'active'
        })

      if (insertError) throw insertError

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12 pb-24 md:pb-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-[#111] transition-colors mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111] tracking-tight">Create Listing</h1>
          <p className="text-gray-500 mt-2 text-lg">List your sneakers for sale or trade</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-600 font-bold text-sm">Demo Mode</p>
              <p className="text-orange-600/80 text-xs mt-1">
                This form works in demo mode! Your listing won&apos;t be saved to a database.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2 font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#111]">Photos</h2>
                <p className="text-sm text-gray-500">Add up to 6 photos</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {images.map((image, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={image} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 6 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all group">
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" />
                  <span className="text-sm text-gray-500 group-hover:text-orange-600 font-medium">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#111]">Details</h2>
                <p className="text-sm text-gray-500">Tell buyers about your kicks</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Jordan 1 Retro High OG Chicago"
                  className="input bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select brand</option>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Air Jordan 1"
                    className="input bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Size *</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="input bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select size</option>
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Condition *</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="input bg-gray-50 focus:bg-white"
                    required
                  >
                    <option value="">Select condition</option>
                    {CONDITIONS.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your sneakers - condition details, included accessories, etc."
                  className="input bg-gray-50 focus:bg-white min-h-[120px] resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#111]">Pricing</h2>
                <p className="text-sm text-gray-500">Set your asking price</p>
              </div>
            </div>

            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="input pl-10 text-3xl font-bold text-[#111] bg-gray-50 focus:bg-white h-16"
                min="0"
                step="1"
                required
              />
            </div>
          </div>

          {/* Trade Options */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Repeat className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#111]">Trade Options</h2>
                <p className="text-sm text-gray-500">Are you open to trades?</p>
              </div>
            </div>

            <label className="flex items-center gap-4 cursor-pointer p-6 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/10 transition-all bg-gray-50">
              <input
                type="checkbox"
                checked={openToTrades}
                onChange={(e) => setOpenToTrades(e.target.checked)}
                className="w-6 h-6 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <div>
                <span className="font-bold text-[#111] block mb-1">Open to Trades</span>
                <p className="text-sm text-gray-500">Let buyers offer their sneakers as trade</p>
              </div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center shadow-lg shadow-orange-500/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Publish Listing'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
