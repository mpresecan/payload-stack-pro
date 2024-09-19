import { NextRequest, NextResponse } from 'next/server'
import { sessionUser, getJWTFromCookie, validateJWT } from '@/app/(frontend)/auth/lib'
import {cookies} from 'next/headers'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

export default async function middleware(request: NextRequest) {
  const jwt = await sessionUser(request);

  console.log("JWT", jwt)

  return NextResponse.next()
}
