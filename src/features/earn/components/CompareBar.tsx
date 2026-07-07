import { motion, AnimatePresence } from 'framer-motion'
import { X, GitCompareArrows } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import type { Vault } from '@/features/vault/components/VaultCard'

interface CompareBarProps {
  selected: Vault[]
  onRemove: (id: string) => void
  onClear: () => void
  onCompare: () => void
}

export function CompareBar({ selected, onRemove, onClear, onCompare }: CompareBarProps) {
  const count = selected.length
  const canCompare = count >= 2

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'fixed bottom-16 sm:bottom-0 left-0 right-0 z-40',
            'border-t border-border/60 bg-background/95 backdrop-blur-md shadow-lg',
            'px-4 py-3 sm:px-6'
          )}
          role="region"
          aria-label="Vault comparison"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-screen-xl items-center gap-4">
            {/* Count + vault chips */}
            <div className="flex flex-1 items-center gap-3 min-w-0 overflow-x-auto">
              <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
                {count} selected
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                {selected.map((vault) => (
                  <span
                    key={vault.id}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-muted/60 pl-2.5 pr-1.5 py-0.5 text-xs font-medium text-foreground"
                  >
                    {vault.name}
                    <button
                      type="button"
                      onClick={() => onRemove(vault.id)}
                      aria-label={`Remove ${vault.name} from comparison`}
                      className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <X className="h-3 w-3" aria-hidden />
                    </button>
                  </span>
                ))}

                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 2 - count) }).map((_, i) => (
                  <span
                    key={`empty-${i}`}
                    className="flex h-6 w-20 items-center justify-center rounded-full border border-dashed border-border text-xs text-muted-foreground"
                    aria-hidden
                  >
                    + vault
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onClear}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
                aria-label="Clear all vault selections"
              >
                Clear
              </button>
              <Button
                size="sm"
                onClick={onCompare}
                disabled={!canCompare}
                aria-label={`Compare ${count} selected vaults`}
              >
                <GitCompareArrows className="h-4 w-4" aria-hidden />
                Compare
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
