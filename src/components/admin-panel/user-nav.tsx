'use client'

import { LogOut, NotebookText, Settings, User as UserProfileIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'
import UserAvatar from '@/app/(frontend)/(private)/_components/user-avatar'
import { Link } from 'next-view-transitions'

export function UserNav() {
  const { logout, user } = useAuth()

  if(!user) {
    return null
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <UserAvatar user={user} className="h-8 w-8" fallbackClassName="bg-transparent" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <Link href={`/user/${user.handle}`} className="flex items-center">
              <p className="text-sm font-medium leading-none">{user.name}</p>
            </Link>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/sessions" className="flex items-center">
              <NotebookText className="w-4 h-4 mr-3 text-muted-foreground" />
              Sessions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <UserProfileIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
          {user.role === 'admin' && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/admin" className="flex items-center" target="_blank">
                <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={logout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
