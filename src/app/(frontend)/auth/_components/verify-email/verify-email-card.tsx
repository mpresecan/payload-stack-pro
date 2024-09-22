'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ErrorCallToAction, SuccessCallToAction } from '@/app/(frontend)/auth/_components/verify-email/call-to-actions'
import AuthCardWrapper from '@/app/(frontend)/auth/_components/auth-card-wrapper'
import { Loader2 } from 'lucide-react'


interface VerifyEmailCardProps {
  token?: string | string[],
}

const VerifyEmailCard = ({token}: VerifyEmailCardProps) => {
  const [isVerified, setIsVerified] = useState<boolean|null>(null)

  const onSubmit = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/verify/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if(data.errors) {
        setIsVerified(false);
      } else {
        setIsVerified(true);
      }
    } catch(error) {
      console.log(error);
    }
  }, [token])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])


  if(isVerified === true) {
    return (
      <AuthCardWrapper
        title="Your email is succesfully verified!"
        subtitle="You can now sign in to your account"
      >
        <SuccessCallToAction />
      </AuthCardWrapper>
    )
  }

  if(isVerified === false) {
    return (
      <AuthCardWrapper
        title="Failed to verify email"
        subtitle="Please return to the sign up page and try again"
      >
        <ErrorCallToAction />
      </AuthCardWrapper>
    )
  }


  return (
    <AuthCardWrapper
      title="Verifying Email"
      subtitle="Please wait while we verify your email"
    >
      <div className="flex justify-start mt-4">
        <Loader2 size={32} className='animate-spin'/>
      </div>
    </AuthCardWrapper>
  )
}

export default VerifyEmailCard
