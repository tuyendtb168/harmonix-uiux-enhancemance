import * as React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { EmptyState } from './empty-state'
import { Skeleton } from './skeleton'

export interface Column<T> {
  key: string
  header: string
  accessor: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
  headerClassName?: string
  mobileLabel?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (row: T) => string
  isLoading?: boolean
  emptyMessage?: string
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
  className?: string
}

function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading,
  sortKey,
  sortDir,
  onSort,
  className,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)} aria-busy="true" aria-label="Loading table">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (!data.length) {
    return <EmptyState context="activity" className={className} />
  }

  return (
    <>
      {/* Desktop table */}
      <div className={cn('hidden sm:block overflow-x-auto rounded-xl border border-border', className)}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-muted-foreground',
                    col.sortable && 'cursor-pointer select-none hover:text-foreground',
                    col.headerClassName
                  )}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc'
                        ? <ChevronUp className="h-3 w-3" aria-hidden />
                        : <ChevronDown className="h-3 w-3" aria-hidden />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-muted/20 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-4 py-3 text-foreground', col.className)}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card rows */}
      <div className="sm:hidden space-y-3" role="list">
        {data.map((row) => (
          <div
            key={keyExtractor(row)}
            role="listitem"
            className="rounded-xl border border-border bg-card px-4 py-3 space-y-2"
          >
            {columns.map((col) => (
              <div key={col.key} className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  {col.mobileLabel ?? col.header}
                </span>
                <span className="text-sm text-foreground text-right">
                  {col.accessor(row)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export { Table }
