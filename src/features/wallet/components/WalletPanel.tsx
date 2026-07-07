import { ExternalLink, LogOut, Copy, CheckCheck } from 'lucide-react'
import { useState } from 'react'
import { Drawer } from '@/shared/ui'
import { Button } from '@/shared/ui'

interface WalletPanelProps {
  open: boolean
  onClose: () => void
  address: string
  onDisconnect: () => void
}

function truncate(addr: string) {
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`
}

const MOCK_BALANCES = [
  { asset: 'USDC', amount: '4,248.32', usdValue: '$4,248.32' },
  { asset: 'ETH',  amount: '1.284',    usdValue: '$3,194.20' },
  { asset: 'HYPE', amount: '420.0',    usdValue: '$1,092.00' },
]

const MOCK_NETWORK = 'Hyperliquid'

export function WalletPanel({ open, onClose, address, onDisconnect }: WalletPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDisconnect = () => {
    onDisconnect()
    onClose()
  }

  return (
    <Drawer open={open} onClose={onClose} variant="right" className="w-full sm:w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <h2 className="text-base font-semibold text-foreground">Wallet</h2>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
          <span className="text-muted-foreground">{MOCK_NETWORK}</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4">
        {/* Address card */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
          <p className="text-xs text-muted-foreground">Connected address</p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-medium text-foreground">
              {truncate(address)}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={copied ? 'Copied' : 'Copy address'}
              >
                {copied
                  ? <CheckCheck className="h-3.5 w-3.5 text-success" aria-hidden />
                  : <Copy className="h-3.5 w-3.5" aria-hidden />
                }
              </button>
              <a
                href={`https://app.hyperliquid.xyz/explorer/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="View on explorer"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Wallet balances */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Wallet Balances</p>
          <ul className="space-y-1" role="list">
            {MOCK_BALANCES.map((b) => (
              <li
                key={b.asset}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {b.asset.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{b.asset}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">{b.amount}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground tabular-nums">{b.usdValue}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Disconnect */}
        <div className="border-t border-border pt-4">
          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleDisconnect}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Disconnect
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
