// setup your wrapper in the _app file (e.g: pages/_app.js)
import { Chakra } from "../components/Chakra"
import type { AppProps } from 'next/app'
import theme from '../theme'
import Wagmi from "../wagmi"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wagmi>
      <QueryClientProvider client={queryClient}>
        <Chakra cookies={pageProps.cookies} theme={theme}>
          <Component {...pageProps} />
        </Chakra>  
      </QueryClientProvider>
    </Wagmi>
  )
}