import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, ShieldCheck, Zap, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { useCountdown } from '../hooks/useCountdown'

interface BannerSlide {
  id: string
  vaultId: string
  label: string
  title: string
  tagline: string
  description: string
  metrics: { icon: 'apy' | 'risk' | 'bonus'; value: string; label: string }[]
  rewardLogos: { name: string; bg: string; text: string }[]
  bonusDeadline: Date
  gradient: string
}

// Bonus deadline: 6 days + 12 hrs from "now" (mock — would come from API)
const DEADLINE_MS = Date.now() + (6 * 24 + 12) * 3600 * 1000 + 34 * 60 * 1000 + 18 * 1000

const SLIDES: BannerSlide[] = [
  {
    id: 'hausdx-stable',
    vaultId: 'delta-neutral-usdc',
    label: 'New Vault',
    title: 'haUSDX Stable Yield',
    tagline: 'Capture the rise in HyperEVM lending rates.',
    description: 'Built for conservative investors seeking stable returns with low volatility.',
    metrics: [
      { icon: 'apy',   value: '18.40%',   label: 'Current APY' },
      { icon: 'risk',  value: 'Low Risk',  label: 'Risk level' },
      { icon: 'bonus', value: '2x Points', label: 'Early depositor bonus' },
    ],
    rewardLogos: [
      { name: 'HMX', bg: 'bg-neutral-900', text: 'text-white' },
      { name: 'HYP', bg: 'bg-neutral-800', text: 'text-white' },
      { name: 'USD', bg: 'bg-blue-500',    text: 'text-white' },
    ],
    bonusDeadline: new Date(DEADLINE_MS),
    gradient: 'from-[hsl(120_30%_96%)] via-[hsl(120_20%_98%)] to-white',
  },
  {
    id: 'eth-yield-max',
    vaultId: 'eth-yield-max',
    label: 'New Vault',
    title: 'ETH Yield Max',
    tagline: 'Optimized ETH yield across Hyperliquid.',
    description: 'Combines staking rewards, lending rates, and liquidity provision for maximum ETH yield.',
    metrics: [
      { icon: 'apy',   value: '18.20%',     label: 'Current APY' },
      { icon: 'risk',  value: 'Medium Risk', label: 'Risk level' },
      { icon: 'bonus', value: '1.5x Points', label: 'Early depositor bonus' },
    ],
    rewardLogos: [
      { name: 'HMX', bg: 'bg-neutral-900', text: 'text-white' },
      { name: 'ETH', bg: 'bg-indigo-600',  text: 'text-white' },
    ],
    bonusDeadline: new Date(DEADLINE_MS + 2 * 24 * 3600 * 1000),
    gradient: 'from-[hsl(230_30%_96%)] via-[hsl(230_20%_98%)] to-white',
  },
]

function MetricIcon({ type }: { type: BannerSlide['metrics'][0]['icon'] }) {
  if (type === 'apy')   return <TrendingUp  className="h-4 w-4 text-success" aria-hidden />
  if (type === 'risk')  return <ShieldCheck className="h-4 w-4 text-muted-foreground" aria-hidden />
  return <Zap className="h-4 w-4 text-warning" aria-hidden />
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center min-w-[40px]">
      <p className="text-xl font-black text-foreground tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  )
}

interface NewVaultBannerProps {
  className?: string
}

export function NewVaultBanner({ className }: NewVaultBannerProps) {
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = SLIDES.filter((s) => !dismissed.has(s.id))
  const slide = visible[index] ?? null

  const countdown = useCountdown(slide?.bonusDeadline ?? new Date(0))

  const prev = useCallback(() => setIndex((i) => (i - 1 + visible.length) % visible.length), [visible.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % visible.length), [visible.length])

  // Auto-advance every 8 s
  useEffect(() => {
    if (visible.length <= 1) return
    const id = setInterval(next, 8000)
    return () => clearInterval(id)
  }, [next, visible.length])

  const dismiss = () => {
    if (!slide) return
    setDismissed((prev) => new Set([...prev, slide.id]))
    setIndex(0)
  }

  if (!slide) return null

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={cn(
            'relative overflow-hidden rounded-2xl border border-border/50',
            'bg-gradient-to-br', slide.gradient,
          )}
        >
          {/* Dismiss */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/6 text-foreground/60 hover:bg-black/12 hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>

          <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[220px]">
            {/* Left: content */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-5">
              {/* Top */}
              <div className="space-y-3">
                {/* Label */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1">
                  <Sparkles className="h-3 w-3 text-success" aria-hidden />
                  <span className="text-xs font-semibold text-success uppercase tracking-wide">
                    {slide.label}
                  </span>
                </div>

                {/* Headline */}
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight sm:text-3xl">
                    {slide.title}
                  </h2>
                  <p className="text-sm font-medium text-foreground/80 mt-1">{slide.tagline}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 max-w-xs">{slide.description}</p>
                </div>

                {/* Key metrics */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                  {slide.metrics.map(({ icon, value, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <MetricIcon type={icon} />
                      <div>
                        <p className="text-sm font-black text-foreground">{value}</p>
                        <p className="text-[11px] text-muted-foreground">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Button asChild size="md" className="px-6">
                  <Link to={`/earn/${slide.vaultId}`}>Explore vault</Link>
                </Button>
                <Button variant="secondary" size="md" onClick={dismiss}>
                  Dismiss
                </Button>
              </div>
            </div>

            {/* Right: vault art + rewards + countdown */}
            <div className="relative hidden sm:flex lg:w-[380px] items-end justify-end p-6 gap-3 shrink-0">
              {/* Vault art placeholder — replace with real image when available */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div className="relative h-44 w-44 opacity-90">
                  <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 bg-primary/6 rotate-12" />
                  <div className="absolute inset-2 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-5xl font-black text-primary/40 select-none">H</span>
                  </div>
                  {/* Floating coins */}
                  {['-top-4 right-6', '-bottom-2 left-4', 'top-8 -right-6'].map((pos, i) => (
                    <div
                      key={i}
                      className={cn('absolute h-8 w-8 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center', pos)}
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      <span className="text-xs font-black text-primary/50">H</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overlay cards */}
              <div className="relative z-10 flex flex-col gap-3 items-end">
                {/* Rewards card */}
                <div className="rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-2">Earn rewards from</p>
                  <div className="flex items-center gap-1.5">
                    {slide.rewardLogos.map(({ name, bg, text }) => (
                      <div
                        key={name}
                        className={cn('flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black', bg, text)}
                        aria-label={name}
                      >
                        {name.slice(0, 1)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countdown card */}
                {!countdown.expired && (
                  <div className="rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Early bonus ends in</p>
                    <div className="flex items-end gap-1.5">
                      <CountdownUnit value={countdown.days}    label="Days" />
                      <span className="text-lg font-black text-foreground pb-3 leading-none">:</span>
                      <CountdownUnit value={countdown.hours}   label="Hrs" />
                      <span className="text-lg font-black text-foreground pb-3 leading-none">:</span>
                      <CountdownUnit value={countdown.minutes} label="Mins" />
                      <span className="text-lg font-black text-foreground pb-3 leading-none">:</span>
                      <CountdownUnit value={countdown.seconds} label="Secs" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          {visible.length > 1 && (
            <>
              {/* Arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/8 hover:bg-black/16 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/8 hover:bg-black/16 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-4 w-4 text-foreground" aria-hidden />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5" role="tablist" aria-label="Slides">
                {visible.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'rounded-full transition-all',
                      i === index
                        ? 'w-4 h-2 bg-foreground/60'
                        : 'w-2 h-2 bg-foreground/25 hover:bg-foreground/40'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
