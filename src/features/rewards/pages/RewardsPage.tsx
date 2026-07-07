import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Shield, ArrowRight, Megaphone, Trophy, History } from 'lucide-react'
import { Card, CardContent, Button, EmptyState, ErrorState } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { RewardsSummaryCards } from '../components/RewardsSummaryCards'
import { PointsBreakdownChart } from '../components/PointsBreakdownChart'
import { HowYouEarnPoints } from '../components/HowYouEarnPoints'
import { PartnerPointsSection } from '../components/PartnerPointsSection'
import { PositionsTable } from '../components/PositionsTable'
import { CampaignCard } from '../components/CampaignCard'
import { AchievementsSection } from '../components/AchievementsSection'
import { RewardHistory } from '../components/RewardHistory'
import { useRewards, useJoinCampaign } from '../hooks/useRewards'

type Tab = 'my-points' | 'history' | 'campaigns'

const TABS: { id: Tab; label: string }[] = [
  { id: 'my-points',  label: 'My Points' },
  { id: 'history',    label: 'History' },
  { id: 'campaigns',  label: 'Campaigns' },
]

export function RewardsPage() {
  const { summary, breakdown, partnerPoints, positions, campaigns, achievements, history, isLoading, error, refetch } = useRewards()
  const joinMutation = useJoinCampaign()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const tab = searchParams.get('tab')
    return (tab === 'history' || tab === 'campaigns' || tab === 'my-points') ? tab : 'my-points'
  })
  const [joiningId, setJoiningId] = useState<string | null>(null)
  const [isClaiming, setIsClaiming] = useState(false)
  const [showAllCampaigns, setShowAllCampaigns] = useState(false)

  const activeCampaigns = campaigns.filter((c) => c.status === 'active')
  const visibleCampaigns = showAllCampaigns ? campaigns : activeCampaigns

  const handleClaimAll = async () => {
    setIsClaiming(true)
    await new Promise<void>((r) => setTimeout(r, 1500))
    setIsClaiming(false)
  }

  const handleJoin = async (id: string) => {
    setJoiningId(id)
    try {
      await joinMutation.mutateAsync(id)
    } finally {
      setJoiningId(null)
    }
  }

  const claimableCount = history.filter((h) => h.status === 'claimable').length

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Rewards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your points, rewards, and campaigns across Harmonix and our partners.
          </p>
        </div>
        <ErrorState message="Could not load your rewards." onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Rewards</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your points, rewards, and campaigns across Harmonix and our partners.
        </p>
      </div>

      {/* Summary card */}
      <RewardsSummaryCards
        summary={summary}
        isLoading={isLoading}
        onClaimAll={handleClaimAll}
        isClaiming={isClaiming}
      />

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex" role="tablist" aria-label="Rewards sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeTab === tab.id
                  ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                {tab.id === 'history' && claimableCount > 0 && (
                  <span
                    className="flex h-4 min-w-4 items-center justify-center rounded-full bg-success px-1 text-[10px] font-bold text-white"
                    aria-label={`${claimableCount} claimable rewards`}
                  >
                    {claimableCount}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab: My Points */}
      {activeTab === 'my-points' && (
        <div className="space-y-6">
          {/* Breakdown + How you earn — side by side on large screens */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
            <Card>
              <CardContent className="p-5 sm:p-6">
                <h2 className="mb-5 text-base font-semibold text-foreground">Breakdown of your points</h2>
                <PointsBreakdownChart
                  breakdown={breakdown}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>

            <HowYouEarnPoints />
          </div>

          {/* Positions that generate points */}
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">
              Your positions that generate points
            </h2>
            <Card>
              <CardContent className="p-5">
                <PositionsTable positions={positions} isLoading={isLoading} onViewHistory={() => setActiveTab('history')} />
              </CardContent>
            </Card>
          </div>

          {/* Partner points */}
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">
              Points from Partners
            </h2>
            <PartnerPointsSection partners={partnerPoints} isLoading={isLoading} />
          </div>

          {/* Achievements */}
          {(isLoading || achievements.length > 0) && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                <Trophy className="h-4 w-4 text-muted-foreground" aria-hidden />
                Achievements
              </h2>
              <Card>
                <CardContent className="p-5">
                  <AchievementsSection achievements={achievements} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer note */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>Points are updated every 10 minutes.</p>
                <p>Partner points are subject to the distribution rules of each partner.</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors whitespace-nowrap">
              Learn more about points
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* Tab: Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Megaphone className="h-4 w-4 text-muted-foreground" aria-hidden />
              Active Campaigns
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setShowAllCampaigns((v) => !v)}
            >
              {showAllCampaigns ? 'Show Active Only' : 'Browse All'}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="h-44 rounded-xl border border-border/60 bg-card animate-pulse" />
              ))}
            </div>
          ) : visibleCampaigns.length === 0 ? (
            <EmptyState context="campaigns" />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {visibleCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onJoin={handleJoin}
                  isJoining={joiningId === campaign.id}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <History className="h-4 w-4 text-muted-foreground" aria-hidden />
              Reward History
            </h2>
            {!isLoading && history.length > 0 && (
              <span className="text-xs text-muted-foreground">{history.length} events</span>
            )}
          </div>
          <Card>
            <CardContent className="p-5">
              {history.length === 0 && !isLoading ? (
                <EmptyState
                  context="rewards"
                  title="Your reward history will appear here once you start earning."
                  description=""
                />
              ) : (
                <RewardHistory items={history} isLoading={isLoading} />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
