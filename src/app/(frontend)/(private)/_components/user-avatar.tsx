import React from 'react'
import { User } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'
import { cn } from '@/utilities/cn'

const UserAvatar = ({ user, numberOfInitials = 2, className, fallbackClassName }: {
  user: User | string | null | undefined,
  numberOfInitials?: number,
  className?: string,
  fallbackClassName?: string
}) => {

  if (!user) {
    return (
      <Avatar className={className}>
        <AvatarImage src={undefined} />
        <AvatarFallback>{getInitials('undefined', numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

  if (typeof user === 'string') {
    return (
      <Avatar className={className}>
        <AvatarImage src={undefined} />
        <AvatarFallback className={fallbackClassName}>{getInitials('deleted user', numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatarUrl!} alt={user.name!} />
      <AvatarFallback className={cn('cursor-default', fallbackClassName)}>{getInitials(user.name, numberOfInitials)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
