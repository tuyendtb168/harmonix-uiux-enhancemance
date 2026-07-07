import { useQuery } from '@tanstack/react-query'
import { MOCK_VAULTS, MOCK_VAULT_DETAIL } from '@/shared/api/mockData'
import type { Vault } from '@/features/vault/components/VaultCard'

// Simulate network delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchVaults(): Promise<Vault[]> {
  await delay(600)
  return MOCK_VAULTS
}

async function fetchVault(id: string): Promise<Vault & Record<string, unknown>> {
  await delay(400)
  const base = MOCK_VAULTS.find((v) => v.id === id)
  if (!base) throw new Error(`Vault not found: ${id}`)
  const detail = MOCK_VAULT_DETAIL[id as keyof typeof MOCK_VAULT_DETAIL] ?? {}
  return { ...base, ...detail }
}

export function useVaults() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vaults'],
    queryFn: fetchVaults,
    staleTime: 60_000,
  })
  return { vaults: data ?? [], isLoading, error, refetch }
}

export function useVault(id: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vault', id],
    queryFn: () => fetchVault(id!),
    enabled: !!id,
    staleTime: 60_000,
  })
  return { vault: data, isLoading, error, refetch }
}
