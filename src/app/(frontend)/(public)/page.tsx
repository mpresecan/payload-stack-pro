import { generateMetadata } from '@/app/(frontend)/(public)/[slug]/page'
import React from 'react'
import Hero2 from '@/app/(frontend)/(public)/_components/sections/hero'
import Logos from './_components/sections/logos'
import Problem from './_components/sections/problem'
import Solution from './_components/sections/solution'
import HowItWorks from './_components/sections/how-it-works'
import TestimonialsCarousel from "./_components/sections/testimonials-carousel";
import Topics from './_components/sections/topics'
import FAQ from '@/app/(frontend)/(public)/_components/sections/faq'
import CTA from '@/app/(frontend)/(public)/_components/sections/cta'
export { generateMetadata }

const Page = async () => {

  return (
    <main className="flex-grow">
      <Hero2 />
      <Logos />
      <Problem />
      <Topics />
      <HowItWorks />
      <Solution />
      <TestimonialsCarousel />
      <FAQ />
      <CTA />
    </main>
  )
}

export default Page
