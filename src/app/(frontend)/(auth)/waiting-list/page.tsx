import React from 'react'

import AuthCardWrapper from '@/app/(frontend)/(auth)/_components/auth-card-wrapper'
import LogoutButton from '@/app/(frontend)/(auth)/_components/logout-button'

const Page = () => {
  return (
    <div>
      <AuthCardWrapper
        title='You are now on the waiting list for early access.'
        subtitle='Please wait for our approval notification in your inbox. We appreciate your patience and are excited to have you join us soon!'
      >
        <LogoutButton  />
      </AuthCardWrapper>
    </div>
  )
}

export default Page
