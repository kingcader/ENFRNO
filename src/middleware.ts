import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Check if we're in demo mode (no Supabase configured)
function checkDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) return true
  if (url.includes('your_supabase') || url.includes('your-project')) return true
  if (key.includes('your_supabase') || key.includes('your-anon-key')) return true
  
  return false
}

export async function middleware(request: NextRequest) {
  // In demo mode, allow all requests (auth handled client-side)
  if (checkDemoMode()) {
    return NextResponse.next()
  }

  // Supabase mode - handle auth server-side
  try {
    const { updateSession } = await import('@/lib/supabase/middleware')
    return await updateSession(request)
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
