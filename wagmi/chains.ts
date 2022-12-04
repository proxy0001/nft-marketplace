import { Chain } from 'wagmi'

export const avalanche: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}

const chains = {
  avalanche,
}

export default chains