import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import { client } from '../libs/wagmi/wagmi'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const mockServer = () => import('../mocks/worker')
  mockServer()
}

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      {mounted && <Component {...pageProps} />}
    </WagmiConfig>
  )
}

export default App
