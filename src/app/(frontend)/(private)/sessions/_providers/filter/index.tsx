'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { FilterContext, SessionTabs, SortBy } from './types'
import { Session } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


const Context = createContext({} as FilterContext)

export const SessionFilterProvider = ({ children }: React.PropsWithChildren) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [tab, setTabValue] = useState<SessionTabs>('all')
  const [search, setSearchValue] = useState<string>('')
  const [selectedTags, setSelectedTagsValues] = useState<string[]>([])
  const [sortBy, setSortByValue] = useState<SortBy>('popularity')
  const [queryPastSessions, setQueryPastSessionsValue] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // set selected tags
  const setTab: typeof setTabValue = useCallback((newTab: SessionTabs) => {
    console.log('newTab:', newTab)
    const params = new URLSearchParams(searchParams)
    if(newTab === 'all') {
      params.delete('tab')
    } else {
      params.set('tab', newTab)
    }
    replace(`${pathname}?${params.toString()}`)
    setTabValue(newTab)
  }, [searchParams, pathname, replace])

  // set query past sessions
  const setQueryPastSessions: typeof setQueryPastSessionsValue = useCallback((showPastSessions: boolean) => {
    console.log('showPastSessions:', showPastSessions)
    const params = new URLSearchParams(searchParams)
    if(!showPastSessions) {
      params.delete('past')
    } else {
      params.set('past', 'true')
    }
    if(['proposals', 'scheduled'].includes(tab) && showPastSessions) {
      setTabValue('all')
      params.delete('tab')
    }
    replace(`${pathname}?${params.toString()}`)
    setQueryPastSessionsValue(showPastSessions)
  }, [searchParams, pathname, replace, tab])

  // set search
  const setSearch: typeof setSearchValue = useCallback((newSearch: string) => {
    console.log('newSearch:', newSearch)
    const params = new URLSearchParams(searchParams)
    if(newSearch === '') {
      params.delete('s')
    } else {
      params.set('s', newSearch)
    }
    replace(`${pathname}?${params.toString()}`)
    setSearchValue(newSearch)
  }, [searchParams, pathname, replace])

  // set sort by
  const setSortBy: typeof setSortByValue = useCallback((newSortBy: SortBy) => {
    console.log('newSortBy:', newSortBy)
    const params = new URLSearchParams(searchParams)
    if(newSortBy === 'popularity') {
      params.delete('sort-by')
    } else {
      params.set('sort-by', newSortBy)
    }
    replace(`${pathname}?${params.toString()}`)
    setSortByValue(newSortBy)
  }, [searchParams, pathname, replace])

  // set selected tags
  const setSelectedTags: typeof setSelectedTagsValues = useCallback((tags: string[]) => {
    console.log('tags:', tags)
    const params = new URLSearchParams(searchParams)
    if(tags.length === 0) {
      params.delete('tags')
    } else {
      params.set('tags', tags.join(','))
    }
    replace(`${pathname}?${params.toString()}`)
    setSelectedTagsValues(tags)
  }, [searchParams, pathname, replace])


  return (
    <Context.Provider value={{
      sessions,
      tab, setTab,
      search, setSearch,
      selectedTags, setSelectedTags,
      sortBy, setSortBy,
      queryPastSessions,
      setQueryPastSessions,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
