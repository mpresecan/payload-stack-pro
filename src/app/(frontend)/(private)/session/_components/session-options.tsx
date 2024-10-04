"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { MoreVertical, Edit, X, Trash, RefreshCw } from 'lucide-react'
import { SessionEvent } from '@/payload-types'
import { Link } from 'next-view-transitions'
import { cancelSession } from '../_actions/cancel-session'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { proposeAgainSession } from '../_actions/propose-again-session'
import { deleteSession } from '../_actions/delete-session'

interface SessionOptionsProps {
  session: SessionEvent
  allowCancel?: boolean
}

export default function SessionOptions({ session, allowCancel = true }: SessionOptionsProps) {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const result = await deleteSession(session.id, !allowCancel);
      toast.success(allowCancel ? 'Session deleted!' : 'Topic deleted');
      router.push(allowCancel ? '/sessions' : '/topic-suggestions');
    } catch (error) {
      toast.error('Failed to delete ' + (!allowCancel ? 'topic' : 'session'));
      console.error(error);
    }
  }

  const handleCancel = async () => {
    try {
      const result = await cancelSession(session.id);
      toast.success('Session canceled!');
      router.refresh();
    } catch (error) {
      toast.error('Failed to cancel session');
      console.error(error);
    }
  }

  const handleProposeAgain = async () => {
    try {
      const result = await proposeAgainSession(session.id);
      toast.success('Session successfully updated!');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update session');
      console.error(error);
    }
  }

  const isCanceled = session.status === 'cancelled'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/${!allowCancel ? 'suggested-topic' : 'session'}/${session.id}/edit`} className="flex items-center">
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          {allowCancel && (
            isCanceled ? (
              <DropdownMenuItem onSelect={handleProposeAgain} className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Propose Again</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={() => setIsCancelAlertOpen(true)} className="flex items-center">
                <X className="mr-2 h-4 w-4" />
                <span>Cancel Session</span>
              </DropdownMenuItem>
            )
          )}
          <DropdownMenuItem onSelect={() => setIsDeleteAlertOpen(true)} className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this {!allowCancel ? 'topic' : 'session'}?</AlertDialogTitle>
            <AlertDialogDescription>
              {allowCancel ? (
                isCanceled ? (
                  "This action cannot be undone. This will permanently delete the session and remove its data from our servers."
                ) : (
                  "This action cannot be undone. This will permanently delete the session and remove its data from our servers. If you're not 100% sure, you can cancel the session instead, which will still allow users to vote and comment on it."
                )
              ) : (
                "This action cannot be undone. This will permanently delete the topic and remove its data from our servers. Please ensure you want to proceed with deletion."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {allowCancel && !isCanceled && (
              <AlertDialogAction onClick={handleCancel} className="bg-orange-500 text-white hover:bg-orange-600">
                Cancel Session
              </AlertDialogAction>
            )}
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {allowCancel && (
        <AlertDialog open={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to cancel this session?</AlertDialogTitle>
              <AlertDialogDescription>
                When a session is canceled, people can still vote and show their interest. You can uncanel the session later if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Active</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel} className="bg-orange-500 text-white hover:bg-orange-600">
                Cancel Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
