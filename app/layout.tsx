import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/shared/Providers'

export const metadata: Metadata = {
  title: 'Mintware — Social Liquidity Infrastructure',
  description: 'Deploy social LP vaults where community members deposit USDC, teams seed the token side, and Attribution scoring weights how fees, MEV capture, and rewards are distributed.',
  openGraph: {
    title: 'Mintware',
    description: 'Social liquidity infrastructure built on Uniswap V4',
    siteName: 'Mintware',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
