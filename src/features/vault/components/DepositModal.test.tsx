import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DepositModal } from './DepositModal'

function renderModal(props = {}) {
  return render(
    <MemoryRouter>
      <DepositModal
        open={true}
        onClose={vi.fn()}
        vaultName="Delta Neutral USDC"
        vaultId="delta-neutral-usdc"
        asset="USDC"
        walletBalance={5000}
        minDeposit={100}
        {...props}
      />
    </MemoryRouter>
  )
}

describe('DepositModal', () => {
  it('renders the input step by default', () => {
    renderModal()
    expect(screen.getByText('Deposit USDC')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
  })

  it('shows wallet balance', () => {
    renderModal()
    expect(screen.getByText(/5,000 USDC/)).toBeInTheDocument()
  })

  it('disables Review button when amount is empty', () => {
    renderModal()
    const btn = screen.getByRole('button', { name: /Review Deposit/i })
    expect(btn).toBeDisabled()
  })

  it('enables Review button when valid amount entered', () => {
    renderModal()
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '500' } })
    expect(screen.getByRole('button', { name: /Review Deposit/i })).not.toBeDisabled()
  })

  it('shows error when amount exceeds balance', () => {
    renderModal()
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '9999' } })
    expect(screen.getByRole('alert')).toHaveTextContent(/exceeds your balance/i)
  })

  it('shows error when amount is below minimum', () => {
    renderModal()
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } })
    expect(screen.getByRole('alert')).toHaveTextContent(/Minimum deposit/i)
  })

  it('quick-select 50% fills half of balance', () => {
    renderModal()
    fireEvent.click(screen.getByRole('button', { name: '50%' }))
    expect(screen.getByLabelText('Amount')).toHaveValue(2500)
  })

  it('advances to review step on valid amount', () => {
    renderModal()
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '1000' } })
    fireEvent.click(screen.getByRole('button', { name: /Review Deposit/i }))
    expect(screen.getByText('Review Deposit')).toBeInTheDocument()
    expect(screen.getByText('1,000 USDC')).toBeInTheDocument()
  })

  it('can go back from review to input', () => {
    renderModal()
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '1000' } })
    fireEvent.click(screen.getByRole('button', { name: /Review Deposit/i }))
    fireEvent.click(screen.getByRole('button', { name: /Back/i }))
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
  })

  it('calls onClose when Cancel clicked', () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('shows approval step when needsApproval is true', () => {
    renderModal({ needsApproval: true })
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '1000' } })
    fireEvent.click(screen.getByRole('button', { name: /Review Deposit/i }))
    // Review screen should show approval warning
    expect(screen.getByText(/one-time USDC approval/i)).toBeInTheDocument()
  })
})
