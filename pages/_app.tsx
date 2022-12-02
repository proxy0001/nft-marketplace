// setup your wrapper in the _app file (e.g: pages/_app.js)
import { Chakra } from "../components/Chakra";
import type { AppProps } from 'next/app'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return <Chakra cookies={pageProps.cookies} theme={theme}>
    <Component {...pageProps} />
  </Chakra>
}