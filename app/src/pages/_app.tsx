// imports for DI on top of import
import "reflect-metadata"

import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import {container} from 'tsyringe'

import { client } from '../libs/wagmi/wagmi'
// imports for DI
import {ConsoleLoggerImpl, OutsideLoggerImpl} from '../libs/logger/logger'
import { DISample } from '../libs/di-sample/something'

// msw settings for mock server
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const mockServer = () => import('../mocks/worker')
  mockServer()
}

// DI settings, (set implementation here)
container.register('LoggerInterface', {
  useClass: ConsoleLoggerImpl
})
// - Get instance (set class which use dependency here)
const diApp = container.resolve(DISample)
diApp.doSomething('Hello, Something')
diApp.doSomethingWring('Oops, Something Error')

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
