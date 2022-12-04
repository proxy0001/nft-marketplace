import type { GetServerSidePropsContext } from 'next'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  ChakraProviderProps,
  ColorModeProviderProps,
} from '@chakra-ui/react'

type ChakraProviderWrap = ChakraProviderProps & { cookies: string | undefined }

export function Chakra({ cookies, children, ...restProps }: ChakraProviderWrap): JSX.Element {
  // b) Pass `colorModeManager` prop
  const colorModeManager: ColorModeProviderProps["colorModeManager"] =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager
  return (
    <ChakraProvider colorModeManager={colorModeManager} {...restProps}>
      {children}
    </ChakraProvider>
  )
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}