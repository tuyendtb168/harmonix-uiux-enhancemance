import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-xs rounded-lg border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Simple wrapper for easy use
interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  return (
    <TooltipRoot delayDuration={300}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  )
}

// Glossary tooltip — shows "?" icon with term explanation
interface GlossaryTooltipProps {
  term: string
  definition: string
  className?: string
}

function GlossaryTooltip({ term, definition, className }: GlossaryTooltipProps) {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-medium text-foreground">{term}</p>
          <p className="text-muted-foreground">{definition}</p>
        </div>
      }
    >
      <button
        type="button"
        className={cn('inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors', className)}
        aria-label={`What is ${term}?`}
      >
        <HelpCircle className="h-3.5 w-3.5" aria-hidden />
      </button>
    </Tooltip>
  )
}

export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, Tooltip, GlossaryTooltip }
