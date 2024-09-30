'use client'

import { useQuery, useMutation, useQueryClient, QueryFilters } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { User } from '@/payload-types'
import { REFETCH_INTERVAL } from '@/app/(frontend)/(private)/sessions/_lib/refetch-interval'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'
import { useSessionFilter } from '@/app/(frontend)/(private)/sessions/_providers/filter'

const fetchInterestedUsers = async (sessionId: string): Promise<User[]> => {
  const response = await fetch(`/api/session/${sessionId}/interested-users`)
  if (!response.ok) {
    throw new Error('Failed to fetch interested users')
  }
  return response.json()
}

const toggleInterest = async (sessionId: string, userId: string, isInterested: boolean): Promise<void> => {
  const endpoint = isInterested ? 'disinterest' : 'interest'
  const response = await fetch(`/api/session/${sessionId}/${endpoint}/${userId}`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to ${isInterested ? 'remove' : 'add'} interest`)
  }
}

export function useInterestedUsers(sessionId: string, shouldRefetch: boolean = true) {
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const queryClient = useQueryClient()
  const queryFilter: QueryFilters = { queryKey: ['interestedUsers', sessionId] }
  const {user} = useAuth()
  const {refetchSessions} = useSessionFilter()

  const query = useQuery<User[], Error>({
    queryKey: queryFilter.queryKey!,
    queryFn: () => fetchInterestedUsers(sessionId),
    enabled: inView,
    refetchInterval: shouldRefetch && inView ? REFETCH_INTERVAL : false,
    staleTime: REFETCH_INTERVAL,
  })

  interface MutationContext {
    previousUsers?: User[];
  }


  const mutation = useMutation<void, Error, { userId: string; isInterested: boolean }, MutationContext>({
    mutationFn: ({ userId, isInterested }) => toggleInterest(sessionId, userId, isInterested),
    onMutate: async ({ userId, isInterested }) => {

      await queryClient.cancelQueries(queryFilter)
      const previousUsers = queryClient.getQueryData<User[]>(queryFilter.queryKey!)
      queryClient.setQueryData<User[]>(queryFilter.queryKey!, (old = []) => {
        if (isInterested) {
          return old.filter(user => user.id !== userId)
        } else {
          const newUser = { ...user } as User // Assuming minimal User object
          return [...old, newUser]
        }
      })
      return { previousUsers }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryFilter.queryKey!, context?.previousUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryFilter)
    },
    onSuccess: () => {
      refetchSessions();
    }
  })

  const toggleUserInterest = (userId: string, isCurrentlyInterested: boolean) => {
    mutation.mutate({ userId, isInterested: isCurrentlyInterested })
  }

  return {
    ...query,
    ref,
    users: query.data || [],
    toggleUserInterest,
    isToggling: false,
  }
}
