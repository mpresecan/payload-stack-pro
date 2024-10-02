import React from 'react'
import { User } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'

const UserAvatar = ({ user, numberOfInitials = 2, className }: {
  user: User | string | null | undefined,
  numberOfInitials?: number,
  className?: string
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
        <AvatarFallback>{getInitials('deleted user', numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Avatar className={className} >
      <AvatarImage src={user.avatarUrl!} alt={user.name!} />
      <AvatarFallback>{getInitials(user.name, numberOfInitials)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
