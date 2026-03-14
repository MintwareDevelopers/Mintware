'use client'

import { useEffect, useState } from 'react'
import { fetchPortfolio, fetchPositions, type Portfolio, type Position } from '@/lib/zerion'
import { fetchAttributionScore, type AttributionScore } from '@/lib/attribution'
import { getScore, getEarnings, getWalletName } from '@/lib/contracts'
import { fetchOutboundTxCount } from '@/lib/etherscan'
import { walletEmoji } from '@/lib/utils'

export interface WalletProfile {
  address: string
  ensName: string | null
  mintwareName: string | null
  avatar: string
  portfolio: Portfolio | null
  positions: Position[]
  score: AttributionScore | null
  earnings: {
    totalEarnings: number
    thisMonth: number
    vaultFees: number
    referralRewards: number
    rewardPools: number
    scoreWeight: number
  } | null
  outboundTxCount: number | null
}

export function useWalletProfile(address: string | null | undefined) {
  const [profile, setProfile] = useState<WalletProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) {
      setProfile(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    async function load() {
      try {
        const [portfolio, positions, attributionScore, earnings, mintwareName, outboundTxCount] =
          await Promise.allSettled([
            fetchPortfolio(address!),
            fetchPositions(address!),
            fetchAttributionScore(address!),
            getEarnings(address!),
            getWalletName(address!),
            fetchOutboundTxCount(address!),
          ])

        if (cancelled) return

        const scoreData = attributionScore.status === 'fulfilled' ? attributionScore.value : null
        const earningsData = earnings.status === 'fulfilled' ? earnings.value : null

        // Fall back to contract stub if attribution worker fails
        let finalScore = scoreData
        if (!finalScore) {
          try {
            const stubScore = await getScore(address!)
            finalScore = stubScore
          } catch {}
        }

        setProfile({
          address: address!,
          ensName: null, // resolved by wagmi useEnsName in component
          mintwareName: mintwareName.status === 'fulfilled' ? mintwareName.value : null,
          avatar: walletEmoji(address!),
          portfolio: portfolio.status === 'fulfilled' ? portfolio.value : null,
          positions: positions.status === 'fulfilled' ? positions.value : [],
          score: finalScore,
          earnings: earningsData,
          outboundTxCount: outboundTxCount.status === 'fulfilled' ? outboundTxCount.value : null,
        })
      } catch (err) {
        if (!cancelled) setError('Failed to load wallet profile')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [address])

  return { profile, loading, error }
}
