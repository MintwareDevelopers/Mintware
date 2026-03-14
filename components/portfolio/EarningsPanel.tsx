'use client'

import { formatDollar } from '@/lib/utils'
import { Skeleton } from '@/components/shared/SkeletonLoader'

interface Earnings {
  totalEarnings: number
  thisMonth: number
  vaultFees: number
  referralRewards: number
  rewardPools: number
  scoreWeight: number
}

export default function EarningsPanel({
  earnings,
  loading,
}: {
  earnings: Earnings | null
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
      <h3 className="font-bold text-[var(--ink)] mb-6">Earnings</h3>

      {/* Total */}
      <div className="bg-[var(--surface)] rounded-xl p-4 mb-4">
        <div className="text-xs text-[var(--ink-3)] mb-1">Total Earned</div>
        <div
          className="text-2xl font-bold text-[var(--ink)]"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          {earnings ? formatDollar(earnings.totalEarnings) : '$0.00'}
        </div>
        {earnings && (
          <div className="text-xs text-[var(--ink-3)] mt-1">
            {formatDollar(earnings.thisMonth)} this month
          </div>
        )}
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {[
          { label: 'Vault Fees', value: earnings?.vaultFees ?? 0, icon: '💰' },
          { label: 'Referral Rewards', value: earnings?.referralRewards ?? 0, icon: '🔗' },
          { label: 'Reward Pools', value: earnings?.rewardPools ?? 0, icon: '🏊' },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span className="text-sm text-[var(--ink-2)]">{item.label}</span>
            </div>
            <span
              className="text-sm font-medium text-[var(--ink)]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {formatDollar(item.value)}
            </span>
          </div>
        ))}
      </div>

      {earnings && earnings.totalEarnings === 0 && (
        <div className="mt-4 text-center text-sm text-[var(--ink-3)]">
          Deposit into a vault to start earning
        </div>
      )}
    </div>
  )
}
