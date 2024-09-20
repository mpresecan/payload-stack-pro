import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PasswordField } from '../_components/password-field'
import { LOGIN_PAGE } from '../_config/routes'
import AuthCardWrapper from '../_components/auth-card-wrapper'
import SignUpWithPasswordForm from '@/app/(frontend)/auth/_components/forms/sign-up-with-password-form'

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
