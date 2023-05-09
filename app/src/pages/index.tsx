import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher, Balance, RequestSample } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
          <Balance />
          <RequestSample />
        </>
      )}
    </>
  )
}

export default Page
