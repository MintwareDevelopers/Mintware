// Utility functions for address formatting, number formatting, etc.

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function formatDollar(value: number, decimals = 2): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return `$${value.toFixed(decimals)}`
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toString()
}

export function formatPct(value: number, decimals = 1): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function getScoreTier(score: number): { label: string; boost: string; color: string } {
  if (score >= 91) return { label: 'Elite', boost: '+25%', color: '#8b5cf6' }
  if (score >= 81) return { label: 'Builder', boost: '+18%', color: '#0052FF' }
  if (score >= 71) return { label: 'Active', boost: '+13%', color: '#16a34a' }
  if (score >= 51) return { label: 'Member', boost: '+8%', color: '#f59e0b' }
  return { label: 'Newcomer', boost: 'Base rate', color: '#8A8C9E' }
}

export function getScoreBoostPct(score: number): number {
  if (score >= 91) return 25
  if (score >= 81) return 18
  if (score >= 71) return 13
  if (score >= 51) return 8
  return 0
}

export function walletEmoji(address: string): string {
  const emojis = ['🦊', '🐻', '🦁', '🐯', '🦅', '🐬', '🦋', '🌊', '⚡', '🔥', '🌙', '💎']
  const idx = parseInt(address.slice(-2), 16) % emojis.length
  return emojis[idx]
}

export function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value)
}

export function isValidEns(value: string): boolean {
  return value.endsWith('.eth') && value.length > 4
}

export function chainName(chain: string): string {
  const map: Record<string, string> = {
    base: 'Base',
    ethereum: 'Ethereum',
    arbitrum: 'Arbitrum',
    sonic: 'Sonic',
    optimism: 'Optimism',
    polygon: 'Polygon',
  }
  return map[chain.toLowerCase()] ?? chain
}

export function chainColor(chain: string): string {
  const map: Record<string, string> = {
    base: '#0052FF',
    ethereum: '#627EEA',
    arbitrum: '#28A0F0',
    sonic: '#00D4AA',
    optimism: '#FF0420',
    polygon: '#8247E5',
  }
  return map[chain.toLowerCase()] ?? '#8A8C9E'
}
