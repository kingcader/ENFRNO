import Link from 'next/link'
import Logo from './Logo'
import { Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-[#222] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 text-gray-400 text-sm max-w-md">
              The sneaker marketplace built for the culture. Buy, sell, and trade kicks without the fees. No middleman, just heat.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase text-sm tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Browse Sneakers
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Verified Sellers
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Start Selling
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold uppercase text-sm tracking-wide mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222] mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} ENFRNO. All rights reserved. Built for the culture. 🔥
          </p>
        </div>
      </div>
    </footer>
  )
}


