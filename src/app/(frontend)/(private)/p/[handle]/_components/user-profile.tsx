import React from 'react'
import { User } from '@/payload-types'
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utilities/getInitials'
import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { sessionUser } from '@/app/(frontend)/(auth)/_lib/auth'
import Link from 'next/link'


const UserProfile = async ({ user }: { user: User }) => {
  const currentUser = await sessionUser()

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card style={{ viewTransitionName: `user-card-${user.id}` }}>
        <CardHeader className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20" style={{ viewTransitionName: `user-avatar-${user.id}` }}>
                <AvatarImage src={user.avatarUrl!} alt={user.name!} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div style={{ viewTransitionName: `user-info-${user.id}` }}>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>@{user.handle}</CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              {currentUser && currentUser.id === user.id && (
                <Button variant="outline" asChild>
                  <Link href={'/account'}>
                    Edit Profile
                    <Edit2 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {user.bio && (<div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <p className="text-sm text-muted-foreground" style={{ viewTransitionName: `user-bio-${user.id}` }}>{user.bio}</p>
          </div>)}

        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfile
