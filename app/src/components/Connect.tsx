import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { logger } from '../libs/logger/di-logger'

export function Connect() {
  const { connector, isConnected } = useAccount() // accessing account data and connection status
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect() // connecting to account with connectors
  const { disconnect } = useDisconnect() // disconnecting the connected account

  logger.log('test-test-test')

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}
