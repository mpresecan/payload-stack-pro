import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthCardWrapper from '@/app/(frontend)/auth/_components/auth-card-wrapper'

const ResetPasswordPage = () => {
  return (
    <AuthCardWrapper title='Reset Password' subtitle='Enter your email to reset your password'>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </AuthCardWrapper>
  )
}

export default ResetPasswordPage
