import type { RewardsData } from '../types/rewards.types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MOCK_DATA: RewardsData = {
  summary: {
    totalPoints: 45_680,
    pointsValueUsd: 182.72,
    claimablePts: 12_340,
    harmonixPoints: 25_240,
    harmonixPoints24h: 1_230,
    partnerPointsTotal: 20_440,
    partnerPoints24h: 980,
    partnerTokens: ['Valantis', 'Kinetiq', 'Hyperlend', 'Pendle', 'AAVE', 'Curve'],
  },
  breakdown: {
    allTime: [
      { name: 'Harmonix Points', points: 72_450, percent: 50.8, color: '#111827' },
      { name: 'Valantis Points', points: 34_120, percent: 23.9, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 18_760, percent: 13.2, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 11_350, percent: 8.0,  color: '#a7f3d0' },
      { name: 'Others',          points: 6_000,  percent: 4.1,  color: '#d1fae5' },
    ],
    thisMonth: [
      { name: 'Harmonix Points', points: 8_200,  percent: 46.0, color: '#111827' },
      { name: 'Valantis Points', points: 4_320,  percent: 24.2, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 2_980,  percent: 16.7, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 1_450,  percent: 8.1,  color: '#a7f3d0' },
      { name: 'Others',          points: 900,    percent: 5.0,  color: '#d1fae5' },
    ],
    lastMonth: [
      { name: 'Harmonix Points', points: 7_100,  percent: 48.3, color: '#111827' },
      { name: 'Valantis Points', points: 3_640,  percent: 24.8, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 2_100,  percent: 14.3, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 1_200,  percent: 8.2,  color: '#a7f3d0' },
      { name: 'Others',          points: 660,    percent: 4.4,  color: '#d1fae5' },
    ],
    thisWeek: [
      { name: 'Harmonix Points', points: 1_230,  percent: 44.9, color: '#111827' },
      { name: 'Valantis Points', points: 780,    percent: 28.5, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 420,    percent: 15.3, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 210,    percent: 7.7,  color: '#a7f3d0' },
      { name: 'Others',          points: 100,    percent: 3.6,  color: '#d1fae5' },
    ],
    last7Days: [
      { name: 'Harmonix Points', points: 1_580,  percent: 46.2, color: '#111827' },
      { name: 'Valantis Points', points: 890,    percent: 26.0, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 540,    percent: 15.8, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 280,    percent: 8.2,  color: '#a7f3d0' },
      { name: 'Others',          points: 130,    percent: 3.8,  color: '#d1fae5' },
    ],
    last30Days: [
      { name: 'Harmonix Points', points: 9_800,  percent: 47.1, color: '#111827' },
      { name: 'Valantis Points', points: 5_100,  percent: 24.5, color: '#10b981' },
      { name: 'Kinetiq Points',  points: 3_400,  percent: 16.3, color: '#6ee7b7' },
      { name: 'Hyperlend Points',points: 1_700,  percent: 8.2,  color: '#a7f3d0' },
      { name: 'Others',          points: 800,    percent: 3.9,  color: '#d1fae5' },
    ],
  },
  partnerPoints: [
    {
      id: 'valantis', name: 'Valantis', points: 34_120, valueUsd: 99.21, weeklyChangePercent: 8.21,
      fromVaultsCount: 2, fromVaultNames: ['haUSDC Core', 'haHYPE'], logoColor: '#10b981',
      vaultTokens: ['USDC', 'HYPE'], status: 'active', lastUpdatedAt: '5 mins ago',
      campaignHistory: [
        { id: 'vc1', campaignName: 'Liquidity Boost June', vaultName: 'haUSDC Core', pointsDistributed: 8_400, date: 'Jun 25, 2026', status: 'active' },
        { id: 'vc2', campaignName: 'Liquidity Boost June', vaultName: 'haHYPE',      pointsDistributed: 6_200, date: 'Jun 25, 2026', status: 'active' },
        { id: 'vc3', campaignName: 'May Yield Campaign',   vaultName: 'haUSDC Core', pointsDistributed: 7_100, date: 'May 31, 2026', status: 'completed' },
        { id: 'vc4', campaignName: 'May Yield Campaign',   vaultName: 'haHYPE',      pointsDistributed: 5_300, date: 'May 31, 2026', status: 'completed' },
        { id: 'vc5', campaignName: 'Early Adopter Q1',     vaultName: 'haUSDC Core', pointsDistributed: 4_900, date: 'Mar 31, 2026', status: 'completed' },
        { id: 'vc6', campaignName: 'July Multiplier',      vaultName: 'haUSDC Core', pointsDistributed: 0,     date: 'Jul 1, 2026',  status: 'upcoming' },
      ],
    },
    {
      id: 'kinetiq', name: 'Kinetiq', points: 18_760, valueUsd: 62.14, weeklyChangePercent: 5.44,
      fromVaultsCount: 3, fromVaultNames: ['haUSDT Core', 'haUSDC Core', 'haHYPE on Pendle'], logoColor: '#6ee7b7',
      vaultTokens: ['USDC', 'HYPE'], status: 'active', lastUpdatedAt: '10 mins ago',
      campaignHistory: [
        { id: 'kc1', campaignName: 'Stablecoin Sprint June', vaultName: 'haUSDT Core',       pointsDistributed: 5_200, date: 'Jun 25, 2026', status: 'active' },
        { id: 'kc2', campaignName: 'Stablecoin Sprint June', vaultName: 'haUSDC Core',        pointsDistributed: 4_800, date: 'Jun 25, 2026', status: 'active' },
        { id: 'kc3', campaignName: 'Stablecoin Sprint June', vaultName: 'haHYPE on Pendle',   pointsDistributed: 3_100, date: 'Jun 25, 2026', status: 'active' },
        { id: 'kc4', campaignName: 'May Stable Campaign',    vaultName: 'haUSDT Core',        pointsDistributed: 3_400, date: 'May 31, 2026', status: 'completed' },
        { id: 'kc5', campaignName: 'Pendle DeFi Bonus',      vaultName: 'haHYPE on Pendle',   pointsDistributed: 2_260, date: 'Apr 30, 2026', status: 'completed' },
      ],
    },
    {
      id: 'hyperlend', name: 'Hyperlend', points: 11_350, valueUsd: 41.32, weeklyChangePercent: 3.21,
      fromVaultsCount: 1, fromVaultNames: ['haUSDC Core'], logoColor: '#a7f3d0',
      vaultTokens: ['USDC'], status: 'active', lastUpdatedAt: '10 mins ago',
      campaignHistory: [
        { id: 'hc1', campaignName: 'Lending Rewards June', vaultName: 'haUSDC Core', pointsDistributed: 3_850, date: 'Jun 25, 2026', status: 'active' },
        { id: 'hc2', campaignName: 'Lending Rewards May',  vaultName: 'haUSDC Core', pointsDistributed: 4_100, date: 'May 31, 2026', status: 'completed' },
        { id: 'hc3', campaignName: 'Launch Bonus Q1',      vaultName: 'haUSDC Core', pointsDistributed: 3_400, date: 'Mar 31, 2026', status: 'completed' },
      ],
    },
    {
      id: 'pendle', name: 'Pendle', points: 6_200, valueUsd: 28.10, weeklyChangePercent: 1.80,
      fromVaultsCount: 1, fromVaultNames: ['haHYPE on Pendle'], logoColor: '#34d399',
      vaultTokens: ['haHYPE'], status: 'active', lastUpdatedAt: '15 mins ago',
      campaignHistory: [
        { id: 'pc1', campaignName: 'Pendle LP Boost June', vaultName: 'haHYPE on Pendle', pointsDistributed: 2_100, date: 'Jun 25, 2026', status: 'active' },
        { id: 'pc2', campaignName: 'Pendle LP Boost May',  vaultName: 'haHYPE on Pendle', pointsDistributed: 2_400, date: 'May 31, 2026', status: 'completed' },
        { id: 'pc3', campaignName: 'DeFi Integration Q1',  vaultName: 'haHYPE on Pendle', pointsDistributed: 1_700, date: 'Mar 31, 2026', status: 'completed' },
      ],
    },
    {
      id: 'aave', name: 'AAVE', points: 2_100, valueUsd: 9.45, weeklyChangePercent: 0,
      fromVaultsCount: 1, fromVaultNames: ['haUSDC Core'], logoColor: '#6ee7b7',
      vaultTokens: ['USDC'], status: 'inactive', lastUpdatedAt: '2 hours ago',
      campaignHistory: [
        { id: 'ac1', campaignName: 'AAVE Integration Bonus', vaultName: 'haUSDC Core', pointsDistributed: 1_200, date: 'Apr 30, 2026', status: 'completed' },
        { id: 'ac2', campaignName: 'AAVE Early Access',      vaultName: 'haUSDC Core', pointsDistributed: 900,   date: 'Mar 15, 2026', status: 'completed' },
      ],
    },
    {
      id: 'others', name: 'Other partners', points: 6_000, valueUsd: 34.78, weeklyChangePercent: 2.11,
      fromVaultsCount: 4, fromVaultNames: ['haUSDC Core', 'haUSDT Core', 'haHYPE', 'haHYPE on Pendle'], logoColor: '#d1fae5',
      vaultTokens: ['USDC', 'USDT', 'HYPE'], status: 'inactive', lastUpdatedAt: '1 hour ago',
      campaignHistory: [
        { id: 'oc1', campaignName: 'Multi-Partner May',  vaultName: 'haUSDC Core',      pointsDistributed: 1_400, date: 'May 31, 2026', status: 'completed' },
        { id: 'oc2', campaignName: 'Multi-Partner May',  vaultName: 'haUSDT Core',       pointsDistributed: 1_200, date: 'May 31, 2026', status: 'completed' },
        { id: 'oc3', campaignName: 'Multi-Partner May',  vaultName: 'haHYPE',            pointsDistributed: 980,   date: 'May 31, 2026', status: 'completed' },
        { id: 'oc4', campaignName: 'Multi-Partner May',  vaultName: 'haHYPE on Pendle',  pointsDistributed: 820,   date: 'May 31, 2026', status: 'completed' },
        { id: 'oc5', campaignName: 'Others Q1',          vaultName: 'haUSDC Core',        pointsDistributed: 900,   date: 'Mar 31, 2026', status: 'completed' },
        { id: 'oc6', campaignName: 'Others Q1',          vaultName: 'haUSDT Core',        pointsDistributed: 700,   date: 'Mar 31, 2026', status: 'completed' },
      ],
    },
  ],
  positions: [
    {
      id: 'pos1', productName: 'haUSDC Core',       productType: 'Harmonix Vault', depositType: 'Deposit',
      asset: 'USDC',   balance: 12_450.23, balanceFormatted: '12,450.23 USDC', balanceUsd: 12_450.23,
      pointsAllTime: 28_450, pointsSource: 'Harmonix',  vaultSharePercent: 4.32,
      distributedToken: 'HMX',    distributedAmount: 124.5,  distributedAmountFormatted: '124.50 HMX',
      lastUpdatedAt: '10 mins ago', vaultId: 'delta-neutral-usdc', positionStatus: 'active',
    },
    {
      id: 'pos2', productName: 'haUSDT Core',       productType: 'Harmonix Vault', depositType: 'Deposit',
      asset: 'USDT',   balance: 8_000,    balanceFormatted: '8,000.00 USDT',  balanceUsd: 8_000,
      pointsAllTime: 18_760, pointsSource: 'Kinetiq',   vaultSharePercent: 2.87,
      distributedToken: 'HMX',    distributedAmount: 86,     distributedAmountFormatted: '86.00 HMX',
      lastUpdatedAt: '10 mins ago', vaultId: 'eth-yield-max', positionStatus: 'active',
    },
    {
      id: 'pos3', productName: 'haHYPE',             productType: 'Harmonix Vault', depositType: 'Deposit',
      asset: 'HYPE',   balance: 320.45,   balanceFormatted: '320.45 HYPE',    balanceUsd: 5_790.12,
      pointsAllTime: 11_350, pointsSource: 'Hyperlend', vaultSharePercent: 1.54,
      distributedToken: 'HYPE',   distributedAmount: 3.2,    distributedAmountFormatted: '3.20 HYPE',
      lastUpdatedAt: '10 mins ago', vaultId: 'hype-vault', positionStatus: 'active',
    },
    {
      id: 'pos4', productName: 'haHYPE on Pendle',   productType: 'Pendle Farm',    depositType: 'Deposit',
      asset: 'haHYPE', balance: 250,      balanceFormatted: '250.00 haHYPE',  balanceUsd: 4_520.12,
      pointsAllTime: 34_200, pointsSource: 'Valantis',  vaultSharePercent: 6.10,
      distributedToken: 'PENDLE', distributedAmount: 12.4,   distributedAmountFormatted: '12.40 PENDLE',
      lastUpdatedAt: '15 mins ago', vaultId: 'pendle-hype', positionStatus: 'active',
    },
    {
      id: 'pos5', productName: 'AAVE USDC Vault',    productType: 'Harmonix Vault', depositType: 'Deposit',
      asset: 'USDC',   balance: 5_200,    balanceFormatted: '5,200.00 USDC',  balanceUsd: 5_200,
      pointsAllTime: 6_340,  pointsSource: 'AAVE',      vaultSharePercent: 1.12,
      distributedToken: 'HMX',    distributedAmount: 44,     distributedAmountFormatted: '44.00 HMX',
      lastUpdatedAt: '2 hours ago', vaultId: 'aave-usdc', positionStatus: 'inactive',
    },
    {
      id: 'pos6', productName: 'Stable Yield V1',    productType: 'Harmonix Vault', depositType: 'Deposit',
      asset: 'USDT',   balance: 3_000,    balanceFormatted: '3,000.00 USDT',  balanceUsd: 3_000,
      pointsAllTime: 4_120,  pointsSource: 'Harmonix',  vaultSharePercent: 0.88,
      distributedToken: 'HMX',    distributedAmount: 28,     distributedAmountFormatted: '28.00 HMX',
      lastUpdatedAt: '1 day ago',   vaultId: 'stable-v1', positionStatus: 'inactive',
    },
  ],
  pendingLocked: {
    pendingPoints: 5_620,
    pendingLabel: 'Will be available in 2-5 days',
    lockedPoints: 12_340,
    lockedLabel: 'Unlocks in campaigns',
    totalClaimable: 3_250,
    claimableUsd: 5.37,
  },
  campaigns: [
    {
      id: 'c1',
      name: 'Early Adopter Bonus',
      description: 'Earn 2× points on all deposits made during the launch period.',
      startDate: 'Jun 1, 2026',
      endDate: 'Jul 1, 2026',
      multiplier: '2× Points',
      eligibilityRequirement: 'Deposit into any vault',
      status: 'active',
      enrollmentStatus: 'enrolled',
      progressPercent: 62,
      progressLabel: '620 / 1,000 pts',
    },
    {
      id: 'c2',
      name: 'Delta Neutral Boost',
      description: 'Deposit 1,000+ USDC into Delta Neutral USDC to earn bonus points.',
      startDate: 'Jun 15, 2026',
      endDate: 'Jul 15, 2026',
      multiplier: '1.5× Points',
      eligibilityRequirement: 'Deposit 1,000+ USDC into Delta Neutral USDC',
      status: 'active',
      enrollmentStatus: 'not_enrolled',
    },
    {
      id: 'c3',
      name: 'Beta Launch Campaign',
      description: 'Rewarded early testers who joined during the beta period.',
      startDate: 'Apr 1, 2026',
      endDate: 'May 31, 2026',
      multiplier: '3× Points',
      eligibilityRequirement: 'Active during beta',
      status: 'ended',
      enrollmentStatus: 'enrolled',
      progressPercent: 100,
      progressLabel: 'Completed',
    },
  ],
  achievements: [
    { id: 'a1', title: 'First Deposit',       description: 'Made your first vault deposit.',                    status: 'unlocked', unlockedAt: 'Apr 12, 2026', iconKey: 'first_deposit' },
    { id: 'a2', title: 'Campaign Participant', description: 'Joined your first rewards campaign.',               status: 'unlocked', unlockedAt: 'Apr 12, 2026', iconKey: 'campaign' },
    { id: 'a3', title: '$10K Investor',        description: 'Reached $10,000 total value across all vaults.',   status: 'unlocked', unlockedAt: 'May 3, 2026',  iconKey: 'tvl_10k' },
    { id: 'a4', title: 'First Withdrawal',     description: 'Completed your first vault withdrawal.',            status: 'locked',   iconKey: 'first_withdrawal' },
    { id: 'a5', title: '6-Month Investor',     description: 'Held a position continuously for 6 months.',      status: 'locked',   iconKey: 'six_month' },
    { id: 'a6', title: '$50K Investor',        description: 'Reached $50,000 total value across all vaults.',  status: 'locked',   iconKey: 'tvl_50k' },
  ],
  history: [
    { id: 'h1',  eventType: 'points_earned_deposit',  timestamp: 'Jun 25, 2026 16:10', source: 'Harmonix', activity: 'Deposit 5,000 USDC to haUSDC Core',           points: 120, status: 'claimable' },
    { id: 'h2',  eventType: 'points_earned_campaign',  timestamp: 'Jun 25, 2026 15:42', source: 'Valantis', activity: 'Strategy yield from haUSDC',                   points: 42,  status: 'claimable' },
    { id: 'h3',  eventType: 'points_earned_deposit',  timestamp: 'Jun 25, 2026 14:22', source: 'Pendle',   activity: 'Provide liquidity with haHYPE on Pendle',      points: 78,  status: 'claimable' },
    { id: 'h4',  eventType: 'points_earned_deposit',  timestamp: 'Jun 25, 2026 11:08', source: 'Kinetiq',  activity: 'Strategy yield from haHYPE',                    points: 36,  status: 'claimable' },
    { id: 'h5',  eventType: 'points_earned_campaign',  timestamp: 'Jun 24, 2026 21:36', source: 'Harmonix', activity: 'Referral reward',                              points: 200, status: 'claimed'   },
    { id: 'h6',  eventType: 'points_earned_deposit',  timestamp: 'Jun 24, 2026 18:55', source: 'Hyperlend',activity: 'Lending yield from haUSDC Core',               points: 54,  status: 'claimed'   },
    { id: 'h7',  eventType: 'campaign_completed',     timestamp: 'Jun 23, 2026 09:12', source: 'Harmonix', activity: 'Campaign completed — Early Adopter Bonus',     points: 500, status: 'claimed'   },
    { id: 'h8',  eventType: 'achievement_unlocked',   timestamp: 'Jun 22, 2026 14:30', source: 'Harmonix', activity: 'Achievement unlocked — $10K Investor',         points: 200, status: 'claimed'   },
    { id: 'h9',  eventType: 'points_earned_deposit',  timestamp: 'Jun 21, 2026 10:00', source: 'Valantis', activity: 'Strategy yield from haHYPE',                   points: 38,  status: 'claimed'   },
    { id: 'h10', eventType: 'campaign_joined',        timestamp: 'Jun 20, 2026 08:44', source: 'Harmonix', activity: 'Joined campaign — Delta Neutral Boost',        points: 50,  status: 'claimed'   },
  ],
}

export const rewardsApi = {
  async getRewards(): Promise<RewardsData> {
    await delay(800)
    return MOCK_DATA
  },
  async joinCampaign(campaignId: string): Promise<void> {
    await delay(600)
    console.log('Joined campaign', campaignId)
  },
}
