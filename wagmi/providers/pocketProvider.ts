import { providers } from 'ethers'
import type { ChainProviderFn, FallbackProviderConfig } from '@wagmi/core'
import { pocketRpcUrls, PocketNetworks } from '../rpcs'
/**
 * follow the infra provider implementaion of wagmi to do it
 * https://github.com/wagmi-dev/wagmi/blob/main/packages/core/src/providers/infura.ts
 * 
 * use PocketProvider by ethers.js
 * which now only support 4 networks: 
 *    homestead - Homestead (Mainnet)
 *    goerli - Görli (clique testnet)
 *    matic - Polgon mainnet
 *    maticmum - Polgon testnet
 * and not support websocketProvider
 * https://docs.ethers.io/v5/api/providers/api-providers/#PocketProvider
 */
export type PocketProviderConfig = FallbackProviderConfig & {
  /** Your Pocket API key from the [Infura Dashboard](https://www.portal.pokt.network/dashboard). */
  applicationId?: string
  applicationSecretKey?: string
  loadBalancer?: boolean
}

export function pocketProvider({
  applicationId,
  applicationSecretKey,
  loadBalancer,
  priority,
  stallTimeout,
  weight,
}: PocketProviderConfig): ChainProviderFn<
  providers.PocketProvider
  // providers.PocketWebSocketProvider
> {
  return function (chain) {
    const pocketRpcUrl = pocketRpcUrls[chain.network as PocketNetworks]
    if (!pocketRpcUrl) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${pocketRpcUrl}/${applicationId}`,
        },
      },
      provider: () => {
        const apiKeyObj = {applicationId, applicationSecretKey, loadBalancer}
        const provider = new providers.PocketProvider(chain.id, apiKeyObj)
        return Object.assign(provider, { priority, stallTimeout, weight })
      },
      // pocket not support web socket provider yet
      // webSocketProvider: () =>
      //   new providers.PocketWebSocketProvider(chain.id, apiKey),
    }
  }
}