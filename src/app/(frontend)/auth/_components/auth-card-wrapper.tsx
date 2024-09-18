import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordField } from '@/app/(frontend)/auth/_components/password-field'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { REGISTER_PAGE } from '@/app/(frontend)/auth/paths'

interface AuthCardWrapperProps {
  children: React.ReactNode
  footer?: React.ReactNode
  title: string
  subtitle?: string
}

const AuthCardWrapper = ({children, title, subtitle, footer} : AuthCardWrapperProps) => {
  return (
    <div className="mx-auto grid w-[380px] gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
      {footer}
    </div>
  )
}

export default AuthCardWrapper
