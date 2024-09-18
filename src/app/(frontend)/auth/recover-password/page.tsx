import React from 'react'
import { Button } from '@/components/ui/button'
import { PasswordField } from '../_components/password-field'
import AuthCardWrapper from '../_components/auth-card-wrapper'

const ResetPasswordPage = () => {
  return (
    <AuthCardWrapper title="Recover Password" subtitle="Enter your new password">
      <PasswordField confirmPassword={true} />
      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </AuthCardWrapper>
  )
}

export default ResetPasswordPage
