import React from 'react'
import EmailRenderer from '@/components/email/email-renderer'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { UserActivatedEmail } from '@/app/(frontend)/(auth)/_components/emails/user-activated-email'
import NotFound from '@/app/not-found'
import {
  NewSuggestionTopicCreatedEmail
} from '@/app/(frontend)/(private)/_components/emails/new-topic-suggestion-created-email'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'

const page = async () => {
  // return NotFound();
  const user = await sessionUser()
  if (!user) {
    return NotFound();
  }

  const payload = await getPayload()
  const session = await payload.findByID({
    collection: COLLECTION_SLUG_SESSIONS,
    id: '67027f816793b49b2a15b5f9'
  })

  return (
    <div>
      <EmailRenderer reactEmail={<NewSuggestionTopicCreatedEmail user={user!} session={session!} />} />
    </div>
  )
}

export default page
