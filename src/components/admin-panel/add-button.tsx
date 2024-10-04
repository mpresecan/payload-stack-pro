import { PlusIcon} from 'lucide-react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'next-view-transitions'

export function AddButton() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-0 h-8 w-8"
              >
                <PlusIcon className=" h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href="/session/new" className="flex items-center">
                    <PlusIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                    I want to present about...
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href="/suggested-topic/new" className="flex items-center">
                    <PlusIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                    I want to learn about...
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">Engage</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
