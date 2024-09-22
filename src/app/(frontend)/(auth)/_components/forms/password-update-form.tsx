'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '../password-input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { LOGIN_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { resetPasswordSchema } from '../../_validation'
import { JSX } from 'react'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'


type PasswordUpdateFormInputs = z.infer<typeof resetPasswordSchema>

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
                                     resetPasswordToken,
                                   }: PasswordUpdateFormProps): JSX.Element {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const { resetPassword } = useAuth()


  const form = useForm<PasswordUpdateFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(formData: PasswordUpdateFormInputs): void {
    startTransition(async () => {
      try {

        const user = await resetPassword({
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
          token: resetPasswordToken,
        })

        if (user) {
          toast.success('Success!', {
            description: 'Your password has been updated',
          })
          router.push(LOGIN_PAGE)
          return
        }

      } catch (error) {
        toast.error('Something went wrong', {
          description: error.message || 'Please try again',
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Updating...</span>
            </>
          ) : (
            <span>Update password</span>
          )}
          <span className="sr-only">Update password</span>
        </Button>
      </form>
    </Form>
  )
}
