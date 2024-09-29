import React from 'react'

import AuthCardWrapper from '@/app/(frontend)/(auth)/_components/auth-card-wrapper'
import LogoutButton from '@/app/(frontend)/(auth)/_components/logout-button'

const Page = () => {
  return (
    <div>
      <AuthCardWrapper
        title='Your request for the 2nd Annual Advent UNconfernece is submitted succesfully!'
        subtitle='We will contact you soon, and once your request is approved you will get the notification in your inbox. We appreciate your patience and are excited to have you join us soon!'
      >
        <LogoutButton>Logout for now</LogoutButton>
      </AuthCardWrapper>
    </div>
  )
}

export default Page
