import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, Connector } from 'wagmi'
import { OnClick } from '../@types/app'
import { Button, Flex } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import NoSSR from './NoSSR'
import { Avatar, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address, chainId: 1, })
  const { data: ensName } = useEnsName({ address })
  const [name, setName] = useState(ensName || (address as String)?.slice(2) || '')
  
  useEffect(() => {
    setName(ensName || (address as String)?.slice(2) || '')
  }, [ensName, address])
  
  const onConnect: (connector: Connector) => OnClick = (connector) => event => connect({ connector })
  const onDisconnect: OnClick = event => disconnect()

  const getInitials = (n: string) => n.length > 2 ? n.slice(0, 2) : n
  const displayAddress = (address: string): string => address && address.length > 4 ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : address

  if (isConnected) return (
    <NoSSR>
      <Menu>
        <MenuButton as={Button} variant='ghost'>
          <Flex alignItems="center">
            <Text mr={2}>{displayAddress(address as string)}</Text>
            <Avatar getInitials={getInitials} size='sm' name={name} src={ensAvatar ? ensAvatar : ''}/>
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