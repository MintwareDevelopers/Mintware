// Attribution Worker API client
// Live at: https://attribution-scorer.ceo-1f9.workers.dev

const WORKER_URL = process.env.NEXT_PUBLIC_ATTRIBUTION_WORKER_URL ||
  'https://attribution-scorer.ceo-1f9.workers.dev'

export interface AttributionScore {
  score: number
  tier: string
  dimensions: {
    lpBehavior: number
    defiCompetence: number
    walletLongevity: number
    networkReferral: number
    mintwareNative: number
  }
  topPct?: number
}

export async function fetchAttributionScore(address: string): Promise<AttributionScore | null> {
  try {
    const res = await fetch(`${WORKER_URL}/score/${address}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}
