'use client'

import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])
  return <React.Fragment />
}

export default PageClient
