import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: { path: string }) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: { path: string }) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Refresh session if expired
    const { data: { session }, error } = await supabase.auth.getSession();

    // Handle authentication for protected routes
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
    const isProtectedRoute = 
      request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/education');

    if (isAuthRoute && session) {
      // Redirect to home if already authenticated
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (isProtectedRoute && !session) {
      // Redirect to login if not authenticated
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check admin role for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const { data: profile } = await supabase
        .from('users_profiles')
        .select('role')
        .eq('id', session?.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    );

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/education/:path*',
    '/auth/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};