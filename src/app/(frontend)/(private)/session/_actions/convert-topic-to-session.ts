'use server'

import * as z from 'zod'
import { newSessionSchema } from '@/app/(frontend)/(private)/session/_validation'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { User } from '@/payload-types'

type NewSessionFormValues = z.infer<typeof newSessionSchema>

export const convertTopicToSession = async (formData: NewSessionFormValues, sessionId: string | number | undefined) => {
  if(!sessionId) {
    throw new Error('Session ID not found')
  }

  const values = newSessionSchema.parse(formData)

  const user = await sessionUser();
  if(!user) {
    throw new Error('User not found')
  }

  const payload = await getPayload()
  const session = await payload.findByID({
    collection: COLLECTION_SLUG_SESSIONS,
    id: sessionId,
  })

  if(!session) {
    throw new Error('Session not found')
  }

  const presenters = session.presenters && session.presenters as User[] || []

  return await payload.update({
    collection: COLLECTION_SLUG_SESSIONS,
    id: sessionId,
    data: {
      ...session,
      ...values,
      status: 'proposed',
      presenters: [...presenters.map(p => p.id), user.id],
      fullDescription: values.fullDescription ? JSON.parse(values.fullDescription!) : undefined,
    }
  })
}
