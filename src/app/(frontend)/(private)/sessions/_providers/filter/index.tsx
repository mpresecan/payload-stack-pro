'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { FilterContext, SessionTabs, SortBy } from './types'
import { Session } from '@/payload-types'


const Context = createContext({} as FilterContext)

export const SessionFilterProvider = ({ children }: React.PropsWithChildren) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [tab, setTab] = useState<SessionTabs>('all')
  const [search, setSearch] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortBy>('popularity')

  useEffect(() => {
    // fetch sessions
    console.log('FILTERS SETUP')
    console.log('tab:', tab)
    console.log('search:', search)
    console.log('tags:', tags)
    console.log('sortBy:', sortBy)
    console.log('------------------')
  }, [tab, search, tags, sortBy])

  return (
    <Context.Provider value={{
      sessions,
      tab, setTab,
      search, setSearch,
      selectedTags: tags, setSelectedTags: setTags,
      sortBy, setSortBy,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
