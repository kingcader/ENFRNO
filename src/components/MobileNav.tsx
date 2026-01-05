'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-1 p-2 ${isActive('/') ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link 
          href="/browse" 
          className={`flex flex-col items-center gap-1 p-2 ${isActive('/browse') ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Browse</span>
        </Link>

        <Link 
          href="/listings/new" 
          className="flex flex-col items-center gap-1 p-2 -mt-6"
        >
          <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <PlusSquare className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium text-gray-600 mt-1">Sell</span>
        </Link>

        <Link 
          href="/dashboard/trades" 
          className={`flex flex-col items-center gap-1 p-2 ${isActive('/dashboard/trades') ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Inbox</span>
        </Link>

        <Link 
          href="/dashboard" 
          className={`flex flex-col items-center gap-1 p-2 ${isActive('/dashboard') ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}

