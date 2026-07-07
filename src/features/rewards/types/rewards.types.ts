export type CampaignStatus = 'active' | 'ended' | 'upcoming'
export type EnrollmentStatus = 'enrolled' | 'not_enrolled'
export type AchievementStatus = 'unlocked' | 'locked'

export type HistoryEventType =
  | 'points_earned_deposit'
  | 'points_earned_campaign'
  | 'campaign_joined'
  | 'campaign_completed'
  | 'achievement_unlocked'

export interface RewardsSummary {
  totalPoints: number
  pointsValueUsd: number
  claimablePts: number
  harmonixPoints: number
  harmonixPoints24h: number
  partnerPointsTotal: number
  partnerPoints24h: number
  partnerTokens: string[]
}

export interface PointsBreakdownItem {
  name: string
  points: number
  percent: number
  color: string
}

export interface PointsBreakdown {
  allTime: PointsBreakdownItem[]
  thisMonth: PointsBreakdownItem[]
  lastMonth: PointsBreakdownItem[]
  thisWeek: PointsBreakdownItem[]
  last7Days: PointsBreakdownItem[]
  last30Days: PointsBreakdownItem[]
}

export interface PartnerCampaignEntry {
  id: string
  campaignName: string
  vaultName: string
  pointsDistributed: number
  date: string
  status: 'completed' | 'active' | 'upcoming'
}

export interface PartnerPoints {
  id: string
  name: string
  points: number
  valueUsd: number
  weeklyChangePercent: number
  fromVaultsCount: number
  fromVaultNames: string[]
  logoColor: string
  vaultTokens: string[]
  status: 'active' | 'inactive'
  lastUpdatedAt: string
  campaignHistory: PartnerCampaignEntry[]
}

export interface PointsPosition {
  id: string
  productName: string
  productType: 'Harmonix Vault' | 'Pendle Farm'
  depositType: 'Deposit'
  asset: string
  balance: number
  balanceFormatted: string
  balanceUsd: number
  pointsAllTime: number
  pointsSource: string
  vaultSharePercent: number
  distributedToken: string
  distributedAmount: number
  distributedAmountFormatted: string
  lastUpdatedAt: string
  vaultId: string
  positionStatus: 'active' | 'inactive'
}

export interface PendingLocked {
  pendingPoints: number
  pendingLabel: string
  lockedPoints: number
  lockedLabel: string
  totalClaimable: number
  claimableUsd: number
}

export interface Campaign {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  multiplier: string
  eligibilityRequirement: string
  status: CampaignStatus
  enrollmentStatus: EnrollmentStatus
  progressPercent?: number
  progressLabel?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  status: AchievementStatus
  unlockedAt?: string
  iconKey: 'first_deposit' | 'first_withdrawal' | 'six_month' | 'tvl_10k' | 'tvl_50k' | 'tvl_100k' | 'campaign'
}

export type HistoryStatus = 'claimable' | 'claimed' | 'pending'

export interface RewardHistoryItem {
  id: string
  eventType: HistoryEventType
  timestamp: string
  source: string
  activity: string
  points: number
  status: HistoryStatus
}

export interface RewardsData {
  summary: RewardsSummary
  breakdown: PointsBreakdown
  partnerPoints: PartnerPoints[]
  positions: PointsPosition[]
  pendingLocked: PendingLocked
  campaigns: Campaign[]
  achievements: Achievement[]
  history: RewardHistoryItem[]
}
