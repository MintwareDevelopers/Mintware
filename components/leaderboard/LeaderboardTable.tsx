'use client'

import { type LeaderboardEntry } from '@/lib/contracts'
import { formatAddress, formatDollar, formatPct } from '@/lib/utils'
import { SkeletonTable } from '@/components/shared/SkeletonLoader'

const PODIUM_MEDALS = ['🥇', '🥈', '🥉']

export default function LeaderboardTable({
  entries,
  loading,
  tab,
  highlightAddress,
}: {
  entries: LeaderboardEntry[]
  loading: boolean
  tab: string
  highlightAddress?: string
}) {
  if (loading) return <SkeletonTable rows={10} cols={5} />

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--ink-3)] text-sm">
        No entries yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4 w-10">#</th>
            <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Wallet</th>
            {tab === 'score' && (
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Score</th>
            )}
            {(tab === 'earners' || tab === 'score') && (
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Earnings</th>
            )}
            {(tab === 'referrers' || tab === 'score') && (
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Referrals</th>
            )}
            <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3">7d change</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => {
            const isHighlighted = highlightAddress?.toLowerCase() === entry.address.toLowerCase()
            const medal = entry.rank <= 3 ? PODIUM_MEDALS[entry.rank - 1] : null

            return (
              <tr
                key={entry.address}
                className={`border-b border-[var(--border)] last:border-0 transition-colors ${
                  isHighlighted
                    ? 'bg-blue-50'
                    : 'hover:bg-[var(--surface)]'
                }`}
              >
                <td className="py-3 pr-4">
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      color: medal ? undefined : 'var(--ink-3)',
                    }}
                  >
                    {medal ?? `#${entry.rank}`}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xs font-bold text-[var(--blue)]">
                      {(entry.name || entry.handle || entry.address).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[var(--ink)]">
                        {entry.name || formatAddress(entry.address)}
                      </div>
                      {entry.handle && (
                        <div className="text-xs text-[var(--ink-3)]">@{entry.handle}</div>
                      )}
                    </div>
                  </div>
                </td>
                {tab === 'score' && (
                  <td className="py-3 pr-4 text-right">
                    <span
                      className="text-sm font-bold text-[var(--blue)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {entry.score}
                    </span>
                  </td>
                )}
                {(tab === 'earners' || tab === 'score') && (
                  <td className="py-3 pr-4 text-right">
                    <span
                      className="text-sm font-medium text-[var(--ink)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {formatDollar(entry.earnings)}
                    </span>
                  </td>
                )}
                {(tab === 'referrers' || tab === 'score') && (
                  <td className="py-3 pr-4 text-right">
                    <span
                      className="text-sm text-[var(--ink-2)]"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {entry.referrals}
                    </span>
                  </td>
                )}
                <td className="py-3 text-right">
                  <span
                    className={`text-sm font-medium ${entry.weeklyChange > 0 ? 'text-[var(--green)]' : entry.weeklyChange < 0 ? 'text-red-500' : 'text-[var(--ink-3)]'}`}
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    {entry.weeklyChange > 0 ? `+${entry.weeklyChange}` : entry.weeklyChange === 0 ? '—' : entry.weeklyChange}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
