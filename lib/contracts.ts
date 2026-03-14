// Smart contract stubs — replace functions here when contracts are deployed.
// Each stub logs its call and returns realistic mock data.
// Contract addresses come from environment variables.

export interface VaultPosition {
  vaultId: string
  tokenSymbol: string
  tokenIcon: string
  depositedUsdc: number
  earnedUsdc: number
  apr: number
  scoreBoost: number
  chain: string
  status: 'active' | 'inactive'
}

export interface Vault {
  id: string
  tokenSymbol: string
  tokenIcon: string
  tokenName: string
  chain: string
  tvl: number
  apr: number
  mevShare: number
  lpCount: number
  teamSeed: string
  status: 'active' | 'hot' | 'new'
  minScore: number
}

export interface LeaderboardEntry {
  rank: number
  address: string
  name: string
  handle: string
  score: number
  earnings: number
  referrals: number
  weeklyChange: number
}

export interface ReferralEarnings {
  totalEarnings: number
  thisMonth: number
  walletsReferred: number
  networkSize: number
  avgReferredScore: number
  activePools: number
}

export interface RewardPool {
  id: string
  tokenSymbol: string
  tokenName: string
  tokenIcon: string
  chain: string
  poolSize: number
  referrerPct: number
  buyerPct: number
  scoreBonusPct: number
  scoreBonusThreshold: number
  daysRemaining: number
  totalReferred: number
  status: 'active' | 'hot' | 'new'
}

export type TransactionHash = `0x${string}`

// ── SCORE ────────────────────────────────────────────────────────────────────
export async function getScore(address: string): Promise<{
  score: number
  tier: string
  dimensions: {
    lpBehavior: number
    defiCompetence: number
    walletLongevity: number
    networkReferral: number
    mintwareNative: number
  }
  topPct: number
}> {
  console.log('[STUB] getScore', address)
  // TODO: replace with on-chain registry call
  // Contract: AttributionRegistry.getScore(address)
  return {
    score: 82,
    tier: 'Builder',
    dimensions: {
      lpBehavior: 91,
      defiCompetence: 85,
      walletLongevity: 78,
      networkReferral: 64,
      mintwareNative: 72,
    },
    topPct: 5,
  }
}

// ── WALLET NAME ───────────────────────────────────────────────────────────────
export async function getWalletName(address: string): Promise<string | null> {
  console.log('[STUB] getWalletName', address)
  // TODO: replace with MintwareNameRegistry.getName(address)
  return null
}

// ── EARNINGS ──────────────────────────────────────────────────────────────────
export async function getEarnings(address: string): Promise<{
  totalEarnings: number
  thisMonth: number
  vaultFees: number
  referralRewards: number
  rewardPools: number
  scoreWeight: number
}> {
  console.log('[STUB] getEarnings', address)
  // TODO: replace with EarningsRegistry.getEarnings(address)
  return {
    totalEarnings: 0,
    thisMonth: 0,
    vaultFees: 0,
    referralRewards: 0,
    rewardPools: 0,
    scoreWeight: 0,
  }
}

// ── VAULTS ────────────────────────────────────────────────────────────────────
export async function getVaults(): Promise<Vault[]> {
  console.log('[STUB] getVaults')
  // TODO: replace with VaultRegistry.getActiveVaults()
  return [
    {
      id: 'vault-brett-base',
      tokenSymbol: 'BRETT',
      tokenIcon: '🐸',
      tokenName: 'Brett',
      chain: 'base',
      tvl: 284000,
      apr: 24.8,
      mevShare: 12.4,
      lpCount: 847,
      teamSeed: '50,000 BRETT',
      status: 'hot',
      minScore: 0,
    },
    {
      id: 'vault-degen-base',
      tokenSymbol: 'DEGEN',
      tokenIcon: '🎩',
      tokenName: 'Degen',
      chain: 'base',
      tvl: 142000,
      apr: 18.2,
      mevShare: 8.1,
      lpCount: 423,
      teamSeed: '200,000 DEGEN',
      status: 'active',
      minScore: 50,
    },
    {
      id: 'vault-higher-base',
      tokenSymbol: 'HIGHER',
      tokenIcon: '↑',
      tokenName: 'Higher',
      chain: 'base',
      tvl: 67000,
      apr: 31.5,
      mevShare: 15.2,
      lpCount: 189,
      teamSeed: '500,000 HIGHER',
      status: 'new',
      minScore: 0,
    },
  ]
}

export async function getUserVaultPositions(address: string): Promise<VaultPosition[]> {
  console.log('[STUB] getUserVaultPositions', address)
  // TODO: replace with VaultRegistry.getUserPositions(address)
  return []
}

export async function getVaultTVL(vaultId: string): Promise<number> {
  console.log('[STUB] getVaultTVL', vaultId)
  return 0
}

export async function getVaultAPR(vaultId: string): Promise<number> {
  console.log('[STUB] getVaultAPR', vaultId)
  return 0
}

export async function getVaultMEV(vaultId: string): Promise<number> {
  console.log('[STUB] getVaultMEV', vaultId)
  return 0
}

export async function deposit(
  vaultId: string,
  amount: bigint
): Promise<{ hash: string }> {
  console.log('[STUB] deposit', { vaultId, amount })
  // TODO: replace with MintwareVault.deposit(amount)
  // Contract needs: ERC20 approve first, then deposit
  throw new Error('Vault deposits not yet live — coming soon')
}

