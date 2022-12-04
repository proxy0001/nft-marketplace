import Head from 'next/head'
import Image from 'next/image'
import { useColorMode, Flex, Box, Spacer, Heading, Button, Center } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Profile from '../components/Profile'
import Wagmi from '../wagmi'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Flex alignItems="center" p={2}>
          <Heading p={2} size='md'>NFT Marketplace</Heading>
          <Spacer />  
          <Button onClick={toggleColorMode} variant='ghost'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Wagmi>
            <Profile/>
          </Wagmi>
        </Flex>
      </header>
      <main>
      </main>
    </div>
  )
}

// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "../components/Chakra"