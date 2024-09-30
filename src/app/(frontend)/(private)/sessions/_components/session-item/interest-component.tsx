'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ThumbsUpIcon } from 'lucide-react'
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

import { Session, User } from '@/payload-types'
import { useInterestedUsers } from '../../hooks/useInterestedUsers'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'

const InterestComponent = ({ session }: { session: Session }) => {
  const { user } = useAuth()
  const { users: voters, ref, isLoading, error, toggleUserInterest, isToggling } = useInterestedUsers(session.id, !['live', 'finished', 'canceled'].includes(session.status))

  const isUserInterested = user && voters.some(voter => voter.id === user.id) || false

  const handleInterestToggle = () => {
    if (user && user.id) {
      toggleUserInterest(user.id as string, isUserInterested)
    }
  }

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-between mb-2">
      <div className="flex items-center mb-2 sm:mb-0">
        <Button
          variant={isUserInterested ? 'default' : 'outline'}
          size="sm"
          onClick={handleInterestToggle}
          disabled={!user || isToggling}
        >
          <ThumbsUpIcon className="mr-2 h-4 w-4" />
          {isToggling ? 'Updating...' : (isUserInterested ? 'Interested' : 'Show Interest')}
        </Button>
        <div className="ml-2 flex items-center">
          <div className="flex -space-x-2 overflow-hidden">
            <TooltipProvider>
              {voters.slice(0, 3).map((voter) => (
                <Tooltip key={voter.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="inline-block border-2 border-background">
                      <AvatarImage src={voter.avatarUrl!} alt={voter.name!} />
                      <AvatarFallback>{voter.name![0]}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{voter.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
          {voters.length > 3 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 text-sm text-muted-foreground"
                >
                  +{voters.length - 3} more
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
                        <Avatar>
                          <AvatarImage src={voter.avatarUrl!} alt={voter.name!} />
                          <AvatarFallback>{voter.name![0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{voter.name}</p>
                          <p className="text-sm text-muted-foreground">@{voter.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {voters.length} interested
      </div>
    </div>
  )
}

export default InterestComponent
