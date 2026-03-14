'use client'

import { useEffect, useState } from 'react'
import {
  getReferralEarnings,
  getReferredWallets,
  getRewardPools,
  type ReferralEarnings,
  type RewardPool,
} from '@/lib/contracts'

export function useReferralEarnings(address: string | null | undefined) {
  const [earnings, setEarnings] = useState<ReferralEarnings | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    getReferralEarnings(address)
      .then(setEarnings)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [address])

  return { earnings, loading }
}

export function useReferredWallets(address: string | null | undefined) {
  const [wallets, setWallets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    getReferredWallets(address)
      .then(setWallets)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [address])

  return { wallets, loading }
}

export function useRewardPools(filter?: 'active' | 'inactive') {
  const [pools, setPools] = useState<RewardPool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRewardPools(filter)
      .then(setPools)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  return { pools, loading }
}
