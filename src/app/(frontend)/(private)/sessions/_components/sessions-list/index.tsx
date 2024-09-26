'use client'

import React from 'react'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'

const SessionsList = () => {
  const {sessionDocs} = useSessionFilter()

  return (
    <div>
      {JSON.stringify(sessionDocs, null, 2)}
    </div>
  )
}

export default SessionsList
