import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/cn"
import {
  Bold,
  Code,
  Copy,
  Italic,
  Link,
  Underline,
  Strikethrough,
  Check,
  Trash
} from "lucide-react"

type IconType =
  | "bold"
  | "code"
  | "copy"
  | "italic"
  | "link"
  | "underline"
  | "strike"
  | "check"
  | "trash"

type IconButtonProps = {
  active?: boolean
  icon: IconType
} & ComponentPropsWithoutRef<typeof Button>

const IconLibrary: Record<IconType, React.ReactNode> = {
  bold: <Bold className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  copy: <Copy className="h-4 w-4" />,
  italic: <Italic className="h-4 w-4" />,
  link: <Link className="h-4 w-4" />,
  underline: <Underline className="h-4 w-4" />,
  strike: <Strikethrough className="h-4 w-4" />,
  check: <Check className="h-4 w-4" />,
  trash: <Trash className="h-4 w-4" />,
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, active, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 p-0",
          active
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {IconLibrary[icon]}
      </Button>
    )
  }
)

IconButton.displayName = "IconButton"
