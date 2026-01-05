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
    const { createMiddlewareClient } = await import('@/lib/supabase/middleware')
    const response = NextResponse.next({ request })
    const supabase = createMiddlewareClient(request, response)
    
    // Refresh session
    await supabase.auth.getSession()
    
    return response
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
