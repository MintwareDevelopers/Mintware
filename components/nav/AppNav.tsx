'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WalletSearch from '@/components/shared/WalletSearch'
import ConnectedPill from '@/components/shared/ConnectedPill'

const TABS = [
  { label: 'Portfolio', href: '/app' },
  { label: 'Vaults', href: '/app/vaults' },
  { label: 'Leaderboard', href: '/app/leaderboard' },
  { label: 'Referrals', href: '/app/referrals' },
  { label: 'Swap', href: '/app/swap' },
]

export default function AppNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[var(--blue)] flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-bold text-[var(--ink)] hidden sm:block" style={{ fontFamily: 'Georgia, serif' }}>
              Mintware
            </span>
          </Link>

          {/* Wallet search */}
          <div className="flex-1 max-w-sm">
            <WalletSearch />
          </div>

          {/* Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {TABS.map(tab => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--surface)] text-[var(--ink)]'
                      : 'text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* Connected pill */}
          <div className="shrink-0">
            <ConnectedPill />
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="lg:hidden flex border-t border-[var(--border)] overflow-x-auto">
          {TABS.map(tab => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-[var(--blue)] text-[var(--ink)]'
                    : 'border-transparent text-[var(--ink-2)]'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
