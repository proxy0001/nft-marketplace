export type ContractType = 'ERC721' | 'ERC1155'

export interface Nft {
  id?: number
  contractAddress?: string
  tokenId?: string
  type?: ContractType
  ownerAddress?: string
  tokenHttps?: string
  metadata?: Object | string
  image?: string
  timeStamp?: string
}