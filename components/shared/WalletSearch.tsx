'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidAddress, isValidEns } from '@/lib/utils'

export default function WalletSearch() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return

    setLoading(true)
    try {
      let address = trimmed
      if (isValidEns(trimmed)) {
        // We'll resolve ENS client-side in the app; pass the ENS name as-is
        // The app page will resolve it via wagmi
        address = trimmed
      } else if (!isValidAddress(trimmed)) {
        setLoading(false)
        return
      }
      router.push(`/app?wallet=${encodeURIComponent(address)}`)
      setValue('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-3)]"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Paste wallet or ENS…"
          className="pl-9 pr-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--blue)] transition-colors w-52 lg:w-64"
        />
      </div>
      {loading && (
        <div className="ml-2 w-4 h-4 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
      )}
    </form>
  )
}
