'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useSessionFilter } from '../_providers/filter'

const PastSessionToggle = () => {
  const { queryPastSessions, setQueryPastSessions } = useSessionFilter()

  return (
    <div className="flex items-center space-x-4 grow md:grow-0">
      <div className="flex items-center space-x-2">
        <Switch
          id="show-past-sessions"
          checked={queryPastSessions}
          onCheckedChange={setQueryPastSessions}
        />
        <Label htmlFor="show-past-sessions">Past sessions</Label>
      </div>
    </div>
  )
}

export default PastSessionToggle
