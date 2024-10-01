'use client'

import { motion } from 'framer-motion'
import React from 'react'

const ease = [0.16, 1, 0.3, 1]

const TopDownAnimation = ({ children, className, delay = 0}: {children: React.ReactNode, className?: string, delay?: number}) => {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: -20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default TopDownAnimation
