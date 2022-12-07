import Head from 'next/head'
import Image from 'next/image'
import { Image as ChakraImage, useColorMode, Flex, Box, Spacer, Heading, Button, Card, CardBody, Text, Divider, CardFooter, SimpleGrid, Img } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Profile from '../components/Profile'
import { useAccount } from 'wagmi'
import { Fragment } from 'react'
import { useNft } from '../hooks/useNft'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { address } = useAccount()
  const { nfts, ...status } = useNft(address as string)
  return (
    <Fragment>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Flex alignItems="center" p={2}>
          <Heading p={2} size='md' as='s'>NFT Marketplace</Heading>
          <Spacer />  
          <Button onClick={toggleColorMode} variant='ghost'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Profile/>
        </Flex>
      </header>
      <main>
        <Heading size='lg' pl={6}>Your NFT Assets</Heading>
        <SimpleGrid p={6} minChildWidth={240} spacing={6}>
          {nfts.map((nft, idx) => {
            return (
              <Card key={`${nft.contractAddress}${nft.tokenId}${idx}`} maxW='sm'>
                <CardBody>
                  <Box position="relative" width="100%" height="240">
                    <Image
                      fill
                      layout='fill'
                      objectFit='contain'
                      src={nft.image ? nft.image : ''}
                      alt={nft.tokenId ? nft.tokenId : ''}
                    />
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Flex alignItems='center' width="100%" justifyContent='space-between'>
                    <Text  noOfLines={1} fontSize='md' maxW={24}>{nft.tokenId}</Text>
                    <Text fontSize='xs'>{nft.type}</Text>
                  </Flex>
                </CardFooter>
              </Card>
            )
          })}
        </SimpleGrid>
        
      </main>
    </Fragment>
  )
}

// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "../components/Chakra"