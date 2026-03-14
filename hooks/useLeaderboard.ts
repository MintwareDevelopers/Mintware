'use client'

import { useEffect, useState, useCallback } from 'react'
import { getLeaderboard, getUserRank, type LeaderboardEntry } from '@/lib/contracts'

type Tab = 'score' | 'earners' | 'referrers' | 'rising'

export function useLeaderboard(chain = 'all', tab: Tab = 'score') {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const refresh = useCallback(async () => {
    try {
      const data = await getLeaderboard(chain, tab)
      setEntries(data)
      setLastUpdated(new Date())
      setError(null)
    } catch {
      setError('Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }, [chain, tab])

  useEffect(() => {
    setLoading(true)
    refresh()

    // Poll every 60 seconds
    const interval = setInterval(refresh, 60_000)
    return () => clearInterval(interval)
  }, [refresh])

  return { entries, loading, error, lastUpdated, refresh }
}

export function useUserRank(address: string | null | undefined) {
  const [rank, setRank] = useState<{ rank: number; total: number; topPct: number; weeklyChange: number } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    getUserRank(address)
      .then(setRank)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [address])

  return { rank, loading }
}
