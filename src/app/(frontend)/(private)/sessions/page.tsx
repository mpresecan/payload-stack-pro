import React from 'react'
import SessionTabs from '@/app/(frontend)/(private)/sessions/_components/session-tabs'
import { SessionFilterProvider } from '@/app/(frontend)/(private)/sessions/_providers/filter'

const SessionsPage = () => {

  return (
    <div className='container mx-auto p-4 max-w-4xl mt-12'>
      <h1 className="text-3xl font-bold mb-6">Sessions</h1>
      <SessionFilterProvider>
        <SessionTabs />
      </SessionFilterProvider>
    </div>
  )
}

export default SessionsPage
