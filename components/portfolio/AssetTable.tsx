'use client'

import { type Position } from '@/lib/zerion'
import { formatDollar, formatPct, chainName, chainColor } from '@/lib/utils'
import { Skeleton, SkeletonTable } from '@/components/shared/SkeletonLoader'

export default function AssetTable({
  positions,
  loading,
  type = 'wallet',
}: {
  positions: Position[]
  loading: boolean
  type?: 'wallet' | 'defi'
}) {
  const filtered = positions.filter(p => p.type === type)

  if (loading) return <SkeletonTable rows={5} cols={5} />

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--ink-3)] text-sm">
        No {type === 'wallet' ? 'token' : 'DeFi'} positions found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="text-left text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Asset</th>
            <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Price</th>
            <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Amount</th>
            <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3 pr-4">Value</th>
            <th className="text-right text-xs font-medium text-[var(--ink-3)] pb-3">24h</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(pos => {
            const isPositive = pos.change24h >= 0
            return (
              <tr key={pos.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    {pos.icon ? (
                      <img src={pos.icon} alt={pos.symbol} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--ink-2)]">
                        {pos.symbol.slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-sm text-[var(--ink)]">{pos.symbol}</div>
                      <div className="text-xs text-[var(--ink-3)]">{pos.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="text-sm text-[var(--ink-2)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {formatDollar(pos.price)}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="text-sm text-[var(--ink-2)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {pos.quantity.toFixed(4)}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="text-sm font-medium text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {formatDollar(pos.value)}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`text-sm font-medium ${isPositive ? 'text-[var(--green)]' : 'text-red-500'}`}
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    {formatPct(pos.change24h)}
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
