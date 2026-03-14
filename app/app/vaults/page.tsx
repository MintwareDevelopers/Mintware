'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useVaults, useUserVaultPositions } from '@/hooks/useVaults'
import { useAttributionScore } from '@/hooks/useAttributionScore'
import VaultTable from '@/components/vaults/VaultTable'
import { Skeleton } from '@/components/shared/SkeletonLoader'
import { formatDollar } from '@/lib/utils'

function VaultsContent() {
  const searchParams = useSearchParams()
  const { address: connectedAddress } = useAccount()
  const viewingWallet = searchParams.get('wallet')
  const targetAddress = viewingWallet ?? connectedAddress
  const isReadOnly = Boolean(viewingWallet)

  const { vaults, loading: vaultsLoading } = useVaults()
  const { positions, loading: positionsLoading } = useUserVaultPositions(targetAddress)
  const { score } = useAttributionScore(targetAddress)

  const totalDeposited = positions.reduce((sum, p) => sum + p.depositedUsdc, 0)
  const totalEarned = positions.reduce((sum, p) => sum + p.earnedUsdc, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Vaults</h1>
        <p className="text-[var(--ink-2)]">
          Deposit USDC into social LP vaults. Teams seed the token side.
        </p>
      </div>

      {/* Your positions */}
      {targetAddress && (
        <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
          <h2 className="font-bold text-[var(--ink)] mb-4">Your Positions</h2>

          {positionsLoading ? (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20" />)}
            </div>
          ) : positions.length === 0 ? (
            <div className="text-center py-8 text-[var(--ink-3)] text-sm">
              No active positions yet. Deposit into a vault below to get started.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--surface)] rounded-xl p-4">
                  <div className="text-xs text-[var(--ink-3)] mb-1">Total Deposited</div>
                  <div className="text-xl font-bold text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {formatDollar(totalDeposited)}
                  </div>
                </div>
                <div className="bg-[var(--surface)] rounded-xl p-4">
                  <div className="text-xs text-[var(--ink-3)] mb-1">Total Earned</div>
                  <div className="text-xl font-bold text-[var(--green)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {formatDollar(totalEarned)}
                  </div>
                </div>
                <div className="bg-[var(--surface)] rounded-xl p-4">
                  <div className="text-xs text-[var(--ink-3)] mb-1">Active Positions</div>
                  <div className="text-xl font-bold text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {positions.length}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {positions.map(pos => (
                  <div
                    key={pos.vaultId}
                    className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{pos.tokenIcon}</div>
                      <div>
                        <div className="font-medium text-sm text-[var(--ink)]">
                          {pos.tokenSymbol}/USDC
                        </div>
                        <div className="text-xs text-[var(--ink-3)]">{pos.chain}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {formatDollar(pos.depositedUsdc)}
                      </div>
                      <div className="text-xs text-[var(--green)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        +{formatDollar(pos.earnedUsdc)} earned
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-bold text-[var(--blue)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {pos.apr.toFixed(1)}% APR
                      </div>
                      <div className="text-xs text-[var(--ink-3)]">+{pos.scoreBoost}% score boost</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* All vaults */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-[var(--ink)]">All Vaults</h2>
          <div className="text-xs text-[var(--ink-3)]">
            {vaults.length} vaults available
          </div>
        </div>

        <VaultTable
          vaults={vaults}
          loading={vaultsLoading}
          userScore={score?.score}
          isReadOnly={isReadOnly}
        />
      </div>

      {/* Score tier info */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
        <h2 className="font-bold text-[var(--ink)] mb-4">Score Boost Tiers</h2>
        <p className="text-sm text-[var(--ink-2)] mb-4">
          Your Attribution score determines how much extra APR you earn in every vault.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Score range</th>
                <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Tier</th>
                <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3">Boost</th>
              </tr>
            </thead>
            <tbody>
              {[
                { range: '0–50', tier: 'Newcomer', boost: 'Base rate', active: (score?.score ?? 0) <= 50 },
                { range: '51–70', tier: 'Member', boost: '+8%', active: (score?.score ?? 0) >= 51 && (score?.score ?? 0) <= 70 },
                { range: '71–80', tier: 'Active', boost: '+13%', active: (score?.score ?? 0) >= 71 && (score?.score ?? 0) <= 80 },
                { range: '81–90', tier: 'Builder', boost: '+18%', active: (score?.score ?? 0) >= 81 && (score?.score ?? 0) <= 90 },
                { range: '91–100', tier: 'Elite', boost: '+25%', active: (score?.score ?? 0) >= 91 },
              ].map(row => (
                <tr
                  key={row.range}
                  className={`border-b border-[var(--border)] last:border-0 ${row.active ? 'bg-blue-50' : ''}`}
                >
                  <td className={`py-3 pr-4 text-sm ${row.active ? 'font-semibold text-[var(--blue)]' : 'text-[var(--ink-2)]'}`}
                    style={{ fontFamily: 'DM Mono, monospace' }}>
                    {row.range}
                  </td>
                  <td className={`py-3 pr-4 text-sm ${row.active ? 'font-semibold text-[var(--blue)]' : 'text-[var(--ink-2)]'}`}>
                    {row.tier}
                    {row.active && <span className="ml-2 text-xs">← you</span>}
                  </td>
                  <td className={`py-3 text-right text-sm font-medium ${row.active ? 'text-[var(--blue)]' : 'text-[var(--ink-2)]'}`}
                    style={{ fontFamily: 'DM Mono, monospace' }}>
                    {row.boost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function VaultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VaultsContent />
    </Suspense>
  )
}
