import React from 'react'

import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from '@/app/(frontend)/_providers/auth'

const FrontendLayout = ({children} : React.PropsWithChildren) => {
  return (
    <AuthProvider api='rest'>
      {children}
      <Toaster />
    </AuthProvider>
  )
}

export default FrontendLayout
