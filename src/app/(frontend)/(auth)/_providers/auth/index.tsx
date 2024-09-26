'use client'

import type { Permissions } from 'payload'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { User } from '@/payload-types'
import type { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

import { USER, gql } from './gql'
import { rest } from './rest'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGOUT_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { ActionResultType } from '@/app/(frontend)/(auth)/auth'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ api?: 'gql' | 'rest'; children: React.ReactNode }> = ({
                                                                                              api = 'rest',
                                                                                              children,
                                                                                            }) => {
  const [user, setUser] = useState<User | null>()
  const [permissions, setPermissions] = useState<Permissions | null>(null)
  const router = useRouter()

  const create = useCallback<Create>(
    async (args) => {

      if (api === 'rest') {
        try {
          const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, args) as User
          setUser(user)
          return {
            success: "Success!",
            description: "Check your inbox to verify your email address."
          }
        } catch (error) {
          return {
            error: error.message || "Something went wrong",
            description: "Please try again."
          }
        }
      }

      if (api === 'gql') {
        const { createUser: user } = await gql(`mutation {
        createUser(data: { email: "${args.email}", password: "${args.password}" }) {
          ${USER}
        }
      }`)

        setUser(user)
        return user
      }
    },
    [api],
  )

  const login = useCallback<Login>(
    async (args, callbackUrl) => {

      if (api === 'rest') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(args),
          headers: { 'Content-Type': 'application/json' },
          // credentials: 'include',
        })// custom endpoint

        const result = await res.json() as ActionResultType;

        if('user' in result) {
          setUser(result.user)
        }
        return result;
      }

      if (api === 'gql') {
        const { loginUser } = await gql(`mutation {
          loginUser(email: "${args.email}", password: "${args.password}") {
            user {
              ${USER}
            }
            exp
          }
        }`)

        setUser(loginUser?.user)
        if(loginUser.user) {
          return {
            success: loginUser.user.name ? `Hi ${loginUser.user.name}!` : 'Success!',
            description: loginUser.user.name ? "It is nice to see you back." : "Welcome to our community!",
            user: loginUser.user
          }
        }
        else {
          return {
            error: "Something went wrong",
            description: "Please try again."
          }
        }
      }

      return {
        error: "Something went wrong",
        description: "Please try again."
      }
    },
    [api],
  )

  const logout = useCallback<Logout>(async () => {
    if (api === 'rest') {
      await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`)
      setUser(null)
      router.push(DEFAULT_LOGOUT_PAGE)
      return
    }

    if (api === 'gql') {
      await gql(`mutation {
        logoutUser
      }`)

      setUser(null)
      router.push(DEFAULT_LOGOUT_PAGE)
    }
  }, [router, api])

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
          {},
          {
            method: 'GET',
            cache: 'force-cache',
            next: { revalidate: 600 },
          },
        )
        setUser(user)
      }

      if (api === 'gql') {
        const { meUser } = await gql(`query {
          meUser {
            user {
              ${USER}
            }
            exp
          }
        }`)

        setUser(meUser.user)
      }
    }

    void fetchMe()
  }, [api])

  const forgotPassword = useCallback<ForgotPassword>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
          args,
        )
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { forgotPasswordUser } = await gql(`mutation {
        forgotPasswordUser(email: "${args.email}")
      }`)

        return forgotPasswordUser
      }
    },
    [api],
  )

  const resetPassword = useCallback<ResetPassword>(
    async (args) => {
      if (api === 'rest') {
        const user = await rest(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
          args,
        )
        setUser(user)
        return user
      }

      if (api === 'gql') {
        const { resetPasswordUser } = await gql(`mutation {
        resetPasswordUser(password: "${args.password}", token: "${args.token}") {
          user {
            ${USER}
          }
        }
      }`)

        setUser(resetPasswordUser.user)
        return resetPasswordUser.user
      }
    },
    [api],
  )

  return (
    <Context.Provider
      value={{
        create,
        forgotPassword,
        login,
        logout,
        permissions,
        resetPassword,
        setPermissions,
        setUser,
        user,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context)
