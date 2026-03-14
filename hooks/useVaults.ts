'use client'

import { useEffect, useState } from 'react'
import { getVaults, getUserVaultPositions, type Vault, type VaultPosition } from '@/lib/contracts'

export function useVaults() {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getVaults()
      .then(setVaults)
      .catch(() => setError('Failed to load vaults'))
      .finally(() => setLoading(false))
  }, [])

  return { vaults, loading, error }
}

export function useUserVaultPositions(address: string | null | undefined) {
  const [positions, setPositions] = useState<VaultPosition[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    setLoading(true)
    getUserVaultPositions(address)
      .then(setPositions)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [address])

  return { positions, loading }
}
