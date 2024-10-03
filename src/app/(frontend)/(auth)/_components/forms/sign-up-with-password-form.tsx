'use client'
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { signUpWithPasswordSchema } from '../../_validation'
import { PasswordInput } from '../password-input'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../_providers/auth'
import {toast} from "sonner";
import { SUCCESSFUL_REGISTRATION_PAGE } from '../../_config/routes'

type SignUpWithPasswordFormInputs = z.infer<typeof signUpWithPasswordSchema>

const SignUpWithPasswordForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const {create} = useAuth();

  const form = useForm<SignUpWithPasswordFormInputs>({
    resolver: zodResolver(signUpWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(formData: SignUpWithPasswordFormInputs): void {
    startTransition(async () => {
      try {
        const response = await create(formData)

        if ('success' in response) {
          toast.success(response.success,  {
            description: response.description
          })
          router.push(SUCCESSFUL_REGISTRATION_PAGE)
          return;
        }

        if('error' in response) {
          toast.error(response.error, {
            description: response.description,
            action: response?.action ? {
              label: response.action.label,
              onClick: () => router.push(response.action?.redirect || '/')
            } : undefined,
            duration: 5000,
          })
          return;
        }

        toast.error("Something went wrong", {
          description: "Please try again",
        })

        return;
      } catch (error) {
        toast.error("Something went wrong", {
          description: "Please try again",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className='grid gap-4'
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.revalator@example.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

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

        <Button disabled={isPending} size='lg'>
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signing up...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
          <span className="sr-only">
            Continue signing up with email and password
          </span>
        </Button>
      </form>
    </Form>
  )
}

export default SignUpWithPasswordForm
