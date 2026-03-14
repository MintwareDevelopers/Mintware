'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useReferralEarnings, useReferredWallets, useRewardPools } from '@/hooks/useReferrals'
import { formatDollar, formatAddress } from '@/lib/utils'
import StatusPill from '@/components/shared/StatusPill'
import { Skeleton } from '@/components/shared/SkeletonLoader'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 rounded-lg bg-[var(--blue)] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}

function ReferralsContent() {
  const searchParams = useSearchParams()
  const { address: connectedAddress } = useAccount()
  const viewingWallet = searchParams.get('wallet')
  const targetAddress = viewingWallet ?? connectedAddress
  const isReadOnly = Boolean(viewingWallet)

  const { earnings, loading: earningsLoading } = useReferralEarnings(targetAddress)
  const { wallets, loading: walletsLoading } = useReferredWallets(targetAddress)
  const { pools, loading: poolsLoading } = useRewardPools()

  const referralSlug = targetAddress
    ? `mintware.xyz/ref/${formatAddress(targetAddress)}`
    : 'mintware.xyz/ref/…'

  const referralUrl = targetAddress
    ? `https://mintware.xyz/ref/${targetAddress}`
    : ''

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Referrals</h1>
        <p className="text-[var(--ink-2)]">
          Refer wallets and earn from their activity. Your Attribution score boosts every reward.
        </p>
      </div>

      {/* Snapshot stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {earningsLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))
        ) : (
          [
            { label: 'Total Earned', value: formatDollar(earnings?.totalEarnings ?? 0) },
            { label: 'This Month', value: formatDollar(earnings?.thisMonth ?? 0) },
            { label: 'Wallets Referred', value: String(earnings?.walletsReferred ?? 0) },
            { label: 'Network Size', value: String(earnings?.networkSize ?? 0) },
            { label: 'Avg Referred Score', value: String(earnings?.avgReferredScore ?? 0) },
            { label: 'Active Pools', value: String(earnings?.activePools ?? 0) },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-[var(--border)]">
              <div className="text-xs text-[var(--ink-3)] mb-1">{stat.label}</div>
              <div
                className="text-lg font-bold text-[var(--ink)]"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {stat.value}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Referral link */}
      {!isReadOnly && targetAddress && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
          <h2 className="font-bold text-[var(--ink)] mb-4">Your Referral Link</h2>
          <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
            <span
              className="flex-1 text-sm text-[var(--ink-2)] truncate"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {referralSlug}
            </span>
            <CopyButton text={referralUrl} />
          </div>
          <p className="text-xs text-[var(--ink-3)] mt-3">
            When someone deposits through your link, you earn a percentage of their vault fees weighted by your Attribution score.
          </p>
        </div>
      )}

      {/* Reward pools */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
        <h2 className="font-bold text-[var(--ink)] mb-2">Active Reward Pools</h2>
        <p className="text-sm text-[var(--ink-2)] mb-6">
          Teams create reward pools to incentivize referrals. Earn extra when you refer buyers.
        </p>

        {poolsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
        ) : pools.length === 0 ? (
          <div className="text-center py-8 text-[var(--ink-3)] text-sm">
            No active reward pools yet
          </div>
        ) : (
          <div className="space-y-4">
            {pools.map(pool => (
              <div
                key={pool.id}
                className="border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xl">
                      {pool.tokenIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--ink)]">{pool.tokenName}</span>
                        <StatusPill status={pool.status} />
                      </div>
                      <div className="text-xs text-[var(--ink-3)]">
                        {pool.chain} · {pool.daysRemaining}d remaining
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-lg font-bold text-[var(--ink)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {formatDollar(pool.poolSize, 0)}
                    </div>
                    <div className="text-xs text-[var(--ink-3)]">pool size</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[var(--surface)] rounded-lg p-3">
                    <div className="text-xs text-[var(--ink-3)] mb-1">Referrer %</div>
                    <div
                      className="text-sm font-bold text-[var(--blue)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {pool.referrerPct}%
                    </div>
                  </div>
                  <div className="bg-[var(--surface)] rounded-lg p-3">
                    <div className="text-xs text-[var(--ink-3)] mb-1">Buyer %</div>
                    <div
                      className="text-sm font-bold text-[var(--ink)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {pool.buyerPct}%
                    </div>
                  </div>
                  <div className="bg-[var(--surface)] rounded-lg p-3">
                    <div className="text-xs text-[var(--ink-3)] mb-1">Score bonus</div>
                    <div
                      className="text-sm font-bold text-[var(--green)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      +{pool.scoreBonusPct}% at {pool.scoreBonusThreshold}+
                    </div>
                  </div>
                  <div className="bg-[var(--surface)] rounded-lg p-3">
                    <div className="text-xs text-[var(--ink-3)] mb-1">Referred</div>
                    <div
                      className="text-sm font-bold text-[var(--ink)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {pool.totalReferred}
                    </div>
                  </div>
                </div>

                {!isReadOnly && (
                  <div className="mt-4">
                    <CopyButton
                      text={`https://mintware.xyz/ref/${targetAddress}?pool=${pool.id}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Referred wallets */}
      {targetAddress && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
          <h2 className="font-bold text-[var(--ink)] mb-4">Referred Wallets</h2>

          {walletsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : wallets.length === 0 ? (
            <div className="text-center py-8 text-[var(--ink-3)] text-sm">
              No referred wallets yet. Share your link to start earning.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Wallet</th>
                    <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Score</th>
                    <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">You earned</th>
                    <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map(w => (
                    <tr key={w.address} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-3 pr-4 text-sm text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {w.name ?? formatAddress(w.address)}
                      </td>
                      <td className="py-3 pr-4 text-right text-sm text-[var(--blue)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {w.score}
                      </td>
                      <td className="py-3 pr-4 text-right text-sm text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {formatDollar(w.earnedReferrer)}
                      </td>
                      <td className="py-3 text-right">
                        <StatusPill status={w.active ? 'active' : 'inactive'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ReferralsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ReferralsContent />
    </Suspense>
  )
}
