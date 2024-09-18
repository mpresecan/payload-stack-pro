import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PasswordField } from '@/components/auth/password-component'
import { LOGIN_PAGE } from '../paths'

const SingUpPage = () => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-muted-foreground">
          Enter your information to create an account account
        </p>
      </div>
      <div className="grid gap-4">
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
        <div className="grid gap-2">
          <PasswordField />
        </div>
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        {/*<Button variant="outline" className="w-full">*/}
        {/*  Sign up with GitHub*/}
        {/*</Button>*/}
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href={LOGIN_PAGE} className="underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default SingUpPage
