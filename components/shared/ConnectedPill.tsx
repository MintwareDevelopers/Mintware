'use client'

import { useAccount, useEnsName, useDisconnect } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { formatAddress } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConnectedPillInner() {
  const { address, isConnected } = useAccount()
  const { data: ens } = useEnsName({ address })
  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()
  const searchParams = useSearchParams()
  const viewingWallet = searchParams.get('wallet')

  if (viewingWallet) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Viewing: {formatAddress(viewingWallet)}
      </div>
    )
  }

  if (!isConnected || !address) {
    return (
      <button
        onClick={openConnectModal}
        className="px-4 py-2 rounded-xl bg-[var(--blue)] text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <button
      onClick={() => disconnect()}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] text-sm font-medium hover:bg-white hover:border-[var(--border-strong)] transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
      {ens ?? formatAddress(address)}
    </button>
  )
}

export default function ConnectedPill() {
  return (
    <Suspense fallback={<div className="w-28 h-8 skeleton rounded-xl" />}>
      <ConnectedPillInner />
    </Suspense>
  )
}
