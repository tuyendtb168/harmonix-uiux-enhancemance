import { useState } from 'react'
import { Moon, Sun, Monitor, Bell, Shield, Globe, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { useTheme } from '@/shared/context/ThemeContext'
import { cn } from '@/shared/lib/utils'

type Theme = 'light' | 'dark' | 'system'
type Currency = 'USD' | 'EUR' | 'GBP'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  id: string
}

function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring',
        checked ? 'bg-primary' : 'bg-border'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
        aria-hidden
      />
    </button>
  )
}

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light',  label: 'Light',  icon: <Sun className="h-4 w-4" aria-hidden /> },
  { value: 'dark',   label: 'Dark',   icon: <Moon className="h-4 w-4" aria-hidden /> },
  { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" aria-hidden /> },
]

const CURRENCY_OPTIONS: Currency[] = ['USD', 'EUR', 'GBP']

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [currency, setCurrency] = useState<Currency>('USD')

  // Notification prefs
  const [notifDeposit, setNotifDeposit]     = useState(true)
  const [notifWithdraw, setNotifWithdraw]   = useState(true)
  const [notifYield, setNotifYield]         = useState(true)
  const [notifVaultAlert, setNotifVaultAlert] = useState(true)
  const [notifMarketing, setNotifMarketing] = useState(false)

  // Privacy
  const [hideBalances, setHideBalances]     = useState(false)
  const [analyticsOpt, setAnalyticsOpt]     = useState(true)

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your preferences and account settings.
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sun className="h-4 w-4 text-muted-foreground" aria-hidden />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          <SettingRow label="Theme" description="Choose your preferred color scheme.">
            <div
              className="flex flex-wrap rounded-lg border border-border overflow-hidden"
              role="group"
              aria-label="Theme"
            >
              {THEME_OPTIONS.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors',
                    theme === value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  aria-pressed={theme === value}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </SettingRow>

          <SettingRow label="Currency" description="Display currency for portfolio values.">
            <div
              className="flex flex-wrap rounded-lg border border-border overflow-hidden"
              role="group"
              aria-label="Currency"
            >
              {CURRENCY_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium transition-colors',
                    currency === c
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  aria-pressed={currency === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </SettingRow>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bell className="h-4 w-4 text-muted-foreground" aria-hidden />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {[
            { id: 'notif-deposit',    label: 'Deposit confirmed',   desc: 'When a deposit is successfully processed.',       value: notifDeposit,    set: setNotifDeposit },
            { id: 'notif-withdraw',   label: 'Withdrawal updates',  desc: 'Status changes on pending withdrawals.',          value: notifWithdraw,   set: setNotifWithdraw },
            { id: 'notif-yield',      label: 'Yield milestones',    desc: 'When you hit yield earning milestones.',          value: notifYield,      set: setNotifYield },
            { id: 'notif-vault',      label: 'Vault alerts',        desc: 'Vault paused, resumed, or capacity changes.',    value: notifVaultAlert, set: setNotifVaultAlert },
            { id: 'notif-marketing',  label: 'Product updates',     desc: 'New features, campaigns, and announcements.',    value: notifMarketing,  set: setNotifMarketing },
          ].map(({ id, label, desc, value, set }) => (
            <SettingRow key={id} label={label} description={desc}>
              <Toggle id={id} checked={value} onChange={set} label={label} />
            </SettingRow>
          ))}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" aria-hidden />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          <SettingRow label="Hide balances" description="Mask portfolio values from the UI.">
            <Toggle id="hide-balances" checked={hideBalances} onChange={setHideBalances} label="Hide balances" />
          </SettingRow>
          <SettingRow label="Analytics" description="Help improve Harmonix with anonymous usage data.">
            <Toggle id="analytics" checked={analyticsOpt} onChange={setAnalyticsOpt} label="Analytics" />
          </SettingRow>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
            Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {[
            { label: 'Documentation',   href: 'https://docs.harmonix.fi' },
            { label: 'Terms of Service', href: 'https://harmonix.fi/terms' },
            { label: 'Privacy Policy',   href: 'https://harmonix.fi/privacy' },
            { label: 'Support',          href: 'https://harmonix.fi/support' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3.5 text-sm text-foreground hover:text-primary transition-colors"
            >
              {label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Version */}
      <p className="text-xs text-muted-foreground text-center pb-4">
        Harmonix v2.0.0 · Built on Hyperliquid
      </p>
    </div>
  )
}
