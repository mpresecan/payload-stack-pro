import { useEffect, useRef, useState } from "react"
import { createCommand, LexicalCommand } from "lexical"
import { LinkNode } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { cn } from "@/utilities/cn"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy } from "lucide-react"

type OpenLinkMenuPosition = { x: number; y: number } | undefined

export const LINK_SELECTOR = `[data-lexical-editor] a`
export const OPEN_LINK_MENU_ID = "open-link-menu"
export const TOGGLE_EDIT_LINK_MENU: LexicalCommand<undefined> = createCommand()

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function OpenLinkPlugin() {
  const ref = useRef<HTMLDivElement>(null)
  const linkSetRef = useRef<Set<string>>(new Set())

  const [copied, setCopied] = useState(false)
  const [pos, setPos] = useState<OpenLinkMenuPosition>(undefined)
  const [link, setLink] = useState<string | null>(null)

  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const menu = (e.target as HTMLElement).closest<HTMLElement>(
        `#${OPEN_LINK_MENU_ID}`
      )
      if (menu) return

      const link = (e.target as HTMLElement).closest<HTMLElement>(
        LINK_SELECTOR
      )

      if (!link || !ref.current) {
        setPos(undefined)
        setLink(null)
        return
      }

      const linkRect = link.getBoundingClientRect()
      const editorRect = editor.getRootElement()?.getBoundingClientRect()

      if (editorRect) {
        setPos({
          x: linkRect.left - editorRect.left,
          y: linkRect.bottom - editorRect.top + 10,
        })
        setLink(link.getAttribute("href"))
      }

      return true
    }

    const debouncedMouseMove = debounce(handleMouseMove, 200)

    return editor.registerMutationListener(LinkNode, (mutations) => {
      for (const [key, type] of mutations) {
        switch (type) {
          case "created":
          case "updated":
            linkSetRef.current.add(key)
            if (linkSetRef.current.size === 1)
              document.addEventListener("mousemove", debouncedMouseMove)
            break

          case "destroyed":
            linkSetRef.current.delete(key)
            if (linkSetRef.current.size === 0)
              document.removeEventListener("mousemove", debouncedMouseMove)
            break
        }
      }
    })
  }, [editor])

  return (
    <div
      id={OPEN_LINK_MENU_ID}
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos?.x || !pos?.y}
      className={cn(
        "absolute flex items-center justify-between bg-background border rounded-md p-1 gap-1",
        pos?.x && pos.y ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {link && !copied ? (
        <a
          className="text-xs text-muted-foreground hover:text-foreground"
          href={link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link}
        </a>
      ) : (
        <span className="w-full text-xs text-center text-muted-foreground">
          {copied ? "🎉 Copied!" : "No link"}
        </span>
      )}
      {link && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  navigator.clipboard.writeText(link)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 1000)
                }}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
