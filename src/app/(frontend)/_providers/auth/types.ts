import type { Permissions } from 'payload'
import * as z from 'zod'

import type { User } from '@/payload-types'
import { signInWithPasswordSchema, signUpWithPasswordSchema } from '@/app/(frontend)/auth/_validation'

// eslint-disable-next-line no-unused-vars
export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User>

export type ForgotPassword = (args: { email: string }) => Promise<User>

export type Create = (args: z.infer<typeof signUpWithPasswordSchema>) => Promise<User>

export type Login = (args: { email: string, password: string }) => Promise<User>

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
