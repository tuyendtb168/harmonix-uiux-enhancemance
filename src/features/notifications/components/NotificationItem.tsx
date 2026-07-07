import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, TrendingDown, TrendingUp, Bell, AlertTriangle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Notification, NotificationType } from '../types'

const TYPE_CONFIG: Record<NotificationType, { icon: React.ReactNode; dotClass: string }> = {
  deposit_confirmed: {
    icon: <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />,
    dotClass: 'bg-success',
  },
  withdrawal_queued: {
    icon: <Clock className="h-4 w-4 text-warning" aria-hidden />,
    dotClass: 'bg-warning',
  },
  withdrawal_ready: {
    icon: <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />,
    dotClass: 'bg-success',
  },
  yield_milestone: {
    icon: <TrendingUp className="h-4 w-4 text-primary" aria-hidden />,
    dotClass: 'bg-primary',
  },
  vault_paused: {
    icon: <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden />,
    dotClass: 'bg-destructive',
  },
  vault_resumed: {
    icon: <TrendingDown className="h-4 w-4 text-success" aria-hidden />,
    dotClass: 'bg-success',
  },
  system: {
    icon: <Bell className="h-4 w-4 text-muted-foreground" aria-hidden />,
    dotClass: 'bg-muted-foreground',
  },
}

interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const cfg = TYPE_CONFIG[notification.type]

  const handleClick = () => {
    if (!notification.read) onMarkRead(notification.id)
  }

  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-3 transition-colors',
        !notification.read ? 'bg-primary/5 cursor-pointer hover:bg-primary/10' : 'cursor-default'
      )}
      onClick={handleClick}
      role="listitem"
      aria-label={`${notification.read ? '' : 'Unread: '}${notification.title}`}
      tabIndex={!notification.read ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
    >
      {/* Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
        {cfg.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            'text-sm leading-snug',
            notification.read ? 'text-foreground' : 'font-medium text-foreground'
          )}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', cfg.dotClass)} aria-label="Unread" />
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{notification.body}</p>
        <div className="flex items-center justify-between pt-0.5">
          <time className="text-xs text-muted-foreground">{notification.timestamp}</time>
          {notification.actionLabel && notification.actionHref && (
            <Link
              to={notification.actionHref}
              onClick={handleClick}
              className="text-xs font-medium text-primary hover:underline"
            >
              {notification.actionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
