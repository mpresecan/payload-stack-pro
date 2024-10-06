import React from 'react'

import { ThemeProvider } from './theme-provider'
import { CSPostHogProvider } from '@/providers/cs-posthog-provider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      <CSPostHogProvider>
        {children}
      </CSPostHogProvider>
    </ThemeProvider>
  )
}
