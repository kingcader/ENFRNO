'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { ListingWithSeller } from '@/types/database'

interface ListingCardProps {
  listing: ListingWithSeller
  showSeller?: boolean
}

export default function ListingCard({ listing, showSeller = false }: ListingCardProps) {
  const conditionLabels = {
    deadstock: 'DS',
    like_new: 'VNDS',
    used: 'Used',
    worn: 'Worn',
  }

  return (
    <Link href={`/listing/${listing.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-100">
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-4xl italic opacity-50">
            ENFRNO
          </div>
        )}
        
        {/* Overlay gradient - Subtle on light theme */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.open_to_trades && (
            <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
              Trade
            </span>
          )}
        </div>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-end bg-white/90 backdrop-blur-sm border-t border-gray-100">
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">Condition</span>
            <span className="text-[#111] font-black">{conditionLabels[listing.condition]}</span>
          </div>
          <button className="bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-all">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-sm uppercase leading-tight line-clamp-2 text-[#111] group-hover:text-orange-600 transition-colors">
            {listing.title}
          </h3>
          <span className="font-bold text-lg whitespace-nowrap text-[#111]">
            ${listing.price.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium uppercase tracking-wide">
          <span>{listing.size}</span>
          {showSeller && listing.profiles && (
            <span className="flex items-center gap-1">
              {listing.profiles.username}
              {listing.profiles.is_verified && (
                <span className="text-blue-500 text-[10px]">✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
