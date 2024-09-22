import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import AuthCardWrapper from '../../_components/auth-card-wrapper'
import { Metadata } from 'next'
import Link from 'next/link'
import { FORGOT_PASSWORD_PAGE, LOGIN_PAGE } from '@/app/(frontend)/(auth)/_config/routes'
import { cn } from '@/utilities/cn'
import { Loader2, MoveLeft } from 'lucide-react'
import { PasswordUpdateForm } from '@/app/(frontend)/(auth)/_components/forms/password-update-form'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Password Reset",
  description: "Set your new password",
}

interface UpdatePasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}


const ResetPasswordPage = async ({searchParams}: UpdatePasswordPageProps) => {

  const token = searchParams?.token as string


  if(!token) {
    return (
      <AuthCardWrapper
        title="Missing Reset Password Token"
        subtitle="Please return to the sign in page and try again"
      >
        <Link
          aria-label="Go back to sign in page"
          href={LOGIN_PAGE}
          className={cn(buttonVariants({variant: "secondary"}), "w-full")}
        >
          <MoveLeft className="mr-2 h-4 w-4"/>
          <span className="sr-only">Try again</span>
          Try again
        </Link>
      </AuthCardWrapper>
    )
  }


  return (
    <AuthCardWrapper
      title="Password Reset"
      subtitle="Set your new Password"
    >
      <PasswordUpdateForm resetPasswordToken={token} />
      <Link
        aria-label="Cancel password update"
        href={LOGIN_PAGE}
        className={buttonVariants({variant: "outline"})}
      >
        <span className="sr-only">Cancel password update</span>
        Cancel
      </Link>
    </AuthCardWrapper>
  )
}

export default ResetPasswordPage
