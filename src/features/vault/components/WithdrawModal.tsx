import { useState } from 'react'
import { Clock, CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  ModalStepProgress,
  Button,
  ErrorState,
} from '@/shared/ui'
import { Timeline, type TimelineStep } from '@/shared/ui/timeline'
import { cn } from '@/shared/lib/utils'

type WithdrawStep = 'input' | 'review' | 'signing' | 'processing' | 'success'

const STEP_ORDER: WithdrawStep[] = ['input', 'review', 'signing', 'processing', 'success']
const PROGRESS_STEPS = 3

interface WithdrawModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: (amount: number) => void
  vaultName: string
  vaultId: string
  asset?: string
  positionValue?: number
  withdrawalDays?: string
}

export function WithdrawModal({
  open,
  onClose,
  onSuccess,
  vaultName,
  asset = 'USDC',
  positionValue = 5620,
  withdrawalDays = '2–3 days',
}: WithdrawModalProps) {
  const [step, setStep] = useState<WithdrawStep>('input')
  const [amount, setAmount] = useState('')
  const [isMax, setIsMax] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentStepIndex = STEP_ORDER.indexOf(step)
  const progressStep = Math.min(currentStepIndex + 1, PROGRESS_STEPS)

  const parsedAmount = isMax ? positionValue : (parseFloat(amount) || 0)
  const displayAmount = isMax ? positionValue.toLocaleString() : amount

  const amountError =
    parsedAmount > 0 && parsedAmount > positionValue
      ? `Amount exceeds your position of ${positionValue.toLocaleString()} ${asset}`
      : null

  const handleClose = () => {
    setStep('input')
    setAmount('')
    setIsMax(false)
    setError(null)
    onClose()
  }

  const handleSetMax = () => {
    setIsMax(true)
    setAmount(String(positionValue))
  }

  const handleAmountChange = (val: string) => {
    setIsMax(false)
    setAmount(val)
  }

  const simulateAsync = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms))

  const handleNext = async () => {
    setError(null)

    if (step === 'input') {
      if (!parsedAmount || amountError) return
      setStep('review')
      return
    }

    if (step === 'review') {
      setStep('signing')
      return
    }

    if (step === 'signing') {
      setIsLoading(true)
      try {
        await simulateAsync(1500)
        setStep('processing')
        await simulateAsync(2000)
        setStep('success')
        onSuccess?.(parsedAmount)
      } catch {
        setError('Transaction cancelled. Your withdrawal was not submitted.')
      } finally {
        setIsLoading(false)
      }
      return
    }
  }

  const showClose = step !== 'processing'

  const stepTitle: Record<WithdrawStep, string> = {
    input:      'Withdraw',
    review:     'Review Withdrawal',
    signing:    'Confirm Withdrawal',
    processing: 'Submitting...',
    success:    'Withdrawal Queued',
  }

  // Timeline steps shown on success screen
  const timelineSteps: TimelineStep[] = [
    { id: 'submitted', label: 'Request submitted', status: 'completed' },
    { id: 'processing', label: 'Processing on-chain', status: 'active' },
    { id: 'transfer', label: `Funds transferred to your wallet (${withdrawalDays})`, status: 'pending' },
  ]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent size="md" showClose={showClose}>
        <DialogHeader>
          {step !== 'success' && step !== 'processing' && (
            <ModalStepProgress
              currentStep={progressStep}
              totalSteps={PROGRESS_STEPS}
              className="mb-3"
            />
          )}
          <DialogTitle>{stepTitle[step]}</DialogTitle>
        </DialogHeader>

        <DialogBody className="py-4">
          {/* STEP 1: Amount Input */}
          {step === 'input' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="withdraw-amount" className="text-muted-foreground">
                    Amount
                  </label>
                  <span className="text-muted-foreground">
                    Position:{' '}
                    <button
                      type="button"
                      className="font-medium text-foreground hover:text-primary transition-colors"
                      onClick={handleSetMax}
                    >
                      {positionValue.toLocaleString()} {asset}
                    </button>
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="withdraw-amount"
                    type="number"
                    inputMode="decimal"
                    value={displayAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="0"
                    className={cn(
                      'w-full rounded-lg border bg-card px-4 py-3 pr-16 text-xl font-semibold tabular-nums',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring',
                      amountError ? 'border-destructive' : 'border-border'
                    )}
                    aria-describedby={amountError ? 'withdraw-amount-error' : undefined}
                    aria-invalid={!!amountError}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    {asset}
                  </span>
                </div>
                {amountError && (
                  <p id="withdraw-amount-error" className="text-xs text-destructive" role="alert">
                    {amountError}
                  </p>
                )}
              </div>

              {/* Max button */}
              <button
                type="button"
                onClick={handleSetMax}
                className={cn(
                  'w-full rounded-md border py-2 text-sm font-medium transition-colors',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  isMax
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                )}
              >
                Withdraw full position ({positionValue.toLocaleString()} {asset})
              </button>

              {/* Timeline notice */}
              <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-warning mt-0.5" aria-hidden />
                <p>
                  Withdrawals take <span className="font-medium text-foreground">{withdrawalDays}</span> to
                  arrive in your wallet. Funds are auto-transferred — no manual claim needed.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border divide-y divide-border text-sm">
                {[
                  { label: 'Withdrawing', value: `${parsedAmount.toLocaleString()} ${asset}`, bold: true },
                  { label: 'From vault', value: vaultName },
                  { label: 'To wallet', value: '0x1234...5678' },
                  { label: 'Estimated arrival', value: withdrawalDays },
                  { label: 'Est. gas fee', value: '~$0.60' },
                ].map(({ label, value, bold }) => (
                  <div key={label} className="flex justify-between px-4 py-2.5">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={cn('text-foreground', bold && 'font-semibold tabular-nums')}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-warning mt-0.5" aria-hidden />
                <p>
                  After submitting, your withdrawal is queued. Funds arrive automatically in {withdrawalDays} —
                  you don't need to return to claim them.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Signing */}
          {step === 'signing' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/30 p-5 text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  {isLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <span className="text-lg">🔏</span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {isLoading ? 'Waiting for wallet...' : 'Confirm in your wallet'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Check your wallet extension to approve the transaction.
                </p>
              </div>
              {error && (
                <ErrorState message={error} onRetry={() => { setError(null); setStep('review') }} />
              )}
            </div>
          )}

          {/* STEP 4: Processing */}
          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Submitting on-chain</p>
                <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
              </div>
            </div>
          )}

          {/* STEP 5: Success */}
          {step === 'success' && (
            <div className="space-y-5 py-2">
              <div className="text-center space-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 mx-auto">
                  <CheckCircle2 className="h-7 w-7 text-success" aria-hidden />
                </div>
                <p className="text-base font-semibold text-foreground">Withdrawal submitted!</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {parsedAmount.toLocaleString()} {asset}
                  </span>{' '}
                  will arrive in your wallet in {withdrawalDays}.
                </p>
              </div>

              {/* Withdrawal timeline */}
              <Timeline steps={timelineSteps} className="pt-2" />
            </div>
          )}
        </DialogBody>

        {step !== 'processing' && (
          <DialogFooter>
            {step === 'success' ? (
              <>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" asChild onClick={handleClose}>
                  <a href="/portfolio">View Portfolio</a>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={
                    step === 'input'
                      ? handleClose
                      : () => setStep(STEP_ORDER[currentStepIndex - 1])
                  }
                  disabled={isLoading}
                >
                  {step === 'input' ? 'Cancel' : 'Back'}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    isLoading ||
                    (step === 'input' && (!parsedAmount || !!amountError))
                  }
                  loading={isLoading}
                >
                  {step === 'input' && 'Review Withdrawal'}
                  {step === 'review' && 'Submit Withdrawal'}
                  {step === 'signing' && 'Confirm in Wallet'}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
