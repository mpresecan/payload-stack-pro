import Image from "next/image"
import React from "react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function Layout({children} : React.PropsWithChildren) {
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
      <div className='flex flex-col px-2 lg:px-0'>
        <Button asChild variant='outline' className='m-4 w-fit rounded-full'>
          <Link href={'/'} className='text-muted-foreground'>
            <ChevronLeft />
            Home
          </Link>
        </Button>
        <div className="flex flex-grow items-center justify-center py-12">
          {children}
        </div>
      </div>
      <div className="hidden bg-background lg:block grayscale object-contain h-screen">
        <Image
          src="/family-jesus-2nd-coming.png"
          alt="family gazing at Jesus during His 2nd coming"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-center dark:brightness-[0.2]"
        />
      </div>
    </div>
  )
}
