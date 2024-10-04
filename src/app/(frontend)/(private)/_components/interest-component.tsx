'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ThumbsUpIcon, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SessionEvent, User } from '@/payload-types'
import { useInterestedUsers } from '../sessions/hooks/useInterestedUsers'
import { HoverUserCard } from '@/app/(frontend)/(private)/_components/user-hover-card'
import { Link } from 'next-view-transitions'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'

const InterestComponent = ({ session, refetchSessions = false, bigButton = false, user }: {
  session: SessionEvent,
  refetchSessions?: boolean,
  bigButton?: boolean,
  user?: User | null | undefined
}) => {
  const shouldVote = !['live', 'finished'].includes(session.status)

  const {
    users: voters,
    ref,
    isLoading,
    error,
    toggleUserInterest,
    isToggling,
  } = useInterestedUsers(session.id, shouldVote, refetchSessions)

  const isUserInterested = user && voters.some(voter => voter.id === user.id) || false

  const handleInterestToggle = () => {
    if (user && user.id) {
      toggleUserInterest(user.id as string, isUserInterested)
    }
  }

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-between mb-2"
         style={{ viewTransitionName: `session-interest-component-${session.id}` }}>
      <div className="flex-initial items-center mb-2 sm:mb-0">
        <Button
          variant={isUserInterested ? 'default' : 'outline'}
          size={bigButton ? 'lg' : 'sm'}
          onClick={handleInterestToggle}
          disabled={!user || isToggling || !shouldVote}
          style={{ viewTransitionName: `session-interest-component-button-${session.id}` }}
        >
          <ThumbsUpIcon className="mr-2 h-4 w-4" />
          {isToggling ? 'Updating...' : (isUserInterested ? 'Interested' : 'Show Interest')}
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-2 text-sm text-muted-foreground"
            >
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{voters.length}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Interested Users</DialogTitle>
              <DialogDescription>
                Users interested in &quot;{session.title}&quot;
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="mt-4 max-h-[300px]">
              <div className="space-y-4">
                {voters.map((voter) => (
                  <div key={voter.id} className="flex items-center space-x-4">
                    <UserAvatar user={voter} numberOfInitials={1} />
                    <div>
                      {typeof voter === 'string' ? (
                          <p className="text-sm font-medium leading-none text-muted-foreground">Deleted User</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium leading-none"><Link
                            href={`/user/${voter.handle}`}>{voter.name}</Link></p>
                          <p className="text-sm text-muted-foreground">@{voter.handle}</p>
                        </>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <div className="flex -space-x-2">
          {voters.slice(0, 3).map(voter => (
            <HoverUserCard user={voter} key={voter.id}>
              <UserAvatar user={voter} numberOfInitials={2} />
            </HoverUserCard>
          ))}
          {voters.length > 3 && (
            <Avatar className="inline-block border-2 border-background cursor-default">
              <AvatarFallback>+{voters.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterestComponent
