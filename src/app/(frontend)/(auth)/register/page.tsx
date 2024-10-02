import React from 'react'
import Link from 'next/link'
import { LOGIN_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import AuthCardWrapper from '../_components/auth-card-wrapper'
import SignUpWithPasswordForm from '@/app/(frontend)/(auth)/_components/forms/sign-up-with-password-form'
import { Metadata } from 'next'
import { siteConfig } from '@/config/app'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Register",
  description: `Create an account for ${siteConfig.name}`,
}

const SingUpPage = () => {
  return (
    <AuthCardWrapper
      title="Register"
      subtitle="Enter your information to create an account account"
      footer={(
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href={LOGIN_PAGE} className="underline">
            Sign in
          </Link>
        </div>
      )}
    >
      <SignUpWithPasswordForm />
    </AuthCardWrapper>
  )
}

export default SingUpPage
