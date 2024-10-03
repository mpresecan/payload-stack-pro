'use server'

import * as z from 'zod'
import { newSessionSchema } from '@/app/(frontend)/(private)/session/_validation'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'

type NewSessionFormValues = z.infer<typeof newSessionSchema>

export const addNewSession = async (formData: NewSessionFormValues) => {

  const values = newSessionSchema.parse(formData)
  const currentUser = await sessionUser();

  if(!currentUser) {
    throw new Error('User not found')
  }

  const payload = await getPayload()
  const response = await payload.create({
    collection: COLLECTION_SLUG_SESSIONS,
    data: {
      ...values,
      fullDescription: JSON.parse(values.fullDescription!),
      type: 'online',
      status: 'proposed',
      presenters: [currentUser.id],
      interestedAttendeesCount: 0,
    }
  })

  return response;
}
