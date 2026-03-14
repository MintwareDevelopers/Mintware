// Zerion API client
// Base URL: https://api.zerion.io/v1
// Auth: Bearer token

const BASE_URL = 'https://api.zerion.io/v1'

function getHeaders() {
  const key = process.env.NEXT_PUBLIC_ZERION_API_KEY
  return {
    Authorization: key ? `Bearer ${key}` : '',
    'Content-Type': 'application/json',
  }
}

export interface Portfolio {
  totalValue: number
  change24h: number
  changePct24h: number
}

export interface Position {
  id: string
  name: string
  symbol: string
  value: number
  quantity: number
  price: number
  change24h: number
  chain: string
  type: 'wallet' | 'defi'
  protocol?: string
  icon?: string
}

export async function fetchPortfolio(address: string): Promise<Portfolio | null> {
  try {
    const res = await fetch(`${BASE_URL}/wallets/${address}/portfolio/`, {
      headers: getHeaders(),
    })
    if (!res.ok) return null
    const data = await res.json()
    const attrs = data?.data?.attributes
    if (!attrs) return null
    return {
      totalValue: attrs.total?.positions ?? 0,
      change24h: attrs.changes?.absolute_1d ?? 0,
      changePct24h: attrs.changes?.percent_1d ?? 0,
    }
  } catch {
    return null
  }
}

export async function fetchPositions(address: string): Promise<Position[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/wallets/${address}/positions/?filter[positions]=no_filter&currency=usd&sort=value`,
      { headers: getHeaders() }
    )
    if (!res.ok) return []
    const data = await res.json()
    if (!data?.data) return []
    return data.data.map((item: any) => {
      const attrs = item.attributes
      const rel = item.relationships
      return {
        id: item.id,
        name: attrs.fungible_info?.name ?? '',
        symbol: attrs.fungible_info?.symbol ?? '',
        value: attrs.value ?? 0,
        quantity: attrs.quantity?.float ?? 0,
        price: attrs.price ?? 0,
        change24h: attrs.changes?.percent_1d ?? 0,
        chain: rel?.chain?.data?.id ?? 'ethereum',
        type: attrs.position_type === 'wallet' ? 'wallet' : 'defi',
        protocol: rel?.dapp?.data?.id,
        icon: attrs.fungible_info?.icon?.url,
      }
    })
  } catch {
    return []
  }
}

export async function fetchTransactions(address: string, page = 1): Promise<any[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/wallets/${address}/transactions/?currency=usd&page[size]=20&page[number]=${page}`,
      { headers: getHeaders() }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data?.data ?? []
  } catch {
    return []
  }
}

export async function fetchPnl(address: string): Promise<{ realizedPnl: number; unrealizedPnl: number } | null> {
  try {
    const res = await fetch(`${BASE_URL}/wallets/${address}/pnl/`, {
      headers: getHeaders(),
    })
    if (!res.ok) return null
    const data = await res.json()
    const attrs = data?.data?.attributes
    return {
      realizedPnl: attrs?.realized_pnl ?? 0,
      unrealizedPnl: attrs?.unrealized_pnl ?? 0,
    }
  } catch {
    return null
  }
}
