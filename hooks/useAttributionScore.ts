'use client'

import { useEffect, useState } from 'react'
import { fetchAttributionScore, type AttributionScore } from '@/lib/attribution'
import { getScore } from '@/lib/contracts'

export function useAttributionScore(address: string | null | undefined) {
  const [score, setScore] = useState<AttributionScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return

    let cancelled = false
    setLoading(true)

    async function load() {
      try {
        // Try live worker first
        let data = await fetchAttributionScore(address!)

        // Fall back to stub
        if (!data) {
          data = await getScore(address!)
        }

        if (!cancelled) setScore(data)
      } catch {
        if (!cancelled) setError('Could not load Attribution score')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [address])

  return { score, loading, error }
}
