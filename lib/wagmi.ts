'use client'

import { createConfig, http } from 'wagmi'
import { base, mainnet, arbitrum, optimism } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'

// Safe projectId — RainbowKit requires a non-empty string
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'abc123placeholder'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet, rainbowWallet, walletConnectWallet],
    },
  ],
  { appName: 'Mintware', projectId }
)

export const wagmiConfig = createConfig({
  chains: [base, mainnet, arbitrum, optimism],
  connectors,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  ssr: true,
})
