'use server'

import * as z from 'zod'
import { newSessionSchema } from '@/app/(frontend)/(private)/session/_validation'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { SessionEvent, User } from '@/payload-types'

type NewSessionFormValues = z.infer<typeof newSessionSchema>

export const updateSession = async (formData: NewSessionFormValues, session: SessionEvent, isTopicSuggestion = false) => {

  const values = newSessionSchema.parse(formData)
  const currentUser = await sessionUser();

  if(!currentUser) {
    throw new Error('User not found')
  }

  const presenters = session.presenters as User[]
  const suggestedBy = session.suggestedBy as User
  if(session.presenters && presenters.some(presenter => presenter.id !== currentUser.id)) {
    throw new Error('User not authorized to update this session')
  }
console.log('presenters', session.presenters)
  const payload = await getPayload()
  return await payload.update({
    collection: COLLECTION_SLUG_SESSIONS,
    id: session.id,
    data: {
      ...session,
      ...values,
      fullDescription: values.fullDescription ? JSON.parse(values.fullDescription!) : undefined,
      presenters: session.presenters ? presenters.map(presenter => presenter.id) : undefined,
      suggestedBy: session.suggestedBy ? suggestedBy.id : undefined,
    }
  });
}
