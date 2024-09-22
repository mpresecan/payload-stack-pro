'use client'

import React from 'react'
import AuthCardWrapper from '@/app/(frontend)/auth/_components/auth-card-wrapper'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { LOGIN_PAGE } from '@/app/(frontend)/auth/_config/routes'
import { buttonVariants } from '@/components/ui/button'

interface ResetPasswordCardProps {
  token?: string | string[]
}

const ResetPasswordCard = ({token} : ResetPasswordCardProps) => {
  const [resetSuccessful, setResetSuccessful] = React.useState<boolean|null>(null)

  return (
    <AuthCardWrapper
      title="Password Reset"
      subtitle="Set your new Password"
    >
      <div className="flex justify-start mt-4">
        <Loader2 size={32} className='animate-spin'/>
      </div>
    </AuthCardWrapper>
  )
}

export default ResetPasswordCard
