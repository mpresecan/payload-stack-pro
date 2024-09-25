import { generateMetadata } from '@/app/(frontend)/(public)/[slug]/page'
import React from 'react'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import Hero2 from '@/app/(frontend)/(public)/_components/sections/hero'
import Logos from './_components/sections/logos'
import Problem from './_components/sections/problem'
export { generateMetadata }

const Page = async () => {

  const user = await sessionUser()

  return (
    <main className="flex-grow">
      <Hero2 />
      <Logos />
      <Problem />
    </main>
  )
}

export default Page
