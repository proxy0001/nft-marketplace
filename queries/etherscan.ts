import { useQuery, useQueries, useInfiniteQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { Tracing } from "trace_events"

type Address = string
type Url = string
type FetchByAddressParams = {
  url: Url
  address: Address
  page?: number
  startblock?: number
}
type FetchByAddress<D> = (params: FetchByAddressParams) => Promise<D>

export type Response<D> = {
  status: string
  message: string
  result: Array<D>
}

export type Tx = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: Address
  contractAddress: Address
  to: Address
  tokenID: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}

const offsetN = 100

const fetchErc721Tx: FetchByAddress<Response<Tx>> = async ({url, address, page = 1, startblock = 0}) => {
  const params = new URLSearchParams({
    module: 'account',
    action: 'tokennfttx',
    address,
    page: page.toString(),
    startblock: startblock.toString(),
    sort: 'asc',
    offset: offsetN.toString(),
    apikey: 'SKSVP9NSMVDP2W58BRD73Z9GBHP33WSK4I',
  })
  const res = await fetch(url + '/api?' + params)
  const data = await res.json()
  return data
}

export const useErc721TxQuery = (params: FetchByAddressParams) =>
  useQuery(['erc721Tx', params], () => fetchErc721Tx(params))

export const useErc721TxInfiniteQuery = (params: FetchByAddressParams) => {
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState({} as Response<Tx>)
  const [currentPageN, setCurrentPageN] = useState(-1)

  const {data: allPages, fetchNextPage} = useInfiniteQuery(['erc721TxInfinite', params], async ({ pageParam = 1, queryKey}) => {
    const d = await fetchErc721Tx({...queryKey[1] as FetchByAddressParams, page: pageParam as number})
    setCurrentPageN(pageParam)
    if (d.status !== '1') setIsEnd(true)
    else setCurrentPage(d)
    return d
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (isEnd) return undefined
      if (lastPage.status !== '1' || lastPage.result.length === 0) return setIsEnd(true)
      return pages.length + 1
    },
  })

  useEffect(() => {
    if (!isEnd) fetchNextPage()
  }, [allPages, isEnd, fetchNextPage])

  return {allPages, currentPage, currentPageN, isEnd}
}

export type HttpsJson = `http://${string}.json`
type FetchHttpsJson = (httpsJson: HttpsJson) => Promise<JSON>

const fetchHttpsJson: FetchHttpsJson = async (httpsJson: HttpsJson) => {
  const res = await fetch(httpsJson)
  const data = await res.json()
  return data
}

export const useHttpsJsonQuery = (httpsJson: HttpsJson) =>
  useQuery(['httpsJson', httpsJson], () => fetchHttpsJson(httpsJson))

export const useHttpsJsonQueries = (httpsJsonAry: Array<HttpsJson>) => 
  useQueries({
    queries: httpsJsonAry.map(httpsJson => {
      return {
        queryKey: ['httpsJson', httpsJson],
        queryFn: () => fetchHttpsJson(httpsJson),
      }
    })
  })

const queries = {
  useErc721TxQuery,
  useErc721TxInfiniteQuery,
  useHttpsJsonQuery,
  useHttpsJsonQueries,
}

export default queries