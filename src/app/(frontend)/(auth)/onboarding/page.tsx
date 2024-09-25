import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { siteConfig } from '@/config/app'
import AuthCardWrapper from '../_components/auth-card-wrapper'
import OnboardingForm from '../_components/forms/onboarding-form'

const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: 'Onboarding',
  description: `Welcome to ${siteConfig.name}!`,
}

const OnBoardingPage = () => {
  return (
    <AuthCardWrapper
      title={`Welcome, let's get started!`}
      subtitle="Add your account details"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <OnboardingForm />
      </Suspense>
    </AuthCardWrapper>
  )
}

export default OnBoardingPage
