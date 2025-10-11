import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname === '/api/metrics') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const duration = Date.now() - startTime;

  const normalizedPath = pathname.replace(/\/\d+/g, '/:id').replace(/\/[a-f0-9-]{36}/g, '/:uuid');

  response.headers.set('X-Response-Time', duration.toString());
  response.headers.set('X-Normalized-Path', normalizedPath);
  response.headers.set('X-Method', method);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
