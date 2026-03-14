// Etherscan API client — used for outbound tx count via nonce

const BASE_URL = 'https://api.etherscan.io/api'

export async function fetchOutboundTxCount(address: string): Promise<number | null> {
  try {
    const key = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY ?? ''
    const url = `${BASE_URL}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${key}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.result) return null
    return parseInt(data.result, 16)
  } catch {
    return null
  }
}
