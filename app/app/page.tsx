'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import { useWalletProfile } from '@/hooks/useWalletProfile'
import ProfileHeader from '@/components/portfolio/ProfileHeader'
import ScorePanel from '@/components/portfolio/ScorePanel'
import EarningsPanel from '@/components/portfolio/EarningsPanel'
import AssetTable from '@/components/portfolio/AssetTable'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

function PortfolioContent() {
  const searchParams = useSearchParams()
  const { address: connectedAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  const viewingWallet = searchParams.get('wallet')
  const targetAddress = viewingWallet ?? connectedAddress

  const { profile, loading, error } = useWalletProfile(targetAddress)
  const isReadOnly = Boolean(viewingWallet)

  if (!targetAddress) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-3xl mb-6">
          👤
        </div>
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-3">Connect your wallet</h2>
        <p className="text-[var(--ink-2)] max-w-md mb-8">
          Connect to see your portfolio, Attribution score, and earnings. Or paste any wallet
          address in the search bar to explore any wallet.
        </p>
        <button
          onClick={openConnectModal}
          className="px-6 py-3 rounded-xl bg-[var(--blue)] text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-[var(--ink-3)] mb-4">Failed to load wallet data</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--ink-2)] hover:border-[var(--border-strong)] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  const walletPositions = profile?.positions?.filter(p => p.type === 'wallet') ?? []
  const defiPositions = profile?.positions?.filter(p => p.type === 'defi') ?? []

  return (
    <div>
      {isReadOnly && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm flex items-center gap-2">
          <span>👁</span>
          <span>Viewing read-only profile. Write actions are disabled.</span>
        </div>
      )}

      <ProfileHeader profile={profile} loading={loading} address={targetAddress} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tokens */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[var(--ink)]">Token Holdings</h3>
              <span className="text-xs text-[var(--ink-3)]">{walletPositions.length} assets</span>
            </div>
            <AssetTable positions={profile?.positions ?? []} loading={loading} type="wallet" />
          </div>

          {/* DeFi Positions */}
          {(loading || defiPositions.length > 0) && (
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[var(--ink)]">DeFi Positions</h3>
                <span className="text-xs text-[var(--ink-3)]">{defiPositions.length} positions</span>
              </div>
              <AssetTable positions={profile?.positions ?? []} loading={loading} type="defi" />
            </div>
          )}

          {/* CTA if no positions */}
          {!loading && walletPositions.length === 0 && defiPositions.length === 0 && !isReadOnly && (
            <div className="bg-white rounded-2xl p-12 border border-[var(--border)] text-center">
              <div className="text-3xl mb-4">💎</div>
              <h3 className="font-bold text-[var(--ink)] mb-2">No positions yet</h3>
              <p className="text-[var(--ink-2)] text-sm mb-6 max-w-sm mx-auto">
                Deposit USDC into a Mintware vault to start earning. Your Attribution score will track your activity.
              </p>
              <Link
                href="/app/vaults"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--blue)] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Browse Vaults →
              </Link>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <ScorePanel score={profile?.score ?? null} loading={loading} />
          <EarningsPanel earnings={profile?.earnings ?? null} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}
