import { NextRequest, NextResponse } from 'next/server'
import {extractJWT} from 'payload'
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities'


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

export default async function middleware(request: NextRequest) {
  const cookieString = request.headers.get('Cookie') || ''

  console.log(cookieString)

  return NextResponse.next()
}
