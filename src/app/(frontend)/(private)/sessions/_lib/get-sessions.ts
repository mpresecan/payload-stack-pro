import 'server-only'
import { SessionTabs, SortBy } from '../types/params'
import { getPayload } from '@/lib/payload'
import { Session, User } from '@/payload-types'
import { COLLECTION_SLUG_SESSIONS } from '@/collections/slugs'
import { JoinQuery, PaginatedDocs, Where } from 'payload'

interface GetSessionsParams {
  s?: string,
  tab?: SessionTabs,
  past?: boolean,
  sortBy?: SortBy,
  tags?: string,
  onSiteId?: string
}

const getCorrectSearchParams = (params: GetSessionsParams, user?: User) => {
  const { s, tab, past, sortBy, tags, onSiteId } = params

  const search = s ? s : ''
  const queryPast = past ? past : false
  const sessionTab = tab ? ((['proposals', 'scheduled'].includes(tab) && queryPast) || ((!user || onSiteId) && ['interested', 'my-sessions'].includes(tab)) ? 'all' : tab) : 'all'
  const sort = sortBy ? sortBy : 'popularity'
  const selectedTags = tags ? tags.split(',') : []

  return {
    s: search,
    tab: sessionTab,
    past: queryPast,
    sortBy: sort,
    tags: selectedTags,
    onSiteId,
  }
}

export const getSessionsBySearchParams = async (params: GetSessionsParams, user?: User) => {
  const { s, tab, past, sortBy, tags, onSiteId } = getCorrectSearchParams(params, user)

  console.log('s:', s)
  console.log('tab:', tab)
  console.log('past:', past)
  console.log('sortBy:', sortBy)
  console.log('tags:', tags)
  console.log('onSiteId:', onSiteId)
  console.log('-------------------')

  const where: Where = {
    and: [
      {
        type: {
          equals: onSiteId ? 'onsite' : 'online',
        },
      },
    ],
  }

  if (s !== '') {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      title: {
        like: s,
      },
    })
  }

  if (tab === 'my-sessions' && user) {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      presenters: {
        in: user.id,
      },
    })
  } else if (tab === 'proposals') {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      or: [
        {
          status: {
            in: ['proposed', 'scheduling'],
          },
        },
        {
          and: [
            {
              status: {
                equals: 'cancelled',
              },
            },
            {
              scheduledAt: {
                exists: false,
              },
            },
          ],
        },
      ],
    })
  } else if (tab === 'scheduled') {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      or: [
        {
          status: {
            in: ['scheduled', 'live', 'finished'],
          },
        },
        {
          and: [
            {
              status: {
                equals: 'cancelled',
              },
            },
            {
              scheduledAt: {
                exists: true,
              },
            },
          ],
        },
      ],
    })
  } // else if(tab === 'interested' && user) {
  //   where.and = where.and || []; // un necessary, just for the sake of typescript
  //   where.and.push({
  //     'interestedUsers.user': {
  //       in: user.id,
  //     }
  //   })
  // }

  if (past) {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      or: [
        {
          status: {
            equals: 'finished',
          },
        },
        {
          and: [
            {
              status: {
                equals: 'cancelled',
              },
            },
            {
              scheduledAt: {
                less_than_equal: new Date(),
              },
            },
          ],
        },
      ],
    })
  }

  // for onsite events
  if (onSiteId) {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    where.and.push({
      onSiteEvent: {
        equals: onSiteId,
      },
    })
  }

  if (tags.length > 0) {
    where.and = where.and || [] // un necessary, just for the sake of typescript
    const orTags: Where['or'] = []
    tags.forEach(tag => {
      orTags.push({
        'tags.slug': {
          in: tag,
        },
      })
    })
    where.and.push({
      or: orTags,
    })
  }

  // console.log('where:', JSON.stringify(where, null, 2))

  const joins: JoinQuery = {
    interestedUsers: {
      limit: 999999,
    },
  }

  const sort = sortBy === 'popularity' ? '-interestedAttendeesCount' : '-scheduledAt'

  try {
    const payload = await getPayload()

    return await payload.find({
      collection: COLLECTION_SLUG_SESSIONS,
      where,
      joins,
      sort,
      depth: 0,
    })

  } catch (e) {
    console.error('Error getting sessions:', e)
  }

  return {
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
  } as PaginatedDocs<Session>
}
