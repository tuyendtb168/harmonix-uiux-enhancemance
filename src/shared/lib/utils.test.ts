import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('deduplicates tailwind classes (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'skipped', 'included')).toBe('base included')
  })

  it('handles undefined and null gracefully', () => {
    expect(cn(undefined, null, 'valid')).toBe('valid')
  })

  it('handles object syntax', () => {
    expect(cn({ active: true, inactive: false })).toBe('active')
  })

  it('returns empty string for no input', () => {
    expect(cn()).toBe('')
  })
})
