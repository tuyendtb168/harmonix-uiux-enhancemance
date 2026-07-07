import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Notification } from '@/features/notifications/types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'withdrawal_ready',
    title: 'Withdrawal Ready',
    body: 'Your $1,200 withdrawal from Delta Neutral USDC is ready to claim.',
    timestamp: '2 min ago',
    read: false,
    vaultId: 'delta-neutral-usdc',
    vaultName: 'Delta Neutral USDC',
    actionLabel: 'Claim Now',
    actionHref: '/portfolio',
  },
  {
    id: 'n2',
    type: 'yield_milestone',
    title: 'Yield Milestone',
    body: "You've earned $500 in total yield across your portfolio.",
    timestamp: '1 hr ago',
    read: false,
    actionLabel: 'View Portfolio',
    actionHref: '/portfolio',
  },
  {
    id: 'n3',
    type: 'deposit_confirmed',
    title: 'Deposit Confirmed',
    body: 'Your $3,000 deposit into ETH Yield Max has been confirmed.',
    timestamp: '2 days ago',
    read: true,
    vaultId: 'eth-yield-max',
    vaultName: 'ETH Yield Max',
  },
  {
    id: 'n4',
    type: 'withdrawal_queued',
    title: 'Withdrawal Queued',
    body: 'Your $2,400 withdrawal from BTC Bull Run is queued for processing.',
    timestamp: '3 days ago',
    read: true,
    vaultId: 'btc-bull-run',
    vaultName: 'BTC Bull Run',
  },
]

let localNotifications = [...MOCK_NOTIFICATIONS]

async function fetchNotifications(): Promise<Notification[]> {
  await delay(300)
  return [...localNotifications]
}

async function markOneRead(id: string): Promise<void> {
  await delay(100)
  localNotifications = localNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  )
}

async function markAllRead(): Promise<void> {
  await delay(100)
  localNotifications = localNotifications.map((n) => ({ ...n, read: true }))
}

export function useNotifications() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 30_000,
  })

  const markRead = useMutation({
    mutationFn: markOneRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const markAllReadMutation = useMutation({
    mutationFn: markAllRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const notifications = data ?? []
  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markRead: (id: string) => markRead.mutate(id),
    markAllRead: () => markAllReadMutation.mutate(),
  }
}
