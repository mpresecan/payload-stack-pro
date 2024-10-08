'use client'

import { Ellipsis, LogOut, PlusIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { getMenuList } from '@/lib/menu-list'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { useAuth } from '@/app/(frontend)/(auth)/_providers/auth'
import { Link } from 'next-view-transitions'

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname()
  const menuList = getMenuList(pathname)
  const { logout } = useAuth()

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 w-full">
        <ul
          className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus, newTab }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? 'secondary' : 'ghost'}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href} target={newTab ? '_blank' : '_self'}>
                                <span
                                  className={cn(isOpen === false ? '' : 'mr-4')}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    'max-w-[200px] truncate',
                                    isOpen === false
                                      ? '-translate-x-96 opacity-0'
                                      : 'translate-x-0 opacity-100',
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                        newTab={newTab}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end mt-5">
            <div className='flex flex-col w-full gap-2'>
              {isOpen === true && (
                <div className="w-full">
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button asChild variant="ghost" className="w-full justify-start text-left h-10">
                          <Link href={'/suggested-topic/new'} className="w-full justify-start text-left h-10">
                            <PlusIcon size={18} className="mr-4" />
                            I want to learn about...
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='right'>
                        Suggest Topic
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              {isOpen === true && (
                <div className="w-full">
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button asChild variant='ghost' className="w-full justify-start text-left h-10">
                          <Link href={'/session/new'} className="w-full justify-start text-left h-10">
                            <PlusIcon size={18} className="mr-4" />
                            I want to present about...
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='right'>
                        Propose a session
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <div className="w-full">
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={logout}
                        variant="outline"
                        className="w-full justify-center h-10"
                      >
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <LogOut size={18} />
                    </span>
                        <p
                          className={cn(
                            'whitespace-nowrap',
                            isOpen === false ? 'opacity-0 hidden' : 'opacity-100',
                          )}
                        >
                          Sign out
                        </p>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">Sign out</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
}
