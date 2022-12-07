import React from 'react'
import { WagmiConfig, createClient, chain, configureChains, defaultChains, allChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { pocketProvider } from './providers/pocketProvider'
import { avalanche } from './chains'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
 

const { chains, provider, webSocketProvider } = configureChains([
  chain.mainnet,
  chain.polygon,
  avalanche,
  chain.goerli,
  chain.polygonMumbai,
], [
  // pocketProvider({
  //   applicationId: process.env.NEXT_PUBLIC_POCKET_APP_ID,
  //   applicationSecretKey: process.env.NEXT_PUBLIC_POCKET_APP_SECRET_KEY,
  // }),
  publicProvider()
])

const connectors = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'NFT Marketplace',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
]

const client = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider,
})

export interface WagmiProps extends React.PropsWithChildren {}

export function Wagmi({children}: WagmiProps) {
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}

export default Wagmi