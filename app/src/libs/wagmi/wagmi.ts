import { configureChains, createClient } from 'wagmi'
//import { goerli, mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MockConnector } from 'wagmi/connectors/mock'
import { Wallet } from 'ethers'

import { getChains } from './chains'
import { getProviders } from './providers'
import { config } from '../config'


// would be `development` when running by `npm run dev`
console.log(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`[DEBUG] INFRA_API_KEY: ${process.env.NEXT_PUBLIC_INFRA_API_KEY}`)

const { chains, provider, webSocketProvider } = configureChains(
  getChains(),
  getProviders(),
)

// TODO: How to handle
// WalletConnect
// - display QR CODE
// - display desktop (choose your preferred wallet)
// Coinbase Wallet
// - move to coinbase site

// TODO: how to disable websocket?
// https://github.com/pancakeswap/pancake-frontend/blob/912eee4ceec53ebba03edf4acbd0276f29095b96/apps/web/src/utils/wagmi.ts#L7
// https://github.com/sushiswap/sushiswap/blob/13d5644ed4501ad45b0b4771f21555583e5238c6/jobs/pool/src/lib/wagmi.ts#L1

// TODO: how to add balance to mock?

let connectors: (InjectedConnector | CoinbaseWalletConnector | WalletConnectConnector | MockConnector)[] = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: config.appName,
    },
  }),
  // FIXME: WebSocket connection
  // - https://github.com/wagmi-dev/wagmi/issues/1964
  new WalletConnectConnector({
    chains,
    options: {
      projectId: process.env.NEXT_WALLET_CONNECT_PROJECTID ?? '',
      showQrModal: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
];

// add mock
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  // create signer
  const signer = Wallet.createRandom()

  const mockConn = new MockConnector({
    chains,
    options: {signer: signer},
  })
  connectors.push(mockConn)
}

// client
export const client = createClient({
  autoConnect: false,
  connectors: connectors,
  provider,
  //webSocketProvider,
})
