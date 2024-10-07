import 'server-only'

import { Resend } from 'resend';

export const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY)
}

export type ResendEmail = {
  from: string
  to: string
  subject: string
  html: string
  text: string
}

export type ResendEmailBulk = ResendEmail[]
