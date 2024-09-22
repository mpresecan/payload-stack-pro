import 'server-only'

import { type JWT, parseJWT, validateJWT as validateJsonWebToken } from 'oslo/jwt'
import { getPayloadSecret } from './auth.edge'
import { User } from '@/payload-types'
import { NextRequest } from 'next/server'
import {cookies} from 'next/headers'

export const validateJWT = async (jwt: string) => {
  try {
    const decoded = parseJWT(jwt) as (JWT & { payload: User }) | null

    if(!decoded) {
      return null;
    }

    const secret = await getPayloadSecret();

    const isValid = await validateJsonWebToken(decoded.algorithm, new TextEncoder().encode(secret), jwt)
    if(isValid) {
      return decoded
    }

    return null;

  } catch (error) {
    console.error('Error validating JWT:', error)
    return null;
  }
}

export const getJWTFromCookie = (request: NextRequest | undefined = undefined) => {

  if(!request) {
    const cookieStore = cookies()
    return cookieStore.get('payload-token')?.value
  }

  return request.cookies.get('payload-token')?.value
}


export const sessionUser = async (request: NextRequest | undefined = undefined) => {
  const jwtFromCookie = getJWTFromCookie(request)

  if(!jwtFromCookie) {
    return null;
  }

  const session = await validateJWT(jwtFromCookie);

  if(!session) {
    return null;
  }

  return session.payload as User;
}
