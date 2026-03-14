'use client'

import Link from 'next/link'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { formatAddress } from '@/lib/utils'
import { useEnsName } from 'wagmi'

export default function LandingNav() {
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const { data: ens } = useEnsName({ address })

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--blue)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-[var(--ink)] text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Mintware
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/app" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors font-medium">
            App
          </Link>
          <Link href="/app/vaults" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors font-medium">
            Vaults
          </Link>
          <Link href="/app/leaderboard" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors font-medium">
            Leaderboard
          </Link>
          <Link href="/teams" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors font-medium">
            For Teams
          </Link>
        </nav>

        {/* CTA */}
        {isConnected && address ? (
          <Link
            href="/app"
            className="px-4 py-2 rounded-xl bg-[var(--blue)] text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {ens ?? formatAddress(address)}
          </Link>
        ) : (
          <button
            onClick={openConnectModal}
            className="px-4 py-2 rounded-xl bg-[var(--blue)] text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
}
