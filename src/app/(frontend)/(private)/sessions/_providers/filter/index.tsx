'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { SessionTabs, SortBy } from '../../types/params'
import { SessionEvent } from '@/payload-types'
import { FilterContext } from './types'
import { PaginatedDocs } from 'payload'
import { useQuery } from '@tanstack/react-query'
import deepMerge from '@/utilities/deepMerge'
import { REFETCH_INTERVAL } from '@/app/(frontend)/(private)/sessions/_lib/refetch-interval'

const Context = createContext({} as FilterContext)

const fetchSessions = async (params: URLSearchParams): Promise<PaginatedDocs<SessionEvent>> => {
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

export const SessionFilterProvider = ({ children, initialSessionsDoc, wished = false }: {children: React.ReactNode, initialSessionsDoc: PaginatedDocs<SessionEvent>, wished?: boolean}) => {
  const [tab, setTabValue] = useState<SessionTabs>('all')
  const [search, setSearchValue] = useState<string>('')
  const [selectedTags, setSelectedTagsValues] = useState<string[]>([])
  const [sortBy, setSortByValue] = useState<SortBy>('popularity')
  const [queryPastSessions, setQueryPastSessionsValue] = useState<boolean>(false)

  const [searchParamsValue, setSearchParamsValue] = useState<URLSearchParams>(new URLSearchParams({ 'wished': wished.toString() }))
  const [sessionDocs, setSessionDocs] = useState<PaginatedDocs<SessionEvent>>(initialSessionsDoc)

  const { data, isLoading, isFetching, isError, refetch } = useQuery<PaginatedDocs<SessionEvent>, Error>({
    queryKey: [deepMerge(Object.fromEntries(searchParamsValue.entries()), { action: 'sessions'})],
    queryFn: () => fetchSessions(searchParamsValue),
    refetchInterval: REFETCH_INTERVAL, // 10 seconds polling
    staleTime: 0, // Always consider data stale to enable immediate refetching
    initialData: initialSessionsDoc,
  })

  const updateSearchParams = useCallback((params: URLSearchParams) => {
    params.set('wished', wished.toString())
    setSearchParamsValue(params)
    // Trigger an immediate refetch when search params change
    refetch()
  }, [refetch, wished])

  const setTab: typeof setTabValue = useCallback((newTab: SessionTabs) => {
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
      refetchSessions: refetch,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSessionFilter = () => useContext(Context)
