'use server'

import * as z from 'zod'
import { newSessionSchema } from '@/app/(frontend)/(private)/session/_validation'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

  type NewSessionFormValues = z.infer<typeof newSessionSchema>

export const addNewSession = async (formData: NewSessionFormValues, isTopicSuggestion = false) => {

  const values = newSessionSchema.parse(formData)
  const currentUser = await sessionUser();

  if(!currentUser) {
    throw new Error('User not found')
  }

  const payload = await getPayload()
  return await payload.create({
    collection: COLLECTION_SLUG_SESSIONS,
    data: {
      ...values,
      fullDescription: values.fullDescription ? JSON.parse(values.fullDescription!) : undefined,
      type: 'online',
      status: isTopicSuggestion ? 'wished' : 'proposed',
      presenters: isTopicSuggestion ? undefined : [currentUser.id],
      suggestedBy: isTopicSuggestion ? currentUser.id : undefined,
      interestedAttendeesCount: 0,
    }
  });
}
