'use client'

import React, { useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronRight, Loader2, Save } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { DEFAULT_LOGIN_REDIRECT } from '../../_config/routes'
import { onboardingSchema } from '../../_validation'

import { siteConfig } from '@/config/app'
import { ActionResultType } from '@/app/(frontend)/(auth)/auth'
import PhoneInput from '@/components/ui/phone-input'
import { Textarea } from '@/components/ui/textarea'

const OnboardingForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      image: undefined,
    },
  })

  function onSubmit(formData: z.infer<typeof onboardingSchema>) {
    startTransition(async () => {

      try {
        const res = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include',
        })

        const response = await res.json() as ActionResultType

        if ('success' in response) {
          toast.success(response.success, {
            description: response?.description || `Welcome to ${siteConfig.name}`,
          })

          await fetch('/api/users/refresh-token', {
            method: 'POST',
            credentials: 'include',
          })

          router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT)
          router.refresh();
          return
        }

        if ('error' in response) {
          toast.error(response?.error || 'Something went wrong', {
            description: response?.description || 'Please try again.',
          })
        }

      } catch (error) {
        toast.error('Something went wrong', {
          description: 'Please try again',
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is Your Name?</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Joe Doe"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is Your Handle (username)?</FormLabel>
              <div className="flex">
                <div
                  className="flex items-center border border-border px-2 text-muted-foreground rounded border-r-0 cursor-default">@
                </div>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    {...field}
                    prefix="@"
                  />
                </FormControl>
              </div>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is Your Phone Number?</FormLabel>
              <FormControl>
                <PhoneInput
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Introduce your self shortly"
                  disabled={isPending}
                  {...field}
                />
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
              <span>Saving your data...</span>
            </>
          ) : (
            <div className="flex items-center gap-1">Continue <ChevronRight size="20" /></div>
          )}
          <span className="sr-only">Finish onboarding process</span>
        </Button>
      </form>
    </Form>
  )
}

export default OnboardingForm
