'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { executeSwap } from '@/lib/contracts'

const TOKENS = [
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', decimals: 6 },
  { symbol: 'ETH', name: 'Ethereum', icon: '⟠', decimals: 18 },
  { symbol: 'BRETT', name: 'Brett', icon: '🐸', decimals: 18 },
  { symbol: 'DEGEN', name: 'Degen', icon: '🎩', decimals: 18 },
  { symbol: 'HIGHER', name: 'Higher', icon: '↑', decimals: 18 },
]

type SwapState = 'idle' | 'fetching-quote' | 'pending' | 'success' | 'error' | 'coming-soon'

export default function SwapPage() {
  const { address, isConnected } = useAccount()
  const [tokenIn, setTokenIn] = useState(TOKENS[0])
  const [tokenOut, setTokenOut] = useState(TOKENS[1])
  const [amountIn, setAmountIn] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [state, setState] = useState<SwapState>('idle')

  function flipTokens() {
    setTokenIn(tokenOut)
    setTokenOut(tokenIn)
  }

  async function handleSwap() {
    if (!amountIn || isNaN(Number(amountIn))) return
    setState('pending')
    try {
      const decimals = tokenIn.decimals
      const amount = BigInt(Math.floor(Number(amountIn) * 10 ** decimals))
      await executeSwap(tokenIn.symbol, tokenOut.symbol, amount, slippage)
      setState('success')
    } catch (err: any) {
      if (err.message?.includes('not yet wired') || err.message?.includes('coming soon')) {
        setState('coming-soon')
      } else {
        setState('error')
      }
    }
  }

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--ink)]">Swap</h1>
          <p className="text-[var(--ink-2)] text-sm mt-1">
            Every swap contributes to your Attribution score.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[var(--border)] p-6 shadow-sm">
          {state === 'coming-soon' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="font-bold text-[var(--ink)] mb-2">Swap Coming Soon</h3>
              <p className="text-[var(--ink-2)] text-sm mb-6">
                Swap integration with 0x / 1inch is being wired. Check back soon!
              </p>
              <button
                onClick={() => setState('idle')}
                className="px-5 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--ink)] font-medium text-sm border border-[var(--border)]"
              >
                Go back
              </button>
            </div>
          ) : (
            <>
              {/* Token In */}
              <div className="bg-[var(--surface)] rounded-2xl p-4 mb-2">
                <div className="text-xs text-[var(--ink-3)] mb-2">You pay</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={amountIn}
                    onChange={e => setAmountIn(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 text-2xl font-semibold bg-transparent text-[var(--ink)] focus:outline-none"
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  />
                  <TokenSelector
                    tokens={TOKENS}
                    selected={tokenIn}
                    onSelect={t => t.symbol !== tokenOut.symbol && setTokenIn(t)}
                  />
                </div>
              </div>

              {/* Flip */}
              <div className="flex justify-center -my-1 relative z-10">
                <button
                  onClick={flipTokens}
                  className="w-9 h-9 rounded-xl bg-white border-2 border-[var(--border)] flex items-center justify-center text-[var(--ink-3)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors shadow-sm"
                >
                  ↕
                </button>
              </div>

              {/* Token Out */}
              <div className="bg-[var(--surface)] rounded-2xl p-4 mt-2 mb-6">
                <div className="text-xs text-[var(--ink-3)] mb-2">You receive</div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 text-2xl font-semibold text-[var(--ink-3)]"
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    {amountIn ? '~' + (Number(amountIn) * 0.998).toFixed(4) : '0.00'}
                  </div>
                  <TokenSelector
                    tokens={TOKENS}
                    selected={tokenOut}
                    onSelect={t => t.symbol !== tokenIn.symbol && setTokenOut(t)}
                  />
                </div>
              </div>

              {/* Attribution note */}
              <div className="mb-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-[var(--blue)] text-xs flex items-start gap-2">
                <span className="mt-0.5">📊</span>
                <span>This swap contributes to your Attribution score via on-chain hook tracking.</span>
              </div>

              {/* Slippage */}
              <div className="mb-4">
                <div className="text-xs text-[var(--ink-3)] mb-2">Max slippage</div>
                <div className="flex gap-2">
                  {[0.1, 0.5, 1.0, 3.0].map(s => (
                    <button
                      key={s}
                      onClick={() => setSlippage(s)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        slippage === s
                          ? 'bg-[var(--blue)] text-white'
                          : 'bg-[var(--surface)] text-[var(--ink-2)] hover:bg-[var(--border)]'
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>

              {state === 'error' && (
                <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm">
                  Swap failed. Please try again.
                </div>
              )}

              {isConnected ? (
                <button
                  onClick={handleSwap}
                  disabled={!amountIn || state === 'pending'}
                  className="w-full py-4 rounded-2xl bg-[var(--blue)] text-white font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {state === 'pending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Swapping…
                    </>
                  ) : (
                    `Swap ${tokenIn.symbol} → ${tokenOut.symbol}`
                  )}
                </button>
              ) : (
                <div className="text-center text-sm text-[var(--ink-3)] py-4">
                  Connect your wallet to swap
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function TokenSelector({
  tokens,
  selected,
  onSelect,
}: {
  tokens: typeof TOKENS
  selected: (typeof TOKENS)[0]
  onSelect: (token: (typeof TOKENS)[0]) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[var(--border)] text-[var(--ink)] font-semibold text-sm hover:border-[var(--border-strong)] transition-colors"
      >
        <span>{selected.icon}</span>
        <span>{selected.symbol}</span>
        <span className="text-[var(--ink-3)]">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-20 min-w-[140px]">
          {tokens.map(t => (
            <button
              key={t.symbol}
              onClick={() => { onSelect(t); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-[var(--surface)] transition-colors ${
                t.symbol === selected.symbol ? 'bg-blue-50 text-[var(--blue)]' : 'text-[var(--ink)]'
              }`}
            >
              <span>{t.icon}</span>
              <span className="font-medium">{t.symbol}</span>
              <span className="text-xs text-[var(--ink-3)] ml-auto">{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
