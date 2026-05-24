import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('tp-auth');
  if (auth?.value === 'granted') return NextResponse.next();
  return NextResponse.redirect(new URL('/?unlock=training-platform', req.url));
}

export const config = {
  matcher: '/projects/training-platform',
};
