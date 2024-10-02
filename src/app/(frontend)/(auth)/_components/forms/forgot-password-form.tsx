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
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { JSX } from 'react'
import { forgotPasswordSchema } from 'src/app/(frontend)/(auth)/_validation'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'
import { SUCCESSFUL_PASSWORD_RESET_PAGE } from '@/app/(frontend)/(auth)/_config/routes'


type PasswordResetFormInputs = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm(): JSX.Element {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const { forgotPassword } = useAuth()

  const form = useForm<PasswordResetFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(formData: PasswordResetFormInputs): void {
    startTransition(async () => {
      try {
        const response = await forgotPassword(formData)

        toast.success('Success!', {
          description: 'Check your inbox and reset your password',
        })
        router.push(SUCCESSFUL_PASSWORD_RESET_PAGE)
        return;

      } catch (error) {
        toast.error('Something went wrong', {
          description: 'Try again',
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@gmail.com" {...field} />
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
              <span>Pending...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
          <span className="sr-only">Continue resetting password</span>
        </Button>
      </form>
    </Form>
  )
}
