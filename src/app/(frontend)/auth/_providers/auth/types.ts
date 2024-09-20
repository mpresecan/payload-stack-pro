import type { Permissions } from 'payload'
import * as z from 'zod'

import type { User } from '@/payload-types'
import { signUpWithPasswordSchema } from '@/app/(frontend)/auth/_validation'
import { ActionResultType } from '@/app/(frontend)/auth/auth'

// eslint-disable-next-line no-unused-vars
export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User>

export type ForgotPassword = (args: { email: string }) => Promise<User>

export type Create = (args: z.infer<typeof signUpWithPasswordSchema>) => Promise<ActionResultType>

export type Login = (args: { email: string, password: string }, callbackUrl: string | null) => Promise<ActionResultType>

export type Logout = () => Promise<void>

export interface AuthContext {
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions?: Permissions | null
  resetPassword: ResetPassword
  setPermissions: (permissions: Permissions | null) => void
  setUser: (user: User | null) => void // eslint-disable-line no-unused-vars
  user?: User | null
}
