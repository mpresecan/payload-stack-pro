import { generateMetadata } from '@/app/(frontend)/(public)/[slug]/page'
import React from 'react'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import Hero2 from '@/app/(frontend)/(public)/_components/sections/hero'
import Logos from './_components/sections/logos'
import Problem from './_components/sections/problem'
import Solution from './_components/sections/solution'
import HowItWorks from './_components/sections/how-it-works'
import TestimonialsCarousel from "./_components/sections/testimonials-carousel";
export { generateMetadata }

const Page = async () => {

  const user = await sessionUser()

  return (
    <main className="flex-grow">
      <Hero2 />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      <TestimonialsCarousel />
    </main>
  )
}

export default Page
