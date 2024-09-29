'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

const queryClient = new QueryClient();

const ReactQueryProvider = ({children}: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      { process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} /> }
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
