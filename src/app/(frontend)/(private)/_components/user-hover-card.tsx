import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CalendarIcon } from 'lucide-react'
import { User } from '@/payload-types'
import React from 'react'
import { Link } from 'next-view-transitions'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function HoverUserCard({ children, user }: { children: React.ReactNode, user: User | null | undefined | string }) {
  if(!user) {
    return children;
  }

  if(typeof user === 'string') {
    return (
      <TooltipProvider>
        <Tooltip key={user}>
          <TooltipTrigger className='cursor-default'>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            Deleted User
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger className='cursor-default'>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 z-40" style={{ viewTransitionName: `user-card-${user.id}` }}>
        <div className="flex justify-start space-x-4 z-40">
          <UserAvatar user={user}/>
          <div className="space-y-1">
            <div className='space-y-1' style={{ viewTransitionName: `user-info-${user.id}` }}>
              <Link href={`/user/${user.handle}`}><h4 className="text-sm font-semibold">{user.name}</h4></Link>
              <h5 className="text-sm">@{user.handle}</h5>
            </div>
            {user.bio && (<p className="text-sm italic" style={{ viewTransitionName: `user-bio-${user.id}` }}>
              {user.bio.split(' ').slice(0, 10).join(' ')}...
            </p>)}
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
