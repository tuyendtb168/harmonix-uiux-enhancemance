export type NotificationType =
  | 'deposit_confirmed'
  | 'withdrawal_queued'
  | 'withdrawal_ready'
  | 'yield_milestone'
  | 'vault_paused'
  | 'vault_resumed'
  | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  timestamp: string
  read: boolean
  vaultId?: string
  vaultName?: string
  actionLabel?: string
  actionHref?: string
}
