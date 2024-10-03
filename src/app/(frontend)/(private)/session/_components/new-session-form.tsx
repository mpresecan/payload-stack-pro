'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { newSessionSchema } from '../_validation'
import { Editor } from '@/components/editor'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'
import { useState } from 'react'

// Extract max lengths from Zod schema
const MAX_TITLE_LENGTH = newSessionSchema.shape.title.maxLength
const MAX_SUMMARY_LENGTH = newSessionSchema.shape.shortDescription.maxLength

type NewSessionFormValues = z.infer<typeof newSessionSchema>

const NewSessionForm = () => {
  const form = useForm<NewSessionFormValues>({
    resolver: zodResolver(newSessionSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
    },
  })
  const { user } = useAuth()
  const [isTitleFocused, setIsTitleFocused] = useState(false)

  function onSubmit(values: NewSessionFormValues) {
    console.log(values)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="pb-0">
            <div className="flex items-center space-x-4">
              <UserAvatar user={user} numberOfInitials={1} />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          placeholder="I want to present about..."
                          {...field}
                          onBlur={() => {
                            field.onBlur()
                            setIsTitleFocused(false)
                          }}
                          onFocus={() => setIsTitleFocused(true)}
                          className={`text-2xl font-bold w-full pr-16 py-2 border-none focus:ring-0 focus:outline-none ${
                            isTitleFocused ? 'border-b-2 border-primary' : ''
                          }`}
                          maxLength={MAX_TITLE_LENGTH!}
                        />
                        <div className="absolute right-3 bottom-2 text-sm text-muted-foreground">
                          {field.value.length}/{MAX_TITLE_LENGTH!}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Summary</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Write a compelling summary to attract participants. This will appear in the session list."
                        className="resize-none min-h-[100px] pr-16"
                        {...field}
                        maxLength={MAX_SUMMARY_LENGTH!}
                      />
                      <div className="absolute right-3 bottom-3 text-sm text-muted-foreground">
                        {field.value.length}/{MAX_SUMMARY_LENGTH}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground mt-2">
                    Make it catchy! This summary will be visible in the session list and should encourage people to
                    click and read more.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg font-semibold">Full Description</FormLabel>
                  <FormControl>
                    <Editor {...field} placeholder="Enter a full description (optional)" />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground mt-2">
                    A detailed description of your session (optional, max 5000 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default NewSessionForm
