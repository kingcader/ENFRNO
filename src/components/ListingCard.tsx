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
      <div className="relative aspect-[4/5] bg-[#111] border border-[#222] overflow-hidden mb-4">
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700 font-black text-4xl italic opacity-20">
            ENFRNO
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-0 left-0 p-3 flex flex-col gap-2">
          {listing.open_to_trades && (
            <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              Trade
            </span>
          )}
        </div>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-end">
          <div>
            <span className="text-white/60 text-xs font-bold uppercase tracking-wider block mb-1">Condition</span>
            <span className="text-white font-bold">{conditionLabels[listing.condition]}</span>
          </div>
          <button className="bg-white text-black p-2 hover:bg-orange-500 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-sm uppercase leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
            {listing.title}
          </h3>
          <span className="font-black italic text-lg whitespace-nowrap">
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
