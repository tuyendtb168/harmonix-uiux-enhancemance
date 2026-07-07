import { Bell, CheckCheck } from 'lucide-react'
import { Button, Drawer, EmptyState } from '@/shared/ui'
import { NotificationItem } from './NotificationItem'
import { useNotifications } from '../hooks/useNotifications'

interface NotificationDrawerProps {
  open: boolean
  onClose: () => void
}

export function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()

  return (
    <Drawer open={open} onClose={onClose} variant="right" className="w-full sm:w-[380px]">
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-foreground" aria-hidden />
          <h2 className="text-base font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={markAllRead}
          >
            <CheckCheck className="h-3.5 w-3.5" aria-hidden />
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto" role="list" aria-label="Notifications">
        {notifications.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8">
            <EmptyState context="notifications" />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onMarkRead={markRead} />
            ))}
          </div>
        )}
      </div>
    </Drawer>
  )
}
