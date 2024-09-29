'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { SessionTabs, SortBy } from '../../types/params'
import { Session } from '@/payload-types'
import { FilterContext } from './types'
import { PaginatedDocs } from 'payload'
import { useQuery } from '@tanstack/react-query'
import deepMerge from '@/utilities/deepMerge'

const Context = createContext({} as FilterContext)

const fetchSessions = async (params: URLSearchParams): Promise<PaginatedDocs<Session>> => {
  const response = await fetch(`/api/sessions?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const SessionFilterProvider = ({ children, initialSessionsDoc }: {children: React.ReactNode, initialSessionsDoc: PaginatedDocs<Session>}) => {
  const [tab, setTabValue] = useState<SessionTabs>('all')
  const [search, setSearchValue] = useState<string>('')
  const [selectedTags, setSelectedTagsValues] = useState<string[]>([])
  const [sortBy, setSortByValue] = useState<SortBy>('popularity')
  const [queryPastSessions, setQueryPastSessionsValue] = useState<boolean>(false)

  const [searchParamsValue, setSearchParamsValue] = useState<URLSearchParams>(new URLSearchParams())
  const [sessionDocs, setSessionDocs] = useState<PaginatedDocs<Session>>(initialSessionsDoc)

  const { data, isLoading, isFetching, isError, refetch } = useQuery<PaginatedDocs<Session>, Error>({
    queryKey: [deepMerge(Object.fromEntries(searchParamsValue.entries()), { action: 'sessions'})],
    queryFn: () => fetchSessions(searchParamsValue),
    refetchInterval: 10000, // 10 seconds polling
    staleTime: 0, // Always consider data stale to enable immediate refetching
    initialData: initialSessionsDoc,
  })

  const updateSearchParams = useCallback((params: URLSearchParams) => {
    setSearchParamsValue(params)
    // Trigger an immediate refetch when search params change
    refetch()
  }, [refetch])

  const setTab: typeof setTabValue = useCallback((newTab: SessionTabs) => {
    console.log('newTab:', newTab)
    const params = new URLSearchParams(searchParamsValue)
    if (newTab === 'all') {
      params.delete('tab')
    } else {
      params.set('tab', newTab)
    }
    updateSearchParams(params)
    setTabValue(newTab)
  }, [searchParamsValue, updateSearchParams])

  const setQueryPastSessions: typeof setQueryPastSessionsValue = useCallback((showPastSessions: boolean) => {
    console.log('showPastSessions:', showPastSessions)
    const params = new URLSearchParams(searchParamsValue)
    if (!showPastSessions) {
      params.delete('past')
    } else {
      params.set('past', 'true')
    }
    if (['proposals', 'scheduled'].includes(tab) && showPastSessions) {
      setTabValue('all')
      params.delete('tab')
    }
    updateSearchParams(params)
    setQueryPastSessionsValue(showPastSessions)
  }, [searchParamsValue, tab, updateSearchParams, setTabValue])

  const setSearch: typeof setSearchValue = useCallback((newSearch: string) => {
    console.log('newSearch:', newSearch)
    const params = new URLSearchParams(searchParamsValue)
    if (newSearch === '') {
      params.delete('s')
    } else {
      params.set('s', newSearch)
    }
    updateSearchParams(params)
    setSearchValue(newSearch)
  }, [searchParamsValue, updateSearchParams])

  const setSortBy: typeof setSortByValue = useCallback((newSortBy: SortBy) => {
    console.log('newSortBy:', newSortBy)
    const params = new URLSearchParams(searchParamsValue)
    if (newSortBy === 'popularity') {
      params.delete('sortBy')
    } else {
      params.set('sortBy', newSortBy)
    }
    updateSearchParams(params)
    setSortByValue(newSortBy)
  }, [searchParamsValue, updateSearchParams])

  const setSelectedTags: typeof setSelectedTagsValues = useCallback((tags: string[]) => {
    console.log('tags:', tags)
    const params = new URLSearchParams(searchParamsValue)
    if (tags.length === 0) {
      params.delete('tags')
    } else {
      params.set('tags', tags.join(','))
    }
    updateSearchParams(params)
    setSelectedTagsValues(tags)
  }, [searchParamsValue, updateSearchParams])

  useEffect(() => {
    if(isFetching) return
    if(data) {
      setSessionDocs(data)
    }
  }, [data, isFetching])

  return (
    <Context.Provider value={{
      sessionDocs,
      tab, setTab,
      search, setSearch,
      selectedTags, setSelectedTags,
      sortBy, setSortBy,
      queryPastSessions,
      setQueryPastSessions,
      isLoading: isFetching,
      page: sessionDocs.page,
      canLoadMore: sessionDocs.hasNextPage,
      isError,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
