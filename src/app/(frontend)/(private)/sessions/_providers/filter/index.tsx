'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { FilterContext, SessionTabs, SortBy } from './types'
import { Session } from '@/payload-types'


const Context = createContext({} as FilterContext)

export const SessionFilterProvider = ({ children }: React.PropsWithChildren) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [tab, setTab] = useState<SessionTabs>('all')
  const [search, setSearch] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortBy>('popularity')
  const [showPastSessions, setShowPastSessions] = useState<boolean>(false)

  useEffect(() => {
    // fetch sessions
    console.log('FILTERS SETUP')
    console.log('tab:', tab)
    console.log('search:', search)
    console.log('selectedTags:', selectedTags)
    console.log('sortBy:', sortBy)
    console.log('showPastSessions:', showPastSessions)
    console.log('sessions:', sessions)
    console.log('------------------')
  }, [tab, search, selectedTags, sortBy, showPastSessions])



  return (
    <Context.Provider value={{
      sessions,
      tab, setTab,
      search, setSearch,
      selectedTags, setSelectedTags,
      sortBy, setSortBy,
      showPastSessions,
      setShowPastSessions,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
