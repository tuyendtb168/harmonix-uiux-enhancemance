import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
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
import { cn } from '@/shared/lib/utils'

// Step IDs
type DepositStep = 'input' | 'review' | 'approval' | 'signing' | 'processing' | 'success'

const STEP_ORDER: DepositStep[] = ['input', 'review', 'signing', 'processing', 'success']
const STEP_ORDER_WITH_APPROVAL: DepositStep[] = ['input', 'review', 'approval', 'signing', 'processing', 'success']

// Progress bar step count (visual only — excludes 'processing')
const PROGRESS_STEPS = 4

interface DepositModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: (amount: number) => void
  vaultName: string
  vaultId: string
  asset?: string
  walletBalance?: number
  minDeposit?: number
  isFirstDeposit?: boolean
  needsApproval?: boolean
}

export function DepositModal({
  open,
  onClose,
  onSuccess,
  vaultName,
  asset = 'USDC',
  walletBalance = 5000,
  minDeposit = 100,
  isFirstDeposit = false,
  needsApproval = false,
}: DepositModalProps) {
  const [step, setStep] = useState<DepositStep>('input')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const steps = needsApproval ? STEP_ORDER_WITH_APPROVAL : STEP_ORDER

  const currentStepIndex = steps.indexOf(step)
  const progressStep = Math.min(currentStepIndex + 1, PROGRESS_STEPS)

  const parsedAmount = parseFloat(amount) || 0
  const estimatedGas = 0.8
  const estimatedYearlyEarnings = (parsedAmount * 0.124).toFixed(2)

  const amountError =
    parsedAmount > 0 && parsedAmount > walletBalance
      ? `Amount exceeds your balance of ${walletBalance.toLocaleString()} ${asset}`
      : parsedAmount > 0 && parsedAmount < minDeposit
      ? `Minimum deposit is $${minDeposit} ${asset}`
      : null

  const handleClose = () => {
    setStep('input')
    setAmount('')
    setError(null)
    onClose()
  }

  const handleQuickAmount = (pct: number) => {
    const val = Math.floor((walletBalance * pct) / 100)
    setAmount(String(val))
  }

  // Simulate async actions
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
      setStep(needsApproval ? 'approval' : 'signing')
      return
    }

    if (step === 'approval') {
      setIsLoading(true)
      try {
        await simulateAsync(1500) // simulate wallet approval
        setStep('signing')
      } catch {
        setError('Approval cancelled. You need to approve USDC before depositing.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    if (step === 'signing') {
      setIsLoading(true)
      try {
        await simulateAsync(1500) // simulate wallet signing
        setStep('processing')
        await simulateAsync(2000) // simulate on-chain processing
        setStep('success')
        onSuccess?.(parsedAmount)
      } catch {
        setError('Transaction cancelled. Your funds were not moved.')
      } finally {
        setIsLoading(false)
      }
      return
    }
  }

  const showClose = step !== 'processing'
  const stepTitle: Record<DepositStep, string> = {
    input:      `Deposit ${asset}`,
    review:     'Review Deposit',
    approval:   'Approve USDC',
    signing:    'Confirm Deposit',
    processing: 'Processing...',
    success:    'Deposit Complete',
  }

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
                  <label htmlFor="deposit-amount" className="text-muted-foreground">
                    Amount
                  </label>
                  <span className="text-muted-foreground">
                    Balance:{' '}
                    <button
                      className="font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setAmount(String(walletBalance))}
                      type="button"
                    >
                      {walletBalance.toLocaleString()} {asset}
                    </button>
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="deposit-amount"
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className={cn(
                      'w-full rounded-lg border bg-card px-4 py-3 pr-16 text-xl font-semibold tabular-nums',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring',
                      amountError ? 'border-destructive' : 'border-border'
                    )}
                    aria-describedby={amountError ? 'amount-error' : undefined}
                    aria-invalid={!!amountError}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    {asset}
                  </span>
                </div>
                {amountError && (
                  <p id="amount-error" className="text-xs text-destructive" role="alert">
                    {amountError}
                  </p>
                )}
              </div>

              {/* Quick select */}
              <div className="grid grid-cols-4 gap-2" role="group" aria-label="Quick amount selection">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickAmount(pct)}
                    className="rounded-md border border-border py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {pct === 100 ? 'MAX' : `${pct}%`}
                  </button>
                ))}
              </div>

              {/* Vault info */}
              <div className="rounded-lg bg-muted/50 px-4 py-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vault</span>
                  <span className="font-medium text-foreground">{vaultName}</span>
                </div>
                {parsedAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. yearly earnings</span>
                    <span className="font-medium text-success">+${estimatedYearlyEarnings} {asset}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border divide-y divide-border text-sm">
                {[
                  { label: 'Depositing', value: `${Number(amount).toLocaleString()} ${asset}`, bold: true },
                  { label: 'Vault', value: vaultName },
                  { label: 'Est. APY', value: '12.4%' },
                  { label: 'Est. gas fee', value: `~$${estimatedGas}` },
                  { label: 'To', value: '0x1234...5678' },
                ].map(({ label, value, bold }) => (
                  <div key={label} className="flex justify-between px-4 py-2.5">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={cn('text-foreground', bold && 'font-semibold tabular-nums')}>{value}</span>
                  </div>
                ))}
              </div>

              {needsApproval && (
                <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <AlertCircle className="h-4 w-4 shrink-0 text-warning mt-0.5" aria-hidden />
                  <p>
                    A one-time USDC approval is required before your first deposit.
                    You'll sign 2 transactions total.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2.5: Approval */}
          {step === 'approval' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/30 p-5 text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <p className="text-sm font-medium text-foreground">One-time approval needed</p>
                <p className="text-xs text-muted-foreground">
                  Before your first USDC deposit, you need to approve Harmonix to use your USDC.
                  This is a one-time step — you won't need to do this again for USDC.
                </p>
                <p className="text-xs text-muted-foreground">Gas fee: ~$0.30</p>
              </div>
              {error && <ErrorState message={error} onRetry={() => setError(null)} />}
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
              {error && <ErrorState message={error} onRetry={() => { setError(null); setStep('review') }} />}
            </div>
          )}

          {/* STEP 4: Processing */}
          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Processing on-chain</p>
                <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
              </div>
            </div>
          )}

          {/* STEP 5: Success */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 mx-auto">
                <CheckCircle2 className="h-7 w-7 text-success" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  {isFirstDeposit ? 'Welcome to Harmonix!' : 'Deposit confirmed!'}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {Number(amount).toLocaleString()} {asset}
                  </span>{' '}
                  is now earning in {vaultName}.
                </p>
              </div>

              {isFirstDeposit && (
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-left space-y-2">
                  <p className="text-xs font-medium text-foreground">What happens next:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {[
                      'Your position is now active',
                      'Yield accrues automatically',
                      "No action needed — watch your portfolio grow",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogBody>

        {/* Footer */}
        {step !== 'processing' && (
          <DialogFooter>
            {step === 'success' ? (
              <>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button asChild onClick={handleClose}>
                  <a href="/portfolio">View Portfolio</a>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={step === 'input' ? handleClose : () => setStep(steps[currentStepIndex - 1])}
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
                  {step === 'input' && 'Review Deposit'}
                  {step === 'review' && 'Confirm'}
                  {step === 'approval' && 'Approve USDC'}
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
