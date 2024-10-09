import * as React from "react"

import { cn } from "@/utilities/cn"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { standAlone?: boolean }
>(({ className, standAlone = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      standAlone ? "" : "rounded-xl border bg-card text-card-foreground shadow",
      "sm:rounded-xl sm:border sm:bg-card sm:text-card-foreground sm:shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { standAlone?: boolean }
>(({ className, standAlone = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 py-6 sm:px-6", standAlone ? "px-0" : "px-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { standAlone?: boolean }
>(({ className, standAlone = false, ...props }, ref) => (
  <div ref={ref} className={cn("pb-6 pt-0 sm:px-6", standAlone ? 'px-0' : 'px-6' ,className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { standAlone?: boolean }
>(({ className, standAlone = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pb-6 pt-0 sm:px-6", standAlone ? 'px-0' : 'px-6', className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
