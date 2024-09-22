'use client'

import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'

export default function LogoutButton({ ...props }: Omit<ButtonProps, 'onClick'>) {
  const {logout} = useAuth()

  return (
    <Button onClick={logout} {...props}>
      Logout
    </Button>
  )
}
