'use server'

import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { User } from '@/payload-types'

export const joinAsCoPresenter = async (sessionId: string) => {
  const user = await sessionUser()
  if (!user) throw new Error('User not found')

  const payload = await getPayload()
  const session = await payload.findByID({
    collection: COLLECTION_SLUG_SESSIONS,
    id: sessionId,
  })

  if (!session) throw new Error('Session not found')

  const presenters = session.presenters as User[];
  if(!presenters) throw new Error('Presenters not found')

  if(presenters.some(presenter => presenter.id === user.id)) return;

  await payload.update({
    collection: COLLECTION_SLUG_SESSIONS,
    id: sessionId,
    data: {
      presenters: [...presenters.map(p => p.id), user.id],
  }});

  return true;
}
