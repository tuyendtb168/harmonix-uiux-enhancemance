import { useState } from 'react'
import { ChevronRight, ExternalLink, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, Button, ErrorState } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

interface Wallet {
  id: string
  name: string
  icon: string
  description: string
  downloadUrl: string
  installed?: boolean
}

const WALLETS: Wallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Popular browser extension wallet',
    downloadUrl: 'https://metamask.io',
    installed: true,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect any mobile wallet',
    downloadUrl: 'https://walletconnect.com',
    installed: true,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Coinbase browser & mobile wallet',
    downloadUrl: 'https://www.coinbase.com/wallet',
    installed: false,
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: 'Multi-chain wallet for DeFi',
    downloadUrl: 'https://phantom.app',
    installed: false,
  },
]

type ConnectStep = 'select' | 'connecting' | 'network' | 'error'

interface WalletConnectModalProps {
  open: boolean
  onClose: () => void
  onConnected?: (address: string) => void
}

export function WalletConnectModal({ open, onClose, onConnected }: WalletConnectModalProps) {
  const [step, setStep] = useState<ConnectStep>('select')
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleClose = () => {
    setStep('select')
    setSelectedWallet(null)
    setErrorMessage('')
    onClose()
  }

  const simulateAsync = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms))

  const handleSelectWallet = async (wallet: Wallet) => {
    if (!wallet.installed) return
    setSelectedWallet(wallet)
    setStep('connecting')

    try {
      await simulateAsync(1800)
      // Simulate 80% success, 20% wrong network
      const wrongNetwork = Math.random() > 0.8
      if (wrongNetwork) {
        setStep('network')
      } else {
        onConnected?.('0x1234567890abcdef1234567890abcdef12345678')
        handleClose()
      }
    } catch {
      setErrorMessage('Connection rejected. Please try again.')
      setStep('error')
    }
  }

  const handleSwitchNetwork = async () => {
    setStep('connecting')
    await simulateAsync(1200)
    onConnected?.('0x1234567890abcdef1234567890abcdef12345678')
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent size="sm" showClose={step !== 'connecting'}>
        <DialogHeader>
          <DialogTitle>
            {step === 'select' && 'Connect Wallet'}
            {step === 'connecting' && 'Connecting...'}
            {step === 'network' && 'Switch Network'}
            {step === 'error' && 'Connection Failed'}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="py-4">
          {/* STEP: Select wallet */}
          {step === 'select' && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Choose a wallet to connect. By connecting, you agree to our Terms of Service.
              </p>
              <ul className="space-y-2" role="list">
                {WALLETS.map((wallet) => (
                  <li key={wallet.id}>
                    {wallet.installed ? (
                      <button
                        type="button"
                        onClick={() => handleSelectWallet(wallet)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3',
                          'hover:border-primary/50 hover:bg-accent transition-colors',
                          'focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                      >
                        <span className="text-2xl" aria-hidden>{wallet.icon}</span>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-foreground">{wallet.name}</p>
                          <p className="text-xs text-muted-foreground">{wallet.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
                      </button>
                    ) : (
                      <div className={cn(
                        'flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 opacity-60'
                      )}>
                        <span className="text-2xl" aria-hidden>{wallet.icon}</span>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-foreground">{wallet.name}</p>
                          <p className="text-xs text-muted-foreground">{wallet.description}</p>
                        </div>
                        <a
                          href={wallet.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                          aria-label={`Install ${wallet.name}`}
                        >
                          Install
                          <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP: Connecting */}
          {step === 'connecting' && (
            <div className="py-8 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                {selectedWallet && (
                  <span className="text-3xl" aria-hidden>{selectedWallet.icon}</span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Opening {selectedWallet?.name}...
                </p>
                <p className="text-xs text-muted-foreground">
                  Check your wallet extension to approve the connection.
                </p>
              </div>
              <div className="flex justify-center">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </div>
          )}

          {/* STEP: Wrong network */}
          {step === 'network' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-warning mt-0.5" aria-hidden />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Wrong network detected</p>
                  <p className="text-xs text-muted-foreground">
                    Harmonix runs on Hyperliquid. Please switch your wallet to Hyperliquid to continue.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border divide-y divide-border text-sm">
                {[
                  { label: 'Current network', value: 'Ethereum Mainnet' },
                  { label: 'Required network', value: 'Hyperliquid' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between px-4 py-2.5">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Error */}
          {step === 'error' && (
            <ErrorState
              message={errorMessage}
              onRetry={() => {
                setStep('select')
                setErrorMessage('')
              }}
            />
          )}
        </DialogBody>

        {/* Footer */}
        {step === 'network' && (
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border">
            <Button variant="secondary" onClick={() => setStep('select')}>
              Back
            </Button>
            <Button onClick={handleSwitchNetwork}>
              Switch to Hyperliquid
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
