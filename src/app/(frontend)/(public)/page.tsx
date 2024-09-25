import { generateMetadata } from '@/app/(frontend)/(public)/[slug]/page'
import React from 'react'
import Hero2 from '@/app/(frontend)/(public)/_components/sections/hero'
import Logos from './_components/sections/logos'
import Problem from './_components/sections/problem'
import Solution from './_components/sections/solution'
import HowItWorks from './_components/sections/how-it-works'
import TestimonialsCarousel from "./_components/sections/testimonials-carousel";
import Topics from './_components/sections/topics'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import FAQ from '@/app/(frontend)/(public)/_components/sections/faq'
export { generateMetadata }

const Page = async () => {

  const user = sessionUser()
  return (
    <main className="flex-grow">
      <Hero2 />
      <Logos />
      <Problem />
      <Solution />
      <Topics />
      <HowItWorks />
      <TestimonialsCarousel />
      <FAQ />
    </main>
  )
}

export default Page
