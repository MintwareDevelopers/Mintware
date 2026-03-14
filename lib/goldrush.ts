// GoldRush (Covalent) API client
// Base URL: https://api.covalenthq.com/v1
// Auth: Basic auth with API key

const BASE_URL = 'https://api.covalenthq.com/v1'

function getHeaders() {
  const key = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY
  const auth = key ? btoa(`${key}:`) : ''
  return {
    Authorization: auth ? `Basic ${auth}` : '',
    'Content-Type': 'application/json',
  }
}

export async function fetchTokenBalances(chainName: string, address: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/${chainName}/address/${address}/balances_v2/`,
      { headers: getHeaders() }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.items ?? []
  } catch {
    return null
  }
}

export async function fetchTransactions(chainName: string, address: string, page = 0) {
  try {
    const res = await fetch(
      `${BASE_URL}/${chainName}/address/${address}/transactions_v3/page/${page}/`,
      { headers: getHeaders() }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.items ?? []
  } catch {
    return null
  }
}

export async function fetchTransactionSummary(chainName: string, address: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/${chainName}/address/${address}/transactions_summary/`,
      { headers: getHeaders() }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.items?.[0] ?? null
  } catch {
    return null
  }
}

export async function fetchChainActivity(address: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/address/${address}/activity/`,
      { headers: getHeaders() }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.items ?? []
  } catch {
    return null
  }
}
