import * as React from 'react'
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

type TimelineStepStatus = 'completed' | 'active' | 'pending' | 'failed'

interface TimelineStep {
  id: string
  label: string
  description?: string
  status: TimelineStepStatus
  timestamp?: string
}

const stepIconMap: Record<TimelineStepStatus, React.ReactNode> = {
  completed: <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />,
  active: <Loader2 className="h-5 w-5 text-primary animate-spin" aria-hidden />,
  pending: <Clock className="h-5 w-5 text-muted-foreground" aria-hidden />,
  failed: <XCircle className="h-5 w-5 text-destructive" aria-hidden />,
}

const stepConnectorClass: Record<TimelineStepStatus, string> = {
  completed: 'bg-success',
  active: 'bg-primary',
  pending: 'bg-border',
  failed: 'bg-destructive',
}

interface TimelineProps {
  steps: TimelineStep[]
  className?: string
}

function Timeline({ steps, className }: TimelineProps) {
  return (
    <ol className={cn('relative space-y-0', className)} aria-label="Progress timeline">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const prevStatus = index > 0 ? steps[index - 1].status : 'completed'
        const connectorClass = stepConnectorClass[prevStatus]

        return (
          <li key={step.id} className="flex gap-4">
            {/* Left column: icon + connector */}
            <div className="flex flex-col items-center">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center"
                aria-hidden
              >
                {stepIconMap[step.status]}
              </div>
              {!isLast && (
                <div
                  className={cn('mt-1 w-0.5 flex-1 min-h-[24px]', connectorClass)}
                  aria-hidden
                />
              )}
            </div>

            {/* Right column: content */}
            <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className={cn(
                      'text-sm font-medium leading-5',
                      step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground',
                      step.status === 'failed' && 'text-destructive'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                  )}
                </div>
                {step.timestamp && (
                  <time className="shrink-0 text-xs text-muted-foreground">{step.timestamp}</time>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// Pre-built withdraw timeline (5 steps)
function WithdrawTimeline({
  activeStep,
  timestamps,
}: {
  activeStep: number
  timestamps?: Partial<Record<number, string>>
}) {
  const WITHDRAW_STEPS = [
    { label: 'Request submitted', description: 'Your withdrawal has been received' },
    { label: 'Queued', description: 'Waiting for operator processing' },
    { label: 'Processing', description: 'Unwinding your position' },
    { label: 'Funds transferred', description: 'Sending to your wallet' },
    { label: 'Complete', description: 'Funds arrived in your wallet' },
  ]

  const steps: TimelineStep[] = WITHDRAW_STEPS.map((s, i) => ({
    id: String(i),
    label: s.label,
    description: s.description,
    status:
      i < activeStep ? 'completed' : i === activeStep ? 'active' : 'pending',
    timestamp: timestamps?.[i],
  }))

  return <Timeline steps={steps} />
}

// Pre-built deposit timeline (3 steps)
function DepositTimeline({ activeStep }: { activeStep: number }) {
  const steps: TimelineStep[] = [
    { id: '0', label: 'Approved', description: 'Token approval confirmed', status: activeStep > 0 ? 'completed' : activeStep === 0 ? 'active' : 'pending' },
    { id: '1', label: 'Submitted', description: 'Transaction sent on-chain', status: activeStep > 1 ? 'completed' : activeStep === 1 ? 'active' : 'pending' },
    { id: '2', label: 'Confirmed', description: 'Position is now active', status: activeStep > 2 ? 'completed' : activeStep === 2 ? 'active' : 'pending' },
  ]

  return <Timeline steps={steps} />
}

export { Timeline, WithdrawTimeline, DepositTimeline }
export type { TimelineStep, TimelineStepStatus }
