'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { $isLinkNode } from '@lexical/link'
import { $getSelection, FORMAT_TEXT_COMMAND, LexicalEditor } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { cn } from '@/utilities/cn'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bold, Italic, Underline, Strikethrough, Code, Link } from 'lucide-react'

import { $isRangeSelected } from '../utils/$isRangeSelected'
import { useUserInteractions } from '../hooks/useUserInteractions'
import { TOGGLE_EDIT_LINK_MENU } from './EditLink'
import { AnimatePresence, motion } from 'framer-motion'

type FloatingMenuPosition = { x: number; y: number } | undefined

type FloatingMenuProps = {
  editor: LexicalEditor
  show: boolean
  isBold: boolean
  isCode: boolean
  isLink: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isUnderline: boolean
}

function FloatingMenu({ show, ...props }: FloatingMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined)

  const nativeSel = window.getSelection()

  useEffect(() => {
    const isCollapsed = nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed

    if (!show || !ref.current || !nativeSel || isCollapsed) {
      setPos(undefined)
      return
    }

    const domRange = nativeSel.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    setPos({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    })
  }, [show, nativeSel, nativeSel?.anchorOffset])

  const iconButtonClass = 'h-8 w-8 p-0'

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        style={{
          top: pos?.y ? pos.y - 40 : undefined,
          left: pos?.x,
          transform: 'translateX(-50%)',
        }}
        aria-hidden={!pos?.x || !pos?.y}
        className={cn(
          'absolute flex items-center justify-between bg-background border rounded-md p-1 gap-1 shadow-md',
          pos?.x && pos.y ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: pos?.x && pos.y ? 1 : 0, y: pos?.x && pos.y ? 0 : -10, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isBold ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
              >
                <Bold className="h-4 w-4" />
                <span className="sr-only">Format text as bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format text as bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isItalic ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
              >
                <Italic className="h-4 w-4" />
                <span className="sr-only">Format text as italics</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format text as italics</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isUnderline ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
              >
                <Underline className="h-4 w-4" />
                <span className="sr-only">Format text to underlined</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format text to underlined</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isStrikethrough ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
              >
                <Strikethrough className="h-4 w-4" />
                <span className="sr-only">Format text with a strikethrough</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format text with a strikethrough</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isCode ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
              >
                <Code className="h-4 w-4" />
                <span className="sr-only">Format text with inline code</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format text with inline code</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={props.isLink ? 'default' : 'outline'}
                size="icon"
                className={iconButtonClass}
                onClick={() => props.editor.dispatchCommand(TOGGLE_EDIT_LINK_MENU, undefined)}
              >
                <Link className="h-4 w-4" />
                <span className="sr-only">Add or edit link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add or edit link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </AnimatePresence>
  )
}

export function FloatingMenuPlugin() {
  const [show, setShow] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const { isPointerDown, isKeyDown } = useUserInteractions()
  const [editor] = useLexicalComposerContext()

  const updateFloatingMenu = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing() || isPointerDown || isKeyDown) return

      if (editor.getRootElement() !== document.activeElement) {
        setShow(false)
        return
      }

      const selection = $getSelection()

      if ($isRangeSelected(selection)) {
        const nodes = selection.getNodes()
        setIsBold(selection.hasFormat('bold'))
        setIsCode(selection.hasFormat('code'))
        setIsItalic(selection.hasFormat('italic'))
        setIsUnderline(selection.hasFormat('underline'))
        setIsStrikethrough(selection.hasFormat('strikethrough'))
        setIsLink(nodes.every((node) => $isLinkNode(node.getParent())))
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [editor, isPointerDown, isKeyDown])

  useEffect(() => {
    setAnchorElement(document.body)
    return editor.registerUpdateListener(() => {
      updateFloatingMenu()
    })
  }, [editor, updateFloatingMenu])

  useEffect(() => {
    updateFloatingMenu()
  }, [isPointerDown, isKeyDown, updateFloatingMenu])

  if (!anchorElement) {
    return null // Don't render anything on the server side
  }

  return createPortal(
    <FloatingMenu
      editor={editor}
      show={show}
      isBold={isBold}
      isCode={isCode}
      isLink={isLink}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isUnderline={isUnderline}
    />,
    anchorElement
  )
}
