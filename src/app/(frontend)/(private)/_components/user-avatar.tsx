import React from 'react'
import { User } from '@/payload-types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'

const UserAvatar = ({user, numberOfInitials = 2} : {user: User | string | null | undefined, numberOfInitials?: number}) => {

  if(!user) {
    return (
      <Avatar>
        <AvatarImage src={undefined} />
        <AvatarFallback>{getInitials('undefined', numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

  if(typeof user === 'string') {
    return (
      <Avatar>
        <AvatarImage src={undefined} />
        <AvatarFallback>{getInitials('undefined', numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

  if('id' in user) {
    return (
      <Avatar>
        <AvatarImage src={user.avatarUrl!} alt={user.name!} />
        <AvatarFallback>{getInitials(user.name, numberOfInitials)}</AvatarFallback>
      </Avatar>
    )
  }

}

export default UserAvatar
