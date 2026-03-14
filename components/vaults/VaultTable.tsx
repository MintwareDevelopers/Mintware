'use client'

import { useState } from 'react'
import { type Vault } from '@/lib/contracts'
import { formatDollar, formatNumber, chainName } from '@/lib/utils'
import StatusPill from '@/components/shared/StatusPill'
import { SkeletonTable } from '@/components/shared/SkeletonLoader'
import DepositPanel from './DepositPanel'

export default function VaultTable({
  vaults,
  loading,
  userScore,
  isReadOnly,
}: {
  vaults: Vault[]
  loading: boolean
  userScore?: number
  isReadOnly?: boolean
}) {
  const [selected, setSelected] = useState<Vault | null>(null)

  if (loading) return <SkeletonTable rows={3} cols={6} />

  if (vaults.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--ink-3)] text-sm">
        No vaults available yet
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Vault</th>
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">TVL</th>
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">APR</th>
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">MEV Share</th>
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">LPs</th>
              <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {vaults.map(vault => {
              const scoreMet = !vault.minScore || (userScore ?? 0) >= vault.minScore
              return (
                <tr
                  key={vault.id}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-lg">
                        {vault.tokenIcon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[var(--ink)]">{vault.tokenSymbol}/USDC</span>
                          <StatusPill status={vault.status} />
                        </div>
                        <div className="text-xs text-[var(--ink-3)] mt-0.5">
                          {chainName(vault.chain)} · Team seeds {vault.teamSeed}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <span className="text-sm font-medium text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {formatDollar(vault.tvl, 0)}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <span className="text-sm font-bold text-[var(--green)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {vault.apr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <span className="text-sm text-[var(--ink-2)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {vault.mevShare.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <span className="text-sm text-[var(--ink-2)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {formatNumber(vault.lpCount)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {isReadOnly ? null : scoreMet ? (
                      <button
                        onClick={() => setSelected(vault)}
                        className="px-3 py-1.5 rounded-lg bg-[var(--blue)] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Deposit USDC
                      </button>
                    ) : (
                      <span className="text-xs text-[var(--ink-3)]">
                        Score {vault.minScore}+ required
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <DepositPanel vault={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