export async function withdraw(
  vaultId: string,
  amount: bigint
): Promise<{ hash: string }> {
  console.log('[STUB] withdraw', { vaultId, amount })
  // TODO: replace with MintwareVault.withdraw(amount)
  throw new Error('Vault withdrawals not yet live — coming soon')
}

// ── LEADERBOARD ───────────────────────────────────────────────────────────────
export async function getLeaderboard(
  chain: string = 'all',
  tab: 'score' | 'earners' | 'referrers' | 'rising' = 'score',
  limit: number = 100
): Promise<LeaderboardEntry[]> {
  console.log('[STUB] getLeaderboard', { chain, tab, limit })
  // TODO: replace with AttributionRegistry.getLeaderboard(chain, tab, limit)
  return [
    { rank: 1, address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', name: 'vitalik.eth', handle: 'vitalik', score: 98, earnings: 12840, referrals: 247, weeklyChange: 2 },
    { rank: 2, address: '0x0000000000000000000000000000000000000001', name: 'alexbecker.eth', handle: 'alexbecker', score: 95, earnings: 8420, referrals: 189, weeklyChange: -1 },
    { rank: 3, address: '0x0000000000000000000000000000000000000002', name: 'cobie.eth', handle: 'cobie', score: 93, earnings: 7100, referrals: 156, weeklyChange: 4 },
    { rank: 4, address: '0x0000000000000000000000000000000000000003', name: 'punk6529.eth', handle: 'punk6529', score: 91, earnings: 6200, referrals: 134, weeklyChange: 0 },
    { rank: 5, address: '0x0000000000000000000000000000000000000004', name: 'sassal.eth', handle: 'sassal', score: 89, earnings: 5800, referrals: 98, weeklyChange: 3 },
    { rank: 6, address: '0x0000000000000000000000000000000000000005', name: 'lady.eth', handle: 'ladyaetherr', score: 87, earnings: 4200, referrals: 87, weeklyChange: 7 },
    { rank: 7, address: '0x0000000000000000000000000000000000000006', name: 'banker.eth', handle: 'degenbanker', score: 85, earnings: 3900, referrals: 72, weeklyChange: -2 },
    { rank: 8, address: '0x0000000000000000000000000000000000000007', name: 'alphahunter.eth', handle: 'alphahunter', score: 84, earnings: 3400, referrals: 65, weeklyChange: 12 },
    { rank: 9, address: '0x0000000000000000000000000000000000000008', name: 'yield.eth', handle: 'yieldfarmer', score: 83, earnings: 2900, referrals: 54, weeklyChange: 1 },
    { rank: 10, address: '0x0000000000000000000000000000000000000009', name: 'lfg.eth', handle: 'lfgwagmi', score: 82, earnings: 2600, referrals: 48, weeklyChange: 5 },
  ]
}

export async function getUserRank(address: string): Promise<{
  rank: number
  total: number
  topPct: number
  weeklyChange: number
}> {
  console.log('[STUB] getUserRank', address)
  // TODO: replace with AttributionRegistry.getUserRank(address)
  return { rank: 0, total: 0, topPct: 0, weeklyChange: 0 }
}

// ── REFERRALS ─────────────────────────────────────────────────────────────────
export async function getReferralEarnings(address: string): Promise<ReferralEarnings> {
  console.log('[STUB] getReferralEarnings', address)
  // TODO: replace with ReferralRegistry.getEarnings(address)
  return {
    totalEarnings: 0,
    thisMonth: 0,
    walletsReferred: 0,
    networkSize: 0,
    avgReferredScore: 0,
    activePools: 0,
  }
}

export async function getReferredWallets(address: string): Promise<{
  address: string
  name: string | null
  score: number
  earnedReferrer: number
  joinedDate: string
  active: boolean
}[]> {
  console.log('[STUB] getReferredWallets', address)
  // TODO: replace with ReferralRegistry.getReferredWallets(address)
  return []
}

export async function getRewardPools(
  filter?: 'active' | 'inactive'
): Promise<RewardPool[]> {
  console.log('[STUB] getRewardPools', filter)
  // TODO: replace with RewardPoolRegistry.getPools(filter)
  return [
    {
      id: 'pool-brett-1',
      tokenSymbol: 'BRETT',
      tokenName: 'Brett',
      tokenIcon: '🐸',
      chain: 'base',
      poolSize: 50000,
      referrerPct: 2.5,
      buyerPct: 1.0,
      scoreBonusPct: 1.5,
      scoreBonusThreshold: 70,
      daysRemaining: 18,
      totalReferred: 342,
      status: 'hot',
    },
    {
      id: 'pool-degen-1',
      tokenSymbol: 'DEGEN',
      tokenName: 'Degen',
      tokenIcon: '🎩',
      chain: 'base',
      poolSize: 120000,
      referrerPct: 1.5,
      buyerPct: 0.75,
      scoreBonusPct: 1.0,
      scoreBonusThreshold: 60,
      daysRemaining: 7,
      totalReferred: 189,
      status: 'active',
    },
  ]
}

// ── SWAP ──────────────────────────────────────────────────────────────────────
export async function executeSwap(
  tokenIn: string,
  tokenOut: string,
  amount: bigint,
  slippage: number = 0.5
): Promise<{ hash: string }> {
  console.log('[STUB] executeSwap', { tokenIn, tokenOut, amount, slippage })
  // TODO: wire to 0x API or 1inch for production
  // This swap contributes to Attribution score via on-chain hook
  throw new Error('Swap not yet wired')
}
