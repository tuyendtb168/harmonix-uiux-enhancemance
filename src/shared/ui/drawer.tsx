import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  'aria-labelledby'?: string
  variant?: 'right' | 'bottom'
  className?: string
}

function Drawer({ open, onClose, children, title, 'aria-labelledby': ariaLabelledBy, variant = 'right', className }: DrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<Element | null>(null)

  // Save and restore focus
  React.useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement
    } else {
      const el = previousFocusRef.current
      if (el && 'focus' in el) (el as HTMLElement).focus()
    }
  }, [open])

  // Focus first focusable element when drawer opens
  React.useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    if (first) {
      // Defer so animation doesn't fight focus
      const id = setTimeout(() => first.focus(), 50)
      return () => clearTimeout(id)
    }
  }, [open])

  // Trap focus inside the drawer
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isBottom = variant === 'bottom'

  const drawerVariants = isBottom
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={!ariaLabelledBy ? title : undefined}
            aria-labelledby={ariaLabelledBy}
            className={cn(
              'fixed z-50 bg-card border-border shadow-xl flex flex-col',
              isBottom
                ? 'bottom-0 left-0 right-0 rounded-t-2xl border-t max-h-[85vh]'
                : 'right-0 top-0 bottom-0 w-full max-w-sm border-l',
              className
            )}
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drag handle (bottom only) */}
            {isBottom && (
              <div className="flex justify-center pt-3 pb-1" aria-hidden>
                <div className="h-1 w-10 rounded-full bg-border" />
              </div>
            )}

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-sm p-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Drawer }
