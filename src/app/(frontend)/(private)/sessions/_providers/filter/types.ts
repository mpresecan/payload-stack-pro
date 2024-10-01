import { SessionEvent } from '@/payload-types'
import { SessionTabs, SortBy } from '../../types/params'
import { PaginatedDocs } from 'payload'
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'

export interface FilterContext {
  tab: SessionTabs,
  setTab: (tab: SessionTabs) => void,
  search: string,
  setSearch: (search: string) => void,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
  sortBy: SortBy,
  setSortBy: (sortBy: SortBy) => void,
  queryPastSessions: boolean,
  setQueryPastSessions: (showPastSessions: boolean) => void,
  sessionDocs: PaginatedDocs<SessionEvent>,
  isLoading: boolean,
  page?: number,
  canLoadMore: boolean,
  isError: boolean,
  refetchSessions:  (options?: RefetchOptions) => Promise<QueryObserverResult<PaginatedDocs<SessionEvent>, Error>>
}
