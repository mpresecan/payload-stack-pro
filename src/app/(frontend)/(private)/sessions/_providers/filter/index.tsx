'use client'

import React, { createContext, useCallback, useContext, useEffect, useState, useTransition } from 'react'
import { SessionTabs, SortBy } from '../../types/params'
import { Session } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterContext } from './types'
import { PaginatedDocs} from 'payload'

const emptySessionDocs: PaginatedDocs<Session> = {
  docs: [],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
}

const Context = createContext({} as FilterContext)

export const SessionFilterProvider = ({ children }: React.PropsWithChildren) => {
  const [sessionDocs, setSessionDocs] = useState<PaginatedDocs<Session>>(emptySessionDocs)
  const [tab, setTabValue] = useState<SessionTabs>('all')
  const [search, setSearchValue] = useState<string>('')
  const [selectedTags, setSelectedTagsValues] = useState<string[]>([])
  const [sortBy, setSortByValue] = useState<SortBy>('popularity')
  const [queryPastSessions, setQueryPastSessionsValue] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  const [isPending, startTransition] = useTransition()

  const updateSessions = useCallback(async (params: URLSearchParams) => {
    try {
      const response = await fetch(`/api/sessions?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'force-cache',
      })
      const results = await response.json()
      if ('error' in results) {
        setIsError(true)
        console.error('Error getting sessions:', results.error)
      } else {
        setSessionDocs(results as PaginatedDocs<Session>)
        console.log('results:', results)
      }
    } catch (error) {
      console.error('Error getting sessions:', error)
      setIsError(true)
    }
  }, [])

  // set selected tags
  const setTab: typeof setTabValue = useCallback((newTab: SessionTabs) => {
    console.log('newTab:', newTab)
    const params = new URLSearchParams(searchParams)
    if (newTab === 'all') {
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
    if (!showPastSessions) {
      params.delete('past')
    } else {
      params.set('past', 'true')
    }
    if (['proposals', 'scheduled'].includes(tab) && showPastSessions) {
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
    if (newSearch === '') {
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
    if (newSortBy === 'popularity') {
      params.delete('sortBy')
    } else {
      params.set('sortBy', newSortBy)
    }
    replace(`${pathname}?${params.toString()}`)
    setSortByValue(newSortBy)
  }, [searchParams, pathname, replace])

  // set selected tags
  const setSelectedTags: typeof setSelectedTagsValues = useCallback((tags: string[]) => {
    console.log('tags:', tags)
    const params = new URLSearchParams(searchParams)
    if (tags.length === 0) {
      params.delete('tags')
    } else {
      params.set('tags', tags.join(','))
    }
    replace(`${pathname}?${params.toString()}`)
    setSelectedTagsValues(tags)
  }, [searchParams, pathname, replace])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    startTransition(() => updateSessions(params))
  }, [searchParams, updateSessions])

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
    }
  }, [initialLoad])

  return (
    <Context.Provider value={{
      sessionDocs,
      tab, setTab,
      search, setSearch,
      selectedTags, setSelectedTags,
      sortBy, setSortBy,
      queryPastSessions,
      setQueryPastSessions,
      isLoading: isPending,
      page: sessionDocs.page,
      canLoadMore: sessionDocs.hasNextPage,
      isError,
      initialLoad,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
