'use client'

import { useState } from 'react'
import { deposit, type Vault } from '@/lib/contracts'
import { getScoreBoostPct } from '@/lib/utils'
import { useAttributionScore } from '@/hooks/useAttributionScore'
import { useAccount } from 'wagmi'

type DepositState = 'idle' | 'pending' | 'success' | 'error' | 'coming-soon'

export default function DepositPanel({
  vault,
  onClose,
}: {
  vault: Vault
  onClose: () => void
}) {
  const [amount, setAmount] = useState('')
  const [state, setState] = useState<DepositState>('idle')
  const [txHash, setTxHash] = useState<string | null>(null)
  const { address } = useAccount()
  const { score } = useAttributionScore(address)

  const scoreBoost = score ? getScoreBoostPct(score.score) : 0
  const boostedApr = vault.apr * (1 + scoreBoost / 100)

  async function handleDeposit() {
    if (!amount || isNaN(Number(amount))) return
    setState('pending')
    try {
      const result = await deposit(vault.id, BigInt(Math.floor(Number(amount) * 1e6)))
      setTxHash(result.hash)
      setState('success')
    } catch (err: any) {
      if (err.message?.includes('coming soon') || err.message?.includes('not yet live')) {
        setState('coming-soon')
      } else {
        setState('error')
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--ink)]">Deposit USDC</h2>
            <div className="text-sm text-[var(--ink-3)] mt-0.5">
              {vault.tokenSymbol}/USDC Vault
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--ink-3)] hover:bg-[var(--border)] transition-colors"
          >
            ✕
          </button>
        </div>

        {state === 'coming-soon' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="font-bold text-[var(--ink)] mb-2">Coming Soon</h3>
            <p className="text-[var(--ink-2)] text-sm mb-6">
              Vault deposits will be live once smart contracts are deployed. Stay tuned!
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--ink)] font-medium text-sm border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors"
            >
              Got it
            </button>
          </div>
        ) : state === 'success' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-bold text-[var(--ink)] mb-2">Deposit Submitted</h3>
            {txHash && (
              <p className="text-xs text-[var(--ink-3)] mb-6 font-mono" style={{ fontFamily: 'DM Mono, monospace' }}>
                {txHash.slice(0, 20)}…
              </p>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[var(--blue)] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Note */}
            <div className="mb-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs">
              Team seeds the {vault.tokenSymbol} side. You only deposit USDC.
            </div>

            {/* Amount input */}
            <div className="mb-4">
              <label className="text-xs font-medium text-[var(--ink-3)] block mb-2">
                USDC Amount
              </label>
              <div className="flex items-center border border-[var(--border-strong)] rounded-xl overflow-hidden focus-within:border-[var(--blue)] transition-colors">
                <span className="pl-4 pr-2 text-sm text-[var(--ink-3)]">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 py-3 pr-4 text-lg font-semibold text-[var(--ink)] focus:outline-none bg-transparent"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                  disabled={state === 'pending'}
                />
                <span className="pr-4 text-sm text-[var(--ink-3)] font-medium">USDC</span>
              </div>
              <div className="flex gap-2 mt-2">
                {['25', '50', '100', '500'].map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="flex-1 py-1 rounded-lg bg-[var(--surface)] text-xs text-[var(--ink-2)] hover:bg-[var(--border)] transition-colors"
                  >
                    ${v}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {amount && Number(amount) > 0 && (
              <div className="mb-4 space-y-2 bg-[var(--surface)] rounded-xl p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--ink-3)]">Base APR</span>
                  <span className="font-medium text-[var(--ink)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {vault.apr.toFixed(1)}%
                  </span>
                </div>
                {scoreBoost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-3)]">Score boost (score {score?.score})</span>
                    <span className="font-medium text-[var(--green)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      +{scoreBoost}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[var(--border)] pt-2 mt-2">
                  <span className="font-semibold text-[var(--ink)]">Your APR</span>
                  <span className="font-bold text-[var(--green)]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {boostedApr.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            {state === 'error' && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm">
                Transaction failed. Please try again.
              </div>
            )}

            <button
              onClick={handleDeposit}
              disabled={!amount || state === 'pending'}
              className="w-full py-3.5 rounded-xl bg-[var(--blue)] text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {state === 'pending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                'Deposit USDC'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
