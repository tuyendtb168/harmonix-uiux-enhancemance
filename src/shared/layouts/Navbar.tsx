import { Link, useLocation } from 'react-router-dom'
import { Bell, Settings } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/earn', label: 'Earn' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/home2', label: 'Home 2' },
  { href: '/earn2', label: 'Earn 2' },
  { href: '/portfolio2', label: 'Portfolio 2' },
]

interface NavbarProps {
  notificationCount?: number
  walletAddress?: string
  onConnectWallet?: () => void
  onOpenNotifications?: () => void
  onOpenWallet?: () => void
}

export function Navbar({
  notificationCount = 0,
  walletAddress,
  onConnectWallet,
  onOpenNotifications,
  onOpenWallet,
}: NavbarProps) {
  const { pathname } = useLocation()

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold text-foreground hover:opacity-90 transition-opacity"
          aria-label="Harmonix — Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]">
            <span className="text-sm font-black text-primary-foreground tracking-tighter">H</span>
          </div>
          <span className="text-base font-bold tracking-tight">Harmonix</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            onClick={onOpenNotifications}
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" aria-hidden />
            {notificationCount > 0 && (
              <span
                className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-primary"
                aria-hidden
              />
            )}
          </button>

          {/* Settings (desktop only) */}
          <Link
            to="/settings"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" aria-hidden />
          </Link>

          {/* Wallet button */}
          {walletAddress ? (
            <button
              onClick={onOpenWallet}
              className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Wallet: ${truncatedAddress}`}
            >
              <div className="h-2 w-2 rounded-full bg-success" aria-hidden />
              <span className="font-mono text-xs">{truncatedAddress}</span>
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onConnectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
