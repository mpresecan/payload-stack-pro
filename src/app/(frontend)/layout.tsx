import React from 'react'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/app/(frontend)/(auth)/_providers/auth'
import ReactQueryProvider from '@/providers/react-query-provider'

const FrontendLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <AuthProvider api="rest">
        {children}
        <Toaster />
      </AuthProvider>
    </ReactQueryProvider>
  )
}

export default FrontendLayout
