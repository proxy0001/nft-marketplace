import Dexie, { Table } from 'dexie'
import { Wallet } from './Wallet'
import { Nft } from './Nft'

export class CacheDB extends Dexie {
  wallets!: Table<Wallet, number>
  nfts!: Table<Nft, number>

  constructor() {
    super('CacheDB')
    this.version(1).stores({
      wallets: 'address',
      nfts: '[contractAddress+tokenId], contractAddress, ownerAddress, type',
    })
  }

  async getCrawledBlock (address: Wallet['address']): Promise<Wallet['crawledBlock']> {
    const record = await this.wallets.where({address}).first()
    return record?.crawledBlock
  }

  async putWallet ({address, crawledBlock = -1}: Wallet) {
    const cache = await this.wallets.where({address}).first()
    if (cache && cache.crawledBlock && crawledBlock < cache.crawledBlock) return
    return await this.wallets.put({ address, crawledBlock }, 0).catch(error => {})
  }

  async putNft ({contractAddress, tokenId, type, ownerAddress}: Nft) {
    return await this.nfts.put({ contractAddress, tokenId, type }).catch(error => {})
  }

  async putNfts (items: Nft[]) {
    return await this.nfts.bulkPut(items).catch(error => {})
  }
}

export const cacheDB = new CacheDB()

export function clearCache() {
  return cacheDB.transaction('rw', cacheDB.wallets, cacheDB.nfts, async () => {
    await Promise.all(cacheDB.tables.map(table => table.clear()))
  })
}
