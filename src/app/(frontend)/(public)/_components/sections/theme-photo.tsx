'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ThemePhoto = () => {
  return (
    <div className='flex h-screen absolute top-0 right-0 w-screen'>
      <div className='w-0 lg:w-1/2'></div>
      <motion.div
        className="hidden bg-background md:block grayscale object-contain h-screen w-full lg:w-1/2"
        initial={{ opacity: 1, filter: "blur(0px)", }}
        animate={{ opacity: 0, filter: "blur(10px)", }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Image
          src="/family-jesus-2nd-coming.png"
          alt="Image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center dark:hidden"
        />
      </motion.div>
    </div>
  )
}

export default ThemePhoto
