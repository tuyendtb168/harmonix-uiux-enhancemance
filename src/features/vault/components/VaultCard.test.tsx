import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { VaultCard } from './VaultCard'
import type { Vault } from './VaultCard'

const MOCK_VAULT: Vault = {
  id: 'test-vault',
  name: 'Test Vault',
  asset: 'USDC',
  apy: 12.4,
  tvl: 1000000,
  tvlFormatted: '$1.0M',
  risk: 'low',
  status: 'active',
  strategy: 'Delta Neutral',
  goal: 'stable-income',
  minDeposit: 100,
  description: 'A test vault for unit testing purposes.',
}

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <VaultCard vault={MOCK_VAULT} {...props} />
    </MemoryRouter>
  )
}

describe('VaultCard', () => {
  it('renders vault name and asset', () => {
    renderCard()
    expect(screen.getByText('Test Vault')).toBeInTheDocument()
    expect(screen.getByText(/USDC/)).toBeInTheDocument()
  })

  it('displays APY', () => {
    renderCard()
    expect(screen.getByText('12.4%')).toBeInTheDocument()
  })

  it('shows risk badge', () => {
    renderCard()
    expect(screen.getByText('Low Risk')).toBeInTheDocument()
  })

  it('renders Details link to vault page', () => {
    renderCard()
    const link = screen.getByRole('link', { name: /View Test Vault details/i })
    expect(link).toHaveAttribute('href', '/earn/test-vault')
  })

  it('calls onDeposit when Deposit button clicked', () => {
    const onDeposit = vi.fn()
    renderCard({ onDeposit })
    fireEvent.click(screen.getByRole('button', { name: /Deposit into Test Vault/i }))
    expect(onDeposit).toHaveBeenCalledWith('test-vault')
  })

  it('does not render Deposit button when vault is paused', () => {
    const pausedVault = { ...MOCK_VAULT, status: 'paused' as const }
    render(
      <MemoryRouter>
        <VaultCard vault={pausedVault} onDeposit={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.queryByRole('button', { name: /Deposit/i })).not.toBeInTheDocument()
  })

  it('calls onWatchlist when star button clicked', () => {
    const onWatchlist = vi.fn()
    renderCard({ onWatchlist })
    fireEvent.click(screen.getByRole('button', { name: /Add to watchlist/i }))
    expect(onWatchlist).toHaveBeenCalledWith('test-vault')
  })

  it('shows compare button when onCompare provided', () => {
    const onCompare = vi.fn()
    renderCard({ onCompare })
    expect(screen.getByRole('button', { name: /Add to comparison/i })).toBeInTheDocument()
  })

  it('shows compare selected state', () => {
    const onCompare = vi.fn()
    renderCard({ onCompare, isCompareSelected: true })
    expect(screen.getByRole('button', { name: /Remove from comparison/i })).toBeInTheDocument()
    expect(screen.getByText('Added')).toBeInTheDocument()
  })
})
