"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, Plus, PlusIcon, User } from 'lucide-react'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function AddButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative h-8 w-8 rounded-full mr-2 text-lg"
        >
          +
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/sessions/add" className="flex items-center">
              <Plus className="w-4 h-4 mr-3 text-muted-foreground" />
              Propose Sessions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/topic-suggestions/add" className="flex items-center">
              <Plus className="w-4 h-4 mr-3 text-muted-foreground" />
              Suggest a topic
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
