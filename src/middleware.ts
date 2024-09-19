import { NextRequest } from 'next/server'
import { sessionUser } from '@/app/(frontend)/auth/lib'

import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PAGE,
  ONBOARDING_PAGE,
  publicRoutes,
} from '@/app/(frontend)/auth/_config/routes'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

export default async function middleware(request: NextRequest) {

  const user = await sessionUser(request);
  const {nextUrl} = request;

  const isLoggedIn = !!user;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // if logged in, do not open auth pages
    return null;
  }

  // finally protect every page that is not public
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
      `${LOGIN_PAGE}?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }

  // check if user has not completed onboarding
  if(!isPublicRoute && isLoggedIn && !user?.fullName && nextUrl.pathname !== ONBOARDING_PAGE) {
    let callbackUrl = nextUrl.pathname;

    if(nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
      `${ONBOARDING_PAGE}?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }

  // prevent logged-in user with onboarding to access onboarding page
  if(isLoggedIn && user?.fullName && nextUrl.pathname === ONBOARDING_PAGE) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // prevent non-admin user from accessing admin routes
  // const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  // if(isLoggedIn && isAdminRoute && user.role !== 'admin') {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  // is public route, so ignore, and mind your own business
  return null;
}
