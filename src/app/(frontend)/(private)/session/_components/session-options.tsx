'use client'

import React, { useState } from 'react'
import { SessionEvent } from '@/payload-types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, User2, UserMinus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { joinAsCoPresenter } from '../_actions/join-as-co-presenter'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SessionOptions = ({session} : {session: SessionEvent}) => {
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const router = useRouter();

  const handleJoinConfirm = async () => {
    try {
      await joinAsCoPresenter(session.id);
      toast.success('Joined as co-presenter');
      router.push(`/session/${session.id}/edit`);
    } catch (error) {
      toast.error('Failed to join as co-presenter');
      console.error(error);
    } finally {
      setShowJoinDialog(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowJoinDialog(true)}>
            <User2 className="mr-2 h-4 w-4" />
            <span>Join as co-presenter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Join as Co-presenter</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to join as a co-presenter for this session?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleJoinConfirm}>Join</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default SessionOptions
