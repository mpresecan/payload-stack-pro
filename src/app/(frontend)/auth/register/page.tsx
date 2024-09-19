import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PasswordField } from '../_components/password-field'
import { LOGIN_PAGE } from '../_config/routes'
import AuthCardWrapper from '../_components/auth-card-wrapper'

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
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <PasswordField />
      <Button type="submit" className="w-full">
        Create an account
      </Button>
    </AuthCardWrapper>
  )
}

export default SingUpPage
