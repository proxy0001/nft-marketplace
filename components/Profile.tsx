import { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance, useConnect, useDisconnect, Connector } from 'wagmi'
import { OnClick } from '../@types/app'
import { Button, Flex } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import NoSSR from './NoSSR'
import { Avatar, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  const { chain } = useNetwork()
  const { chains, error: switchNetworkError, isLoading: switchNetworkIsLoading, pendingChainId, switchNetwork  } = useSwitchNetwork()
  const { address, connector, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  
  const onConnect: (connector: Connector) => OnClick = (connector) => event => connect({ connector })
  const onDisconnect: OnClick = event => disconnect()

  const getInitials = (n: string) => n.length > 2 ? n.slice(0, 2) : n
  const displayAddress = (address: string): string => address && address.length > 4 ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : address
  const displayBalance = (amount: string | undefined): string => amount ? amount.slice(0, amount.indexOf('.') + 3) : ''

  if (isConnected) return (
    <NoSSR>
      <Menu>
        <MenuButton variant='ghost' as={Button} rightIcon={<ChevronDownIcon />}>
          {chain?.name}
        </MenuButton>
        <MenuList>
          {chains.map((x) => (
            <MenuItem
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
            >
              {x.name}
              {switchNetworkIsLoading && pendingChainId === x.id && ' (switching)'}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Text fontSize={14} mr={2}>{`${displayBalance(balance?.formatted)} ${balance?.symbol}`}</Text>
      <Menu>
        <MenuButton as={Button} variant='ghost'>
          <Flex alignItems="center">
            <Text fontSize={14} mr={2}>{displayAddress(address as string)}</Text>
            <Avatar getInitials={getInitials} size='sm' name={address}/>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onDisconnect}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    </NoSSR>
  )

  return (
    <NoSSR>
      <Menu>
        <MenuButton variant='ghost' as={Button} rightIcon={<ChevronDownIcon />}>
          Connect
        </MenuButton>
        <MenuList>
          {connectors.map((conn) => (
            <MenuItem
              disabled={!conn.ready}
              key={conn.id}
              onClick={onConnect(conn)}
            >
              {conn.name}
              {!conn.ready && ' (unsupported)'}
              {isLoading && conn.id === pendingConnector?.id && ' (connecting)'}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </NoSSR>
  )
}