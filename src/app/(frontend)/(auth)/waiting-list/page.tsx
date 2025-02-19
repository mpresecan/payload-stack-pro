import React from 'react'

import AuthCardWrapper from '@/app/(frontend)/(auth)/_components/auth-card-wrapper'
import LogoutButton from '@/app/(frontend)/(auth)/_components/logout-button'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Waiting list",
  description: "Your request for the 3th Annual Advent UNconfernece is submitted successfully!",
}

const Page = () => {
  return (
    <div>
      <AuthCardWrapper
        title='Your request for the 3th Annual Advent UNconfernece is submitted successfully!'
        subtitle='We will contact you soon, and once your request is approved you will get the notification in your inbox. We appreciate your patience and are excited to have you join us soon!'
      >
        <LogoutButton>Logout for now</LogoutButton>
      </AuthCardWrapper>
    </div>
  )
}

export default Page
