import React from 'react'
import EmailRenderer from '@/components/email/email-renderer'
import { ForgotPasswordEmail } from '@/app/(frontend)/(auth)/_components/emails/forgot-password-email'
import { EmailTemplate } from '@/components/email/email-template'

const _page = () => {
  return (
    <div>
      <EmailRenderer reactEmail={<ForgotPasswordEmail userName='misko' resetPasswordToken='123456' />} />
    </div>
  )
}

export default _page
