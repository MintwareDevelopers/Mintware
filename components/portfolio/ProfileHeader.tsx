'use client'

import { useEnsName, useEnsAvatar } from 'wagmi'
import { formatAddress, formatDollar, formatPct, walletEmoji } from '@/lib/utils'
import { Skeleton } from '@/components/shared/SkeletonLoader'
import type { WalletProfile } from '@/hooks/useWalletProfile'

export default function ProfileHeader({
  profile,
  loading,
  address,
}: {
  profile: WalletProfile | null
  loading: boolean
  address: string
}) {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined })

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    )
  }

  const displayName = ensName ?? profile?.mintwareName ?? formatAddress(address)
  const avatar = ensAvatar ?? null
  const emoji = walletEmoji(address)

  const portfolio = profile?.portfolio
  const change = portfolio?.changePct24h ?? 0
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border border-[var(--border)] flex items-center justify-center text-3xl overflow-hidden flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            emoji
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-[var(--ink)] truncate">{displayName}</h1>
            {profile?.mintwareName && (
              <span className="text-sm text-[var(--blue)] font-medium">
                {profile.mintwareName}.mintware
              </span>
            )}
          </div>
          <div
            className="text-sm text-[var(--ink-3)] mt-0.5"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            {formatAddress(address)}
          </div>
          {profile?.score && (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[var(--blue)] font-medium border border-blue-100">
                Score {profile.score.score} · {profile.score.tier}
              </span>
            </div>
          )}
        </div>

        {/* Portfolio value */}
        {portfolio && (
          <div className="text-right">
            <div
              className="text-2xl font-bold text-[var(--ink)]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {formatDollar(portfolio.totalValue)}
            </div>
            <div
              className={`text-sm font-medium mt-0.5 ${isPositive ? 'text-[var(--green)]' : 'text-red-500'}`}
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {isPositive ? '▲' : '▼'} {formatPct(Math.abs(change))} 24h
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: 'Portfolio',
            value: portfolio ? formatDollar(portfolio.totalValue) : '—',
          },
          {
            label: 'Attribution Score',
            value: profile?.score ? String(profile.score.score) : '—',
          },
          {
            label: 'Total Earned',
            value: profile?.earnings ? formatDollar(profile.earnings.totalEarnings) : '—',
          },
          {
            label: 'Outbound Txns',
            value: profile?.outboundTxCount !== null && profile?.outboundTxCount !== undefined
              ? String(profile.outboundTxCount)
              : '—',
          },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-[var(--surface)] rounded-xl p-4"
          >
            <div className="text-xs text-[var(--ink-3)] mb-1">{stat.label}</div>
            <div
              className="text-lg font-bold text-[var(--ink)]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
