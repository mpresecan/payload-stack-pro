import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PasswordField } from '@/components/auth/password-component'

const ResetPasswordPage = () => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Recover Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your new password
        </p>
      </div>
      <div className="grid gap-4">
        <PasswordField confirmPassword={true} />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  )
}

export default ResetPasswordPage
