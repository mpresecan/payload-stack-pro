import React from 'react'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/app/(frontend)/(auth)/_providers/auth'
import ReactQueryProvider from '@/providers/react-query-provider'
import { ViewTransitions } from 'next-view-transitions'

const FrontendLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ViewTransitions>
      <ReactQueryProvider>
        <AuthProvider api="rest">
          {children}
          <Toaster />
        </AuthProvider>
      </ReactQueryProvider>
    </ViewTransitions>
  )
}

export default FrontendLayout
