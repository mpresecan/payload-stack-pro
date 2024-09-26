'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useSessionFilter } from '../_providers/filter'

const SessionSortBy = () => {
  const { sortBy, setSortBy } = useSessionFilter()

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popularity">Sort by Popularity</SelectItem>
        <SelectItem value="date">Sort by Date</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SessionSortBy
