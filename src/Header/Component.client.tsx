'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useTheme } from 'next-themes'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [themeState, setThemeState] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setTheme('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (theme && theme !== themeState) setThemeState(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  return (
    <header
      className="container relative z-20 py-8 flex justify-between"
      {...(themeState ? { 'data-theme': themeState } : {})}
    >
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
