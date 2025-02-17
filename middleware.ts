import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    // Get NextAuth session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Convert the cookie options to NextResponse compatible format
            request.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.delete(name);
          },
        },
      },
    );

    // Sync Supabase session with NextAuth
    const {
      data: { session: supabaseSession },
    } = await supabase.auth.getSession();

    // Handle authentication for protected routes
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/education");

    if (isAuthRoute && (token || supabaseSession)) {
      // Redirect to home if already authenticated
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isProtectedRoute && !token) {
      // Redirect to login if not authenticated
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check admin role for admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!token?.role || token.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.vercel-analytics.com;",
    );

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/education/:path*",
    "/auth/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
