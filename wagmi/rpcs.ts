/**
 * follow wagmi's way to define
 * but we change the key name as same as network name for getting url easily
 * because they are just mapping manually in wagmi source code
 * https://github.com/wagmi-dev/wagmi/blob/main/packages/core/src/constants/rpcs.ts
 */
import { allChains } from '@wagmi/core'
const networks = [...allChains.map(x => x.network)] as const
export type Networks = typeof networks
export type PocketNetworks = Extract<
  Networks,
  | 'homestead' // mainnet
  | 'goerli' // goerli
  | 'matic' // polygon
  | 'maticmum' // polygonMumbai
>

export const pocketRpcUrls: Record<PocketNetworks, string> = {
  homestead: 'https://eth-mainnet.gateway.pokt.network/v1/lb',
  goerli: 'https://eth-goerli.gateway.pokt.network/v1/lb',
  matic: 'https://poly-mainnet.gateway.pokt.network/v1/lb',
  maticmum: 'https://polygon-mumbai.gateway.pokt.network/v1/lb',
} as const