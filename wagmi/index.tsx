import React from 'react'
import { WagmiConfig, createClient, chain, configureChains, defaultChains, allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'
import { pocketProvider } from './providers/pocketProvider'
import { avalanche } from './chains'
const { chains, provider, webSocketProvider } = configureChains([
  chain.mainnet, chain.polygon, avalanche
], [
  pocketProvider({
    applicationId: process.env.NEXT_PUBLIC_POCKET_APP_ID,
    applicationSecretKey: process.env.NEXT_PUBLIC_POCKET_APP_SECRET_KEY,
  }),
  publicProvider()
])

const client = createClient({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  provider,
  webSocketProvider,
})

export interface WagmiProps extends React.PropsWithChildren {}

export function Wagmi({children}: WagmiProps) {
  console.log('client', client)
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}

export default Wagmi