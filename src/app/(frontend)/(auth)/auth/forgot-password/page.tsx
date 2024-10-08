import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import AuthCardWrapper from '../../_components/auth-card-wrapper'
import { LOGIN_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { ForgotPasswordForm } from '@/app/(frontend)/(auth)/_components/forms/forgot-password-form'
import { Metadata } from 'next'
import { cn } from '@/utilities/cn'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Forgot your password?",
  description: "Provide your email address to receive a reset link",
}

const ForgotPasswordPage = () => {
  return (
    <AuthCardWrapper
      title='Forgot Password?'
      subtitle='Enter your email to receive a reset link'
      className='space-y-2'
    >
      <ForgotPasswordForm />
      <Link
        aria-label="Back to the sign in page"
        href={LOGIN_PAGE}
        className={cn(buttonVariants({variant: "outline"}), 'w-full')}
      >
        Cancel
      </Link>
    </AuthCardWrapper>
  )
}

export default ForgotPasswordPage
