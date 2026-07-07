import { ArrowRight, ShieldCheck, RefreshCw, Unlock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Button } from '@/shared/ui'

interface HeroSectionProps {
  isConnected?: boolean
}

const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: 'Audited contracts', sub: 'Dec 2024' },
  { icon: Unlock, label: 'Self-custody', sub: 'You hold the keys' },
  { icon: RefreshCw, label: 'Auto-compound', sub: 'No manual claims' },
]

const QUICK_STATS = [
  { label: 'Total Value Locked', value: '$24.8M' },
  { label: 'Yield Paid Out', value: '$3.2M' },
  { label: 'Average APY', value: '14.6%' },
]

export function HeroSection({ isConnected }: HeroSectionProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Subtle dot-grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(222 20% 18% / 0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/8 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Live badge */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-xs font-semibold text-primary"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Live on Hyperliquid
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
          className="text-5xl font-black tracking-tight text-foreground leading-[0.95] sm:text-6xl lg:text-7xl"
        >
          Institutional Yield
          <br />
          <span className="text-primary" style={{ textShadow: '0 0 40px hsl(74 84% 56% / 0.4)' }}>
            on Hyperliquid
          </span>
        </motion.h1>

        {/* Subheadline — clear value prop, not marketing fluff */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.13 }}
          className="mt-6 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed sm:text-lg"
        >
          Deposit once. Earn automatically. Full self-custody with no lock-ups — withdraw in 2–3 days.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" asChild className="min-w-[160px]">
            <Link to="/earn">
              Explore Vaults
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          {!isConnected && (
            <Button variant="secondary" size="lg" asChild className="min-w-[160px]">
              <Link to="/earn">View Performance</Link>
            </Button>
          )}
        </motion.div>

        {/* Trust signals — prominent, above the fold */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.28 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4"
          aria-label="Security and trust information"
        >
          {TRUST_SIGNALS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-left"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Platform stats — single occurrence, compact */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.36 }}
          className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40"
          role="list"
          aria-label="Platform statistics"
        >
          {QUICK_STATS.map(({ label, value }) => (
            <div
              key={label}
              role="listitem"
              className="flex flex-col items-center gap-0.5 bg-card px-3 py-4"
            >
              <p className="text-lg font-black text-foreground tabular-nums sm:text-xl">{value}</p>
              <p className="text-[11px] text-muted-foreground text-center leading-tight">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
