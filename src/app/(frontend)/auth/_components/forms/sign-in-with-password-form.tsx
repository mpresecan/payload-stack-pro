'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signInWithPasswordSchema } from '../../_validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { DEFAULT_LOGIN_REDIRECT, RESET_PASSWORD_PAGE } from '../../_config/routes'
import { useSearchParams, useRouter } from 'next/navigation'
import { ActionResultType } from '../../auth'
import { PasswordInput } from '../password-input'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useAuth } from 'src/app/(frontend)/auth/_providers/auth'

const SignInWithPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const router = useRouter()
  // const [showTwoFactor, setShowTwoFactor] = useState(false)
  const { login } = useAuth()

  const form = useForm<z.infer<typeof signInWithPasswordSchema>>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(formData: z.infer<typeof signInWithPasswordSchema>) {
    startTransition(async () => {
      try {

        const result = await login(formData, callbackUrl)

        // if ('specialAction' in result && result.specialAction === 'twoFactorAuth') {
        //   setShowTwoFactor(true);
        // }

        if ('success' in result) {
          toast.success(result.success, {
            description: result.description,
            duration: 5000,
          })

          if(!('specialAction' in result)) {
            router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT)
          }
          return;
        }

        if ('error' in result) {
          toast.error(result?.error || "Something went wrong", {
            description: result?.description || "Please try again.",
            action: result?.action && result.action?.redirect && result.action?.label ? {
              label: result.action?.label,
              onClick: () => router.push(result.action?.redirect || "/")
            } : undefined,
            duration: 7000,
          })
          return;
        }


      } catch (error) {
        toast.error('Something went wrong', {
          description: 'Please try again.',
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="m@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className='pt-2 sm:text-sm' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Password</FormLabel>
                <Link
                  href={RESET_PASSWORD_PAGE}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <><Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />Logging in...</>
          ) : (
            <>
              Login
              <span className="sr-only">Sign in with password</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default SignInWithPasswordForm
