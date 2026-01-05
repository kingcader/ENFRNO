import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'ENFRNO - The Sneaker Marketplace',
  description: 'Buy, sell, and trade authentic sneakers with zero fees.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${oswald.variable}`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <MobileNav />
        <div className="hidden md:block">
          <Footer />
        </div>
      </body>
    </html>
  )
}
