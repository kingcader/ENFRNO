import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">
      <div className="text-center px-4">
        <Flame className="w-20 h-20 text-orange-500 mx-auto mb-6 flame-logo" />
        <h1 className="text-6xl md:text-8xl font-black mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like this page went up in flames. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/browse" className="btn-secondary">
            Browse Sneakers
          </Link>
        </div>
      </div>
    </div>
  )
}



