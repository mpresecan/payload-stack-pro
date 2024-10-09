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
import { useState, useTransition } from 'react'
import { MultiSelect } from '@/components/ui/multi-select'
import { SessionEvent, SessionTag, User } from '@/payload-types'
import { toast } from 'sonner'
import { addNewSession } from '../_actions/add-new-session'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateSession } from '../_actions/update-sessions'
import { Link } from 'next-view-transitions'
import { Switch } from '@/components/ui/switch'
import { convertTopicToSession } from '../_actions/convert-topic-to-session'

// Extract max lengths from Zod schema
const MAX_TITLE_LENGTH = newSessionSchema.shape.title.maxLength
const MAX_SUMMARY_LENGTH = newSessionSchema.shape.shortDescription.maxLength

type NewSessionFormValues = z.infer<typeof newSessionSchema>

const NewOrUpdateSessionForm = ({ tags, session = undefined, isTopicSuggestion = false, fromTopicSuggestion = false }: {
  tags: SessionTag[],
  session?: SessionEvent,
  isTopicSuggestion?: boolean,
  fromTopicSuggestion?: boolean
}) => {
  const sessionTags = session?.tags as SessionTag[]

  const shouldUpdate = session !== undefined
  const firstPresenter = shouldUpdate ? session?.presenters?.at(0) as User : undefined

  const form = useForm<NewSessionFormValues>({
    resolver: zodResolver(newSessionSchema),
    defaultValues: {
      title: session?.title || '',
      shortDescription: session?.shortDescription || '',
      fullDescription: JSON.stringify(session?.fullDescription) || undefined,
      tags: sessionTags?.map(t => t.id) || [],
      allowMultiplePresenters: session?.allowMultiplePresenters || false,
    },
  })
  const [isPending, startTransition] = useTransition()
  const { user } = useAuth()
  const [isTitleFocused, setIsTitleFocused] = useState(false)
  const router = useRouter()

  async function onSubmit(values: NewSessionFormValues) {
    startTransition(async () => {
      try {
        if(fromTopicSuggestion) {
          const result = await convertTopicToSession(values, session?.id)
          toast.success('Topic converted to session!')
          router.push(`/session/${result.id}`)
        } else {
          const result = shouldUpdate ? await updateSession(values, session, isTopicSuggestion) : await addNewSession(values, isTopicSuggestion)
          toast.success(shouldUpdate ? (isTopicSuggestion ? 'Topic' : 'Session') + ' updated!' : (isTopicSuggestion ? 'Topic' : 'Session') + ' created!')
          router.push(isTopicSuggestion ? `/suggested-topic/${result.id}` : `/session/${result.id}`)
        }
      } catch (error) {
        console.error(error)
        toast.error('Failed to create session', {
          description: error.message,
        })
      }
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto"
          style={{ viewTransitionName: `card-session-${session ? session.id : 'new'}` }}
          standAlone
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="pb-0" standAlone>
            <div className="flex items-center space-x-4">
              <UserAvatar user={user} className="w-16 h-16" />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          placeholder={isTopicSuggestion ? 'I want to learn about...' : 'I want to present about...'}
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
          <CardContent className="space-y-8" standAlone>
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Summary</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder={isTopicSuggestion ? 'Write the questions in which you would like to learn about. More specific you are, easier it would be to find a presenter.' : 'Write a compelling summary to attract participants. This will appear in the session list.'}
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
                    {isTopicSuggestion ? 'Make your questions interesting. This summary will be visible on the topic suggestion list, and should encourage people to click and read more.' : 'Make it catchy! This summary will be visible in the session list and should encourage people to click and read more.'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isTopicSuggestion && (
              <FormField
                control={form.control}
                name="fullDescription"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-lg font-semibold">Full Description</FormLabel>
                    <FormControl>
                      <Editor
                        {...field}
                        placeholder="Enter a full description (optional)"
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground mt-2">
                      A detailed description of your session (optional, max 5000 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-lg font-semibold">Tags</FormLabel>
                  <FormControl>
                    {/*@ts-ignore*/}
                    <MultiSelect options={tags.map((tag) => {
                      return { value: tag.id, label: tag.name }
                    })} placeholder="Select tags..." {...field} />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground mt-2">
                    It is important to select correct tags to attract the right audience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isTopicSuggestion &&
              (!shouldUpdate || (user && firstPresenter && firstPresenter.id === user.id)) &&
              <FormField
                control={form.control}
                name="allowMultiplePresenters"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Allow co-presenters</FormLabel>
                      <FormDescription>
                        Allow others to join your session as co-presenters. They will be able to help present and edit
                        the
                        session details.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />}
          </CardContent>
          <CardFooter className="flex flex-col gap-2" standAlone>
            <Button className="w-full" size="lg">
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Pending...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
              <span className="sr-only">Add new {isTopicSuggestion ? 'topic' : 'suggestion'}</span>
            </Button>
            {session && (
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${isTopicSuggestion || fromTopicSuggestion ? 'suggested-topic' : 'session'}/${session.id}`}>
                  Cancel
                </Link>
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default NewOrUpdateSessionForm
