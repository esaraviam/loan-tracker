import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['dashboard', 'loan']

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value

  const isProtected = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(`/${route}`)
  )

  if (!userId && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/loan/:path*'],
}
