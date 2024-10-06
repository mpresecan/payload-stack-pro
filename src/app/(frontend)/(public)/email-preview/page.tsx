import React from 'react'
import EmailRenderer from '@/components/email/email-renderer'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import NotFound from '@/app/not-found'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import {
  NewSessionProposalCreatedEmail
} from '@/app/(frontend)/(private)/_components/emails/new-session-proposal-create-email'

const page = async () => {
  return NotFound();
  const user = await sessionUser()
  if (!user) {
    return NotFound();
  }

  const payload = await getPayload()
  const session = await payload.findByID({
    collection: COLLECTION_SLUG_SESSIONS,
    id: '67028b2c0049e7ac3908f2e8'
  })

  return (
    <div>
      <EmailRenderer reactEmail={<NewSessionProposalCreatedEmail user={user!} session={session!} />} />
    </div>
  )
}

export default page
