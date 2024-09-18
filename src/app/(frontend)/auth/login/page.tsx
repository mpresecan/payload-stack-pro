import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { REGISTER_PAGE, RESET_PASSWORD_PAGE } from '../paths'
import { PasswordField } from '../_components/password-field'
import AuthCardWrapper from '../_components/auth-card-wrapper'
import InputFieldWrapper from '../_components/input-field-wrapper'
import SignInWithPasswordForm from '@/app/(frontend)/auth/_components/forms/sign-in-with-password-form'

const LoginPage = () => {
  return (
    <AuthCardWrapper
      title="Login"
      subtitle="Enter your email below to login to your account"
      footer={(
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href={REGISTER_PAGE} className="underline">
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
