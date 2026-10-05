import { NextRequest, NextResponse } from 'next/server';

// portfolio.willfullerdesign.com serves the job-hunt portfolio at /;
// the main domain serves the freelance site.
const isPortfolioHost = (req: NextRequest) =>
  (req.headers.get('host') ?? '').startsWith('portfolio.');

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/projects/training-platform') {
    const auth = req.cookies.get('tp-auth');
    if (auth?.value === 'granted') return NextResponse.next();
    return NextResponse.redirect(new URL('/?unlock=training-platform', req.url));
  }

  if (isPortfolioHost(req)) {
    if (pathname === '/') return NextResponse.rewrite(new URL('/portfolio', req.url));
    if (pathname === '/portfolio') return NextResponse.redirect(new URL('/', req.url));
    return NextResponse.next();
  }

  // Main domain: /portfolio lives on the subdomain
  if (pathname === '/portfolio' && req.nextUrl.hostname.endsWith('willfullerdesign.com')) {
    return NextResponse.redirect(`https://portfolio.willfullerdesign.com/${req.nextUrl.search}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/portfolio', '/projects/training-platform'],
};
