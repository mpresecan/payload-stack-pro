import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
} from "lexical"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { cn } from "@/utilities/cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Check } from "lucide-react"

import { useClickOutside } from "../hooks/useClickOutside"
import { $getSharedLinkTarget } from "../utils/$getSharedLinkTarget"

type EditLinkMenuPosition = { x: number; y: number } | undefined

export const TOGGLE_EDIT_LINK_MENU: LexicalCommand<undefined> = createCommand()

export function EditLinkPlugin() {
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [pos, setPos] = useState<EditLinkMenuPosition>(undefined)
  const [domRange, setDomRange] = useState<Range | undefined>(undefined)
  const [hasLink, setHasLink] = useState(false)

  const [editor] = useLexicalComposerContext()

  const resetState = useCallback(() => {
    setValue("")
    setError(false)
    setPos(undefined)
    setDomRange(undefined)
    editor.focus()
  }, [editor])

  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_EDIT_LINK_MENU,
      () => {
        const nativeSel = window.getSelection()
        const isCollapsed =
          nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed

        if (!!pos?.x || !!pos?.y || !ref.current || !nativeSel || isCollapsed) {
          resetState()
          return false
        }

        const domRange = nativeSel.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()

        setPos({ x: rect.left, y: rect.bottom + 10 })
        setDomRange(domRange)
        editor.getEditorState().read(() => {
          const selection = $getSelection()
          const linkTarget = $getSharedLinkTarget(selection)
          setHasLink(!!linkTarget)
        })

        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor, pos, resetState])

  useEffect(() => {
    if (pos?.x && pos?.y) {
      let initialUrl = ""

      editor.getEditorState().read(() => {
        const selection = $getSelection()
        initialUrl = $getSharedLinkTarget(selection) ?? ""
      })

      setValue(initialUrl)
      inputRef.current?.focus()
    }
  }, [pos, editor])

  useClickOutside(ref as React.RefObject<HTMLElement>, () => {
    resetState()
  })

  const handleSetLink = () => {
    if (!value) return

    const isLinkSet = editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: value,
      target: "_blank",
    })

    if (isLinkSet) resetState()
    else setError(true)
  }

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    resetState()
  }

  return (
    <>
      <FakeSelection range={domRange} />
      <div
        ref={ref}
        style={{ top: pos?.y, left: pos?.x }}
        aria-hidden={!pos?.x || !pos?.y}
        className={cn(
          "absolute flex items-center justify-between bg-background border rounded-md p-1 gap-1 shadow-md",
          error && "border-destructive",
          pos?.x && pos.y ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-8 text-xs bg-transparent"
          placeholder="Enter URL"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSetLink()
              return
            }

            if (e.key === "Escape") {
              e.preventDefault()
              resetState()
              return
            }
          }}
        />
        {hasLink && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveLink}
            className="h-8 w-8"
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove link</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          disabled={!value}
          onClick={handleSetLink}
          className="h-8 w-8"
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Set link</span>
        </Button>
      </div>
    </>
  )
}

function FakeSelection({ range }: { range: Range | undefined }) {
  if (!range) return null

  const domRect = range.getBoundingClientRect()
  return createPortal(
    <div
      className="absolute bg-muted -z-10"
      style={{
        left: domRect.left,
        width: domRect.width,
        top: domRect.top - 2,
        height: domRect.height + 4,
      }}
    />,
    document.body
  )
}
