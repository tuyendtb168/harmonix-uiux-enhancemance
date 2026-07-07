import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { rewardsApi } from '../api/rewards.api'

export function useRewards() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['rewards'],
    queryFn: rewardsApi.getRewards,
    staleTime: 30_000,
  })

  return {
    summary: data?.summary,
    breakdown: data?.breakdown,
    partnerPoints: data?.partnerPoints ?? [],
    positions: data?.positions ?? [],
    pendingLocked: data?.pendingLocked,
    campaigns: data?.campaigns ?? [],
    achievements: data?.achievements ?? [],
    history: data?.history ?? [],
    isLoading,
    error,
    refetch,
  }
}

export function useJoinCampaign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (campaignId: string) => rewardsApi.joinCampaign(campaignId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] })
    },
  })
}
