import React from 'react'
import EmailRenderer from '@/components/email/email-renderer'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import { UserActivatedEmail } from '@/app/(frontend)/(auth)/_components/emails/user-activated-email'
import NotFound from '@/app/not-found'

const page = async () => {
  return NotFound();
  const user = await sessionUser()
  return (
    <div>
      <EmailRenderer reactEmail={<UserActivatedEmail user={user!} />} />
    </div>
  )
}

export default page
