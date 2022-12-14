import { useEffect, useState, useReducer, useCallback, useMemo } from "react"
import { statusReducer, StatusState } from "../reducers/status"
import {erc721ABI, useContractReads} from 'wagmi'
import { BigNumber } from 'ethers'
import { cacheDB } from '../modals/db'
import { useErc721TxInfiniteQuery, useHttpsJsonQueries, HttpsJson, Tx } from '../queries/etherscan'
import { Wallet } from '../modals/Wallet'
import { Nft } from '../modals/Nft'

type Address = string
type Nfts = Array<Nft>

export const useCrawledBlock = (address: Address): Wallet['crawledBlock'] => {
  const [crawledBlock, setCrawledBlock] = useState(0)
  useEffect(() => {
    (async () => {
      if (!address) return
      const crawledBlock = await cacheDB.getCrawledBlock(address)
      if (crawledBlock) setCrawledBlock(crawledBlock)
    })()
  }, [address, crawledBlock])
  return crawledBlock
}

type TokenObj = { contractAddress: string, tokenId: string }
type TokenString = string
const sep = '::'
const tokenObjToTokenString = ({contractAddress, tokenId}: TokenObj): TokenString => `${contractAddress}${sep}${tokenId}`
const toKenStringToTokenObj = (str: TokenString): TokenObj => {
  const ary = str.split(sep)
  return {contractAddress: ary[0], tokenId: ary[1]}
}
const extractUniqueTokenObj = (ary: Array<Tx>): Array<TokenObj> => {
  const uniqueTokenStrings = ary.reduce((acc, cur) => 
    acc.add(tokenObjToTokenString({
      contractAddress: cur.contractAddress,
      tokenId: cur.tokenID,
    })), new Set<TokenString>())
  return Array.from(uniqueTokenStrings).map(x => toKenStringToTokenObj(x))
}

type Ipfs = `ipfs://${string}`
type Https = `https://${string}`
type TokenABI = Ipfs | Https | string | null
const ipfsToHttps = (str: TokenABI): Https | undefined => {
  if (!str) return
  const ipfsReg = /^ipfs:\/\//i
  const httpsReg = /^https:\/\//i
  if (new RegExp(httpsReg).test(str)) return str as Https
  if (new RegExp(ipfsReg).test(str)) return str.replace(ipfsReg, 'https://ipfs.io/ipfs/') as Https
  return
}

export const useNft = (address: Address): { nfts: Nfts } & StatusState => {
  const initStatus: StatusState = { isLoading: true, isSuccess: false, isError: false, isUpdated: false }
  const [status, dispatchStatus] = useReducer(statusReducer, initStatus)
  const crawledBlock = useCrawledBlock(address)
  const [tmpNfts, setTmpNfts] = useState<Nfts>([])
  const [nfts, setNfts] = useState<Nfts>([])
  
  // ???????????? erc721 ???????????????
  // ??? indexedDB ?????????????????????????????????????????????
  const { allPages, currentPage, currentPageN, isEnd } = useErc721TxInfiniteQuery({
    url: 'https://api.etherscan.io/',
    address,
    startblock: crawledBlock,
  })

  // ????????????????????? Tokens ?????? tmpNfts
  // ???????????????
  useEffect(() => {
    const run = async (data: Tx[]) => {
      const crawledBlock = parseInt(data[data.length -1].blockNumber)
      const tokens = extractUniqueTokenObj(data)
      const tradedNfts = tokens.map((x): Nft => ({...x, type: 'ERC721'}))
      setTmpNfts(tradedNfts)
      await cacheDB.putWallet({address, crawledBlock})
    }
    const d = allPages?.pages[currentPageN - 1]    
    if (d && d.result.length > 0 && !isEnd) run(d.result)
  }, [ allPages, currentPage, currentPageN, isEnd, address])

  // ??????????????????????????????
  const fnNames: string[] = ['ownerOf', 'tokenURI']

  // ?????? token ??? owner ????????????????????? tokenURI
  const handler = (acc: Object[], cur: Nft) => {
    return acc.concat(fnNames.map(x => ({
      address: cur.contractAddress,
      abi: erc721ABI,
      functionName: x,
      args: [BigNumber.from(cur.tokenId)],
    })))
  }
  const contracts = tmpNfts.reduce(handler, [] as Object[])
  const {data: contractFnResults} = useContractReads({ contracts })

  // ???????????? tmpToken ??? metadata https json URI and ownerAddress
  // ?????????????????????
  const getOwnedNfts = useCallback(() => {
    const accurate: Nfts = []
    if (contractFnResults === undefined) return accurate
    if (!contractFnResults.length) return accurate
    for (let i = 0; i < contractFnResults.length; i += 2) {
      const ownerAddress = (contractFnResults as unknown[])[i as keyof typeof contractFnResults]
      const tokenURI = (contractFnResults as unknown[])[i + 1 as keyof typeof contractFnResults]
      if (ownerAddress !== address) continue
      const groupIdx = Math.floor(i / 2)
      accurate.push({
        ...tmpNfts[groupIdx],
        ownerAddress,
        tokenHttps: ipfsToHttps(tokenURI as string)
      })
    }
    return accurate
  }, [address, tmpNfts, contractFnResults])

  // ???????????????????????? nft ????????????
  useEffect(() => {
    const run = async () => {
      const ownedNfts = getOwnedNfts()
      setNfts(ownedNfts)
      await cacheDB.putNfts(ownedNfts)
    }
    run()
  }, [getOwnedNfts])

  const ownedNftHttpsURIs = useMemo(() => 
    getOwnedNfts().map(x => x.tokenHttps as HttpsJson), [getOwnedNfts])

  // ???????????? metadata
  const queryResults = useHttpsJsonQueries(ownedNftHttpsURIs)

  // the way to solve infinite renders
  // https://github.com/TanStack/query/issues/3049
  const nftsWithMetadata = useMemo(
    () => queryResults.map((item, idx) => ({
      ...getOwnedNfts()[idx],
      metadata: item.data,
      image: ipfsToHttps((item.data as any)?.image)
    })),
    [queryResults.reduce((acc, cur) => acc + cur.dataUpdatedAt, 0), getOwnedNfts],
  )

  // ?????? ??? metadata ??? nfts
  useEffect(() => {
    const run = async () => {
      await cacheDB.putNfts(nftsWithMetadata)
      const cache = await cacheDB.nfts.orderBy('contractAddress').toArray()
      setNfts(cache)
    }
    run()
  }, [nftsWithMetadata])
  
  return {nfts, ...status}
}

export default useNft