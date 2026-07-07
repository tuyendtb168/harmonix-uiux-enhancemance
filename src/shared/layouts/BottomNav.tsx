import { Link, useLocation } from 'react-router-dom'
import { Home, TrendingUp, Briefcase, Star } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/earn', label: 'Earn', icon: TrendingUp },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/rewards', label: 'Rewards', icon: Star },
]

export function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center border-t border-border/50 bg-background/90 backdrop-blur-md sm:hidden"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            to={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
              isActive ? 'bg-primary/10' : ''
            )}>
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <span className={isActive ? 'font-semibold' : ''}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
