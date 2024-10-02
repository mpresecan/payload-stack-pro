
// AUTH PAGES
export const LOGIN_PAGE = '/login'
export const REGISTRATION_PAGE = '/register'
export const SUCCESSFUL_REGISTRATION_PAGE = '/auth/successful-registration'
export const SUCCESSFUL_PASSWORD_RESET_PAGE = '/auth/password-reset-successful'
export const RESET_PASSWORD_PAGE = '/auth/reset-password'
export const FORGOT_PASSWORD_PAGE = '/auth/forgot-password'
export const VERIFY_EMAIL_PAGE = '/auth/verify-email'
export const LOGOUT_PAGE = '/auth/logout';
export const EMAIL_VERIFICATION_PAGE = '/auth/verify-email';
export const REVERIFY_EMAIL_PAGE = '/auth/reverify-email';

// OTHER PAGES
export const HELP_CENTER_PAGE = '/help-center' as const;
export const TOS_PAGE = '/tos' as const;
export const PRIVACY_PAGE = '/privacy' as const;
export const WAITING_LIST_PAGE = '/waiting-list' as const;

// DASHBOARD PAGES
export const DASHBOARD_PAGE = '/sessions';
export const DASHBOARD_ACCOUNT_PAGE = '/dashboard/account' as const;
export const DASHBOARD_SETTINGS_PAGE = '/dashboard/settings' as const;
export const ONBOARDING_PAGE = '/onboarding' as const;

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * */
export const publicRoutes = [
  '/',
  EMAIL_VERIFICATION_PAGE, // because we want to allow users to verify their email from their settings page
  HELP_CENTER_PAGE,
  TOS_PAGE,
  PRIVACY_PAGE,
  '/email-preview',
  '/test',
  SUCCESSFUL_REGISTRATION_PAGE,
  SUCCESSFUL_PASSWORD_RESET_PAGE,
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged-in users to /settings
 * @type {string[]}
 * */
export const authRoutes = [
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  RESET_PASSWORD_PAGE,
  FORGOT_PASSWORD_PAGE,
  REVERIFY_EMAIL_PAGE,
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 * */
export const apiAuthPrefix = '/auth/api';

/**
 * The default redirect route after a user logs in
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT = DASHBOARD_PAGE;
export const DEFAULT_LOGOUT_PAGE = LOGIN_PAGE;
export const ACCOUNT_PAGE = DASHBOARD_ACCOUNT_PAGE;
