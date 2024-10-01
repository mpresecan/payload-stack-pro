import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { CalendarIcon } from 'lucide-react'
import { User } from '@/payload-types'
import React from 'react'
import { getInitials } from '@/utilities/getInitials'
import { Link } from 'next-view-transitions'

export function HoverUserCard({ children, user }: { children: React.ReactNode, user: User }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 z-40" style={{ viewTransitionName: `user-card-${user.id}` }}>
        <div className="flex justify-start space-x-4 z-40">
          <Avatar style={{ viewTransitionName: `user-avatar-${user.id}` }}>
            <AvatarImage src={user.avatarUrl!} alt={user.name!} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className='space-y-1' style={{ viewTransitionName: `user-info-${user.id}` }}>
              <Link href={`/p/${user.handle}`}><h4 className="text-sm font-semibold">{user.name}</h4></Link>
              <h3 className="text-sm">@{user.handle}</h3>
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
