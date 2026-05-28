import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // PROTECT ROUTES
  // 1. Vendor Protection
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Collector Protection
  if (!user && request.nextUrl.pathname.startsWith('/collector/profile')) {
    const url = request.nextUrl.clone()
    url.pathname = '/collector/login'
    return NextResponse.redirect(url)
  }

  // 3. Authenticated Redirection (Prevent accessing login while logged in)
  if (user) {
    const role = user.user_metadata?.role || 'vendor'
    
    // Redirect logged-in vendors away from login pages
    if (role === 'vendor' && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/collector/login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // Redirect logged-in collectors away from login pages
    if (role === 'collector' && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/collector/login')) {
      const url = request.nextUrl.clone()
      url.pathname = '/collector/profile'
      return NextResponse.redirect(url)
    }
  }

  return response
}
