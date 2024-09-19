import React from 'react'
import Link from 'next/link'
import { REGISTRATION_PAGE } from '../_config/routes'
import AuthCardWrapper from '../_components/auth-card-wrapper'
import SignInWithPasswordForm from '../_components/forms/sign-in-with-password-form'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Login",
  description: "Sign in to your account",
}

const LoginPage = () => {
  return (
    <AuthCardWrapper
      title="Login"
      subtitle="Enter your email below to login to your account"
      footer={(
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href={REGISTRATION_PAGE} className="underline">
            Sign up
          </Link>
        </div>
      )}
    >
      <SignInWithPasswordForm />
      {/*<Button variant="outline" className="w-full">*/}
      {/*  Login with Google*/}
      {/*</Button>*/}
    </AuthCardWrapper>
  )
}

export default LoginPage
