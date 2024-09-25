import { NextRequest } from 'next/server'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PAGE,
  ONBOARDING_PAGE,
  publicRoutes, WAITING_LIST_PAGE,
} from '@/app/(frontend)/(auth)/_config/routes'

export default async function middleware(request: NextRequest) {

  const user = await sessionUser(request);
  const {nextUrl} = request;

  const isLoggedIn = !!user;

  const isAPIRoute = nextUrl.pathname.startsWith('/api');
  if(isAPIRoute) return null; // allow API routes to be accessed

  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isAPIAuthRoute) return null; // do not apply anything, mind your own business

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

  // prevent waiting-list user to use private routes
  if (user?.status === 'waiting-list' && nextUrl.pathname !== WAITING_LIST_PAGE) {
    return Response.redirect(new URL(WAITING_LIST_PAGE, nextUrl))
  }
  // prevent no waiting-list users status to access waiting-list page
  if (nextUrl.pathname === WAITING_LIST_PAGE && user?.status !== 'waiting-list') {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // check if user has not completed onboarding
  if(!isPublicRoute && isLoggedIn && !user?.name && nextUrl.pathname !== ONBOARDING_PAGE) {
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
  if(isLoggedIn && user?.name && nextUrl.pathname === ONBOARDING_PAGE) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // prevent non-admin user from accessing admin routes
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  if(isLoggedIn && isAdminRoute && user.role !== 'admin') {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // is public route, so ignore, and mind your own business
  return null;
}

// Optionally, don't invoke Middleware on some paths
// Clerk's matcher is better than NextAuth's
// https://clerk.com/docs/references/nextjs/auth-middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
