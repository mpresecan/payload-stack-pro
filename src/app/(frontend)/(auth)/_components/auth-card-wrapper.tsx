'use client'

import React from 'react'
import {motion} from 'framer-motion'

const ease = [0.16, 1, 0.3, 1];

interface AuthCardWrapperProps {
  children: React.ReactNode
  footer?: React.ReactNode
  title: string
  subtitle?: string
}

const AuthCardWrapper = ({children, title, subtitle, footer} : AuthCardWrapperProps) => {
  return (
    <div className="mx-auto grid w-[380px] gap-6">
      <motion.div
        className="grid gap-2"
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          {title}
        </motion.h1>
        {subtitle &&
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease,
            }}
          >
            {subtitle}
          </motion.p>
        }
      </motion.div>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          delay: 0.4,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className='w-full'
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          delay: 0.9,
        }}
      >
        {footer}
      </motion.div>
    </div>
)
}

export default AuthCardWrapper
