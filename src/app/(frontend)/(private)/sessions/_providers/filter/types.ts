import { Session } from '@/payload-types'
import { SessionTabs, SortBy } from '../../types/params'
import { PaginatedDocs } from 'payload'

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
  sessionDocs: PaginatedDocs<Session>,
  isLoading: boolean,
  page?: number,
  canLoadMore: boolean,
  isError: boolean,
}
