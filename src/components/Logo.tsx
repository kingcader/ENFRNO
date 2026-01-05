'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  variant?: 'icon' | 'full' | 'stacked'
}

export default function Logo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'full' 
}: LogoProps) {
  const dimensions = {
    sm: { width: 24, height: 24, fontSize: 'text-xl' },
    md: { width: 32, height: 32, fontSize: 'text-2xl' },
    lg: { width: 48, height: 48, fontSize: 'text-4xl' },
    xl: { width: 64, height: 64, fontSize: 'text-5xl' },
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const { width, height, fontSize } = dimensions[size]

  if (variant === 'stacked') {
    return (
      <Link href="/" className={`flex flex-col items-center gap-2 group ${className}`}>
        <div className="relative transition-transform duration-300 group-hover:scale-110">
          <Image 
            src="/logo.svg" 
            alt="ENFRNO Logo" 
            width={width * 2} 
            height={height * 2}
            className="w-auto h-auto"
            style={{ width: width * 2, height: height * 2 }}
          />
        </div>
        <span className={`${fontSize} font-black italic tracking-tighter text-white uppercase`}>
          ENFRNO
        </span>
      </Link>
    )
  }

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className={`relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${sizeClasses[size]}`}>
        <Image 
          src="/logo.svg" 
          alt="ENFRNO Logo" 
          width={width} 
          height={height}
          className="w-full h-full object-contain"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {showText && (
        <span className={`${fontSize} font-black italic tracking-tighter text-white uppercase leading-none`}>
          ENFRNO
        </span>
      )}
    </Link>
  )
}
