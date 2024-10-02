import React from 'react'

import AuthCardWrapper from '../../_components/auth-card-wrapper'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Success! Check your inbox!",
  description: "Check your inbox to verify your email address",
}

const Page = () => {
  return (
    <div>
      <AuthCardWrapper
        title='Success! Check your inbox to verify your email address'
        subtitle='You can close this tab.'
      >
        <></>
      </AuthCardWrapper>
    </div>
  )
}

export default Page
