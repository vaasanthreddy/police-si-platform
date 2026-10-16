import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected sub-pages that strictly require authenticated student session
const PROTECTED_SUB_ROUTES = [
  '/exam',
  '/previous-papers',
  '/descriptive',
  '/pet-tracker',
  '/calendar',
  '/results',
  '/performance',
  '/upgrade',
  '/admin',
  '/profile'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if route is a protected sub-page
  const isProtected = PROTECTED_SUB_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected) {
    const authCookie = request.cookies.get('police_si_auth_user')?.value;
    
    // If not authenticated, redirect to login page with original callback redirect
    if (!authCookie) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // 2. High-Grade Security Headers (Secured Portal Enforcement)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Secured-Platform', 'Police-SI-Candidate-Portal-TLS-256');

  // 3. Exam Route Anti-Caching Headers
  if (pathname.startsWith('/exam')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, favicon, and public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)$).*)',
  ],
};
