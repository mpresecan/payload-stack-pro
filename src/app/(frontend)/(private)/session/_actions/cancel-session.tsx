'use server'

import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { User } from '@/payload-types'

export const cancelSession = async (sessionId: string | number) => {
  const user = await sessionUser();

  if (!user) {
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

  const presenters = session.presenters as User[]
  if(presenters.some(presenter => presenter.id !== user.id)) {
    throw new Error('User is not a presenter')
  }

  return await payload.update({
    collection: COLLECTION_SLUG_SESSIONS,
    id: sessionId,
    data: {
      status: 'cancelled',
    }
  })
}
