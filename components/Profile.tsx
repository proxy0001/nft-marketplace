import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@chakra-ui/react'
export default function Profile() {
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  useEffect(() => setIsDefinitelyConnected(isConnected), [address, isConnected])

  if (isDefinitelyConnected)
    return (
      <div>
        Connected to {address}
        <Button variant='ghost' onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  return <Button variant='ghost' onClick={() => connect()}>Connect Wallet</Button>
}