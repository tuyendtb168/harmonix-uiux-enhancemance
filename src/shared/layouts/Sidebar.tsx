import { Link, useLocation } from 'react-router-dom'
import {
  Home, Briefcase, TrendingUp, Gift, BarChart2,
  Shield, Layers, FileText, BookOpen, HelpCircle,
  Settings, LogOut, Users,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const MAIN_NAV = [
  { href: '/',          label: 'Home',      Icon: Home },
  { href: '/portfolio', label: 'Portfolio', Icon: Briefcase },
  { href: '/earn',      label: 'Earn',      Icon: TrendingUp },
  { href: '/rewards',   label: 'Rewards',   Icon: Gift },
  { href: '/markets',   label: 'Markets',   Icon: BarChart2 },
]
const HARMONIX_NAV = [
  { href: '/protection-vault', label: 'Protection Vault', Icon: Shield },
  { href: '/stake',            label: 'Stake HAR',        Icon: Layers },
]
const RESOURCE_NAV = [
  { href: '/docs',        label: 'Docs',        Icon: FileText },
  { href: '/blog',        label: 'Blog',        Icon: BookOpen },
  { href: '/help-center', label: 'Help Center', Icon: HelpCircle },
]

function NavItem({ href, label, Icon }: { href: string; label: string; Icon: React.ElementType }) {
  const { pathname } = useLocation()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
  return (
    <Link
      to={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </Link>
  )
}

export function Sidebar() {
  // Protocol-level TVL (mock) — replace with real API when available
  const TVL_VALUE = '$148.62M'
  const TVL_CHANGE = '+$1.24M (0.84%)'

  return (
    <aside
      className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-border bg-background h-screen sticky top-0 overflow-y-auto"
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.3)]">
          <span className="text-sm font-black text-primary-foreground tracking-tighter">H</span>
        </div>
        <span className="text-base font-bold text-foreground tracking-tight">Harmonix</span>
      </div>

      {/* Total Value Locked */}
      <div className="mx-3 mb-3 shrink-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Total Value Locked</p>
        <p className="text-xl font-black text-foreground tabular-nums leading-tight">
          {TVL_VALUE}
        </p>
        <p className="text-xs font-semibold text-success mt-0.5">+{TVL_CHANGE} today</p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-0.5" aria-label="Main navigation">
        {MAIN_NAV.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Harmonix */}
      <div className="px-3 mt-3 shrink-0">
        <p className="px-3 mb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Harmonix</p>
        <div className="space-y-0.5">
          {HARMONIX_NAV.map(item => <NavItem key={item.href} {...item} />)}
        </div>
      </div>

      {/* Resources */}
      <div className="px-3 mt-3 shrink-0">
        <p className="px-3 mb-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resources</p>
        <div className="space-y-0.5">
          {RESOURCE_NAV.map(item => <NavItem key={item.href} {...item} />)}
        </div>
      </div>

      {/* Refer & Earn */}
      <div className="mx-3 my-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-3 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold text-foreground">Refer &amp; Earn</p>
          <button className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
          Invite friends and earn Harmonix points.
        </p>
        <div className="flex items-center justify-between">
          <Link
            to="/rewards"
            className="inline-flex items-center gap-1 rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold text-background hover:opacity-90 transition-all"
          >
            Invite now →
          </Link>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" aria-hidden />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-border pt-3 shrink-0 space-y-0.5">
        <NavItem href="/settings" label="Settings" Icon={Settings} />
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          Log out
        </button>
      </div>
    </aside>
  )
}
