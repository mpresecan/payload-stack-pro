import React from 'react'

import AuthCardWrapper from '../../_components/auth-card-wrapper'
import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: "Success! Check your inbox!",
  description: "Check your inbox, we have sent you the reset link",
}

const Page = () => {
  return (
    <div>
      <AuthCardWrapper
        title='Success! Check your inbox, we have sent you the reset link'
        subtitle='You can close this tab.'
      >
        <></>
      </AuthCardWrapper>
    </div>
  )
}

export default Page
