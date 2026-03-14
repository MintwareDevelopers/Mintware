'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useLeaderboard, useUserRank } from '@/hooks/useLeaderboard'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable'
import { Skeleton } from '@/components/shared/SkeletonLoader'
import { formatAddress } from '@/lib/utils'

type Tab = 'score' | 'earners' | 'referrers' | 'rising'
type Chain = 'all' | 'base' | 'ethereum' | 'arbitrum' | 'sonic'

const TABS: { id: Tab; label: string }[] = [
  { id: 'score', label: 'Top Score' },
  { id: 'earners', label: 'Top Earners' },
  { id: 'referrers', label: 'Top Referrers' },
  { id: 'rising', label: 'Rising Fast' },
]

const CHAINS: { id: Chain; label: string }[] = [
  { id: 'all', label: 'All Chains' },
  { id: 'base', label: 'Base' },
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'arbitrum', label: 'Arbitrum' },
  { id: 'sonic', label: 'Sonic' },
]

function LeaderboardContent() {
  const [tab, setTab] = useState<Tab>('score')
  const [chain, setChain] = useState<Chain>('all')
  const searchParams = useSearchParams()
  const { address: connectedAddress } = useAccount()
  const viewingWallet = searchParams.get('wallet')
  const targetAddress = viewingWallet ?? connectedAddress

  const { entries, loading, lastUpdated } = useLeaderboard(chain, tab)
  const { rank } = useUserRank(targetAddress)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Leaderboard</h1>
        <p className="text-[var(--ink-2)]">Top wallets ranked by Attribution score, earnings, and referrals.</p>
      </div>

      {/* User rank banner */}
      {targetAddress && (
        <div className="bg-white rounded-2xl p-4 border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--ink)]">
                  {formatAddress(targetAddress)}
                </div>
                {rank && rank.rank > 0 ? (
                  <div className="text-xs text-[var(--ink-3)]">
                    Rank #{rank.rank} of {rank.total} · Top {rank.topPct}%
                  </div>
                ) : (
                  <div className="text-xs text-[var(--ink-3)]">Not yet ranked</div>
                )}
              </div>
            </div>
            {rank && rank.weeklyChange !== 0 && (
              <div className={`text-sm font-medium ${rank.weeklyChange > 0 ? 'text-[var(--green)]' : 'text-red-500'}`}
                style={{ fontFamily: 'DM Mono, monospace' }}>
                {rank.weeklyChange > 0 ? `▲ +${rank.weeklyChange}` : `▼ ${rank.weeklyChange}`} this week
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leaderboard card */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[var(--border)]">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
                tab === t.id
                  ? 'border-[var(--blue)] text-[var(--ink)]'
                  : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Chain filter */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-[var(--border)] overflow-x-auto">
          {CHAINS.map(c => (
            <button
              key={c.id}
              onClick={() => setChain(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                chain === c.id
                  ? 'bg-[var(--blue)] text-white'
                  : 'bg-[var(--surface)] text-[var(--ink-2)] hover:bg-[var(--border)]'
              }`}
            >
              {c.label}
            </button>
          ))}

          {lastUpdated && (
            <span className="ml-auto text-xs text-[var(--ink-3)] whitespace-nowrap">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="p-6">
          <LeaderboardTable
            entries={entries}
            loading={loading}
            tab={tab}
            highlightAddress={targetAddress}
          />
        </div>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LeaderboardContent />
    </Suspense>
  )
}
