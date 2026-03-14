'use client'

import { type AttributionScore } from '@/lib/attribution'
import { getScoreTier } from '@/lib/utils'
import { Skeleton } from '@/components/shared/SkeletonLoader'

const DIMENSIONS = [
  { key: 'lpBehavior', label: 'LP Behavior' },
  { key: 'defiCompetence', label: 'DeFi Competence' },
  { key: 'walletLongevity', label: 'Wallet Longevity' },
  { key: 'networkReferral', label: 'Network & Referral' },
  { key: 'mintwareNative', label: 'Mintware Native' },
] as const

const TIERS = [
  { range: '0–50', label: 'Newcomer', boost: 'Base rate' },
  { range: '51–70', label: 'Member', boost: '+8% boost' },
  { range: '71–80', label: 'Active', boost: '+13% boost' },
  { range: '81–90', label: 'Builder', boost: '+18% boost' },
  { range: '91–100', label: 'Elite', boost: '+25% boost' },
]

export default function ScorePanel({
  score,
  loading,
}: {
  score: AttributionScore | null
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="flex gap-6 mb-6">
          <Skeleton className="w-24 h-24 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
      </div>
    )
  }

  if (!score) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)] text-center">
        <div className="text-[var(--ink-3)] text-sm py-8">No Attribution score yet</div>
      </div>
    )
  }

  const tier = getScoreTier(score.score)

  return (
    <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[var(--ink)]">Attribution Score</h3>
        <a
          href="https://attribution-scorer.ceo-1f9.workers.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--blue)] hover:underline"
        >
          Powered by Attribution ↗
        </a>
      </div>

      {/* Score display */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border-strong)] flex flex-col items-center justify-center">
          <div
            className="text-3xl font-bold text-[var(--ink)]"
            style={{ fontFamily: 'DM Mono, monospace', color: tier.color }}
          >
            {score.score}
          </div>
          <div className="text-xs text-[var(--ink-3)] mt-0.5">/ 100</div>
        </div>
        <div>
          <div className="font-bold text-lg text-[var(--ink)]">{score.tier ?? tier.label}</div>
          <div className="text-sm text-[var(--ink-2)] mt-0.5">{tier.boost} on all rewards</div>
          {score.topPct !== undefined && (
            <div className="text-xs text-[var(--ink-3)] mt-1">
              Top {score.topPct}% of wallets
            </div>
          )}
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-3 mb-6">
        {DIMENSIONS.map(dim => {
          const value = score.dimensions?.[dim.key] ?? 0
          return (
            <div key={dim.key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--ink-2)]">{dim.label}</span>
                <span
                  className="text-sm font-medium text-[var(--ink)]"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {value}
                </span>
              </div>
              <div className="h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${value}%`, backgroundColor: tier.color }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Tier table */}
      <div className="border-t border-[var(--border)] pt-4">
        <div className="text-xs font-medium text-[var(--ink-3)] mb-3 uppercase tracking-wide">
          Score Tiers
        </div>
        <div className="space-y-1">
          {TIERS.map(t => {
            const isActive = t.label === (score.tier ?? tier.label)
            return (
              <div
                key={t.range}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
                  isActive
                    ? 'bg-blue-50 border border-blue-100'
                    : ''
                }`}
              >
                <span className={isActive ? 'font-semibold text-[var(--blue)]' : 'text-[var(--ink-3)]'}>
                  {t.range}
                </span>
                <span className={isActive ? 'font-semibold text-[var(--blue)]' : 'text-[var(--ink-2)]'}>
                  {t.label}
                </span>
                <span className={isActive ? 'font-semibold text-[var(--blue)]' : 'text-[var(--ink-3)]'}>
                  {t.boost}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
