import { Session, SessionTag } from '@/payload-types'

export type SessionTabs = 'all' | 'proposals' | 'scheduled' | 'interested' | 'my-sessions'
export type SortBy = 'popularity' | 'newest'

export interface FilterContext {
  tab: SessionTabs,
  setTab: (tab: SessionTabs) => void,
  search: string,
  setSearch: (search: string) => void,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
  sortBy: SortBy,
  setSortBy: (sortBy: SortBy) => void,
  sessions: Session[],

}
