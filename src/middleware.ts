import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. Strict Security & OWASP Defense Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 2. Strict Role-Based Access Control (RBAC) Guard for /admin
  // If user opens student dashboard and then changes the URL link to /admin:
  // Immediately redirect to /auth?mode=admin requiring verified admin email/password or admin phone number!
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('police_si_auth_user');
    let hasAdminAccess = false;

    if (authCookie && authCookie.value) {
      try {
        const user = JSON.parse(decodeURIComponent(authCookie.value));
        if (user && user.role === 'ADMIN') {
          hasAdminAccess = true;
        }
      } catch {
        hasAdminAccess = false;
      }
    }

    if (!hasAdminAccess) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      redirectUrl.searchParams.set('mode', 'admin');
      redirectUrl.searchParams.set('redirect', pathname);
      redirectUrl.searchParams.set('blocked', 'admin_clearance_required');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Guard for /dashboard (requires login as student or admin)
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('police_si_auth_user');
    let hasAccess = false;
    if (authCookie && authCookie.value) {
      try {
        const user = JSON.parse(decodeURIComponent(authCookie.value));
        if (user && user.id) {
          hasAccess = true;
        }
      } catch {
        hasAccess = false;
      }
    }

    if (!hasAccess) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      redirectUrl.searchParams.set('mode', 'student');
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 4. Exam Route Cache-Control (Prevents browser question caching)
  if (pathname.startsWith('/exam')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/exam/:path*',
    '/api/:path*',
  ],
};
