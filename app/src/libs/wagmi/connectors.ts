import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MockConnector } from 'wagmi/connectors/mock';
import { Wallet } from 'ethers';
import { config } from '../config';
import { getChains } from './chains';

export const connectors: (
  | InjectedConnector
  | CoinbaseWalletConnector
  | WalletConnectConnector
  | MockConnector
)[] = [
  new MetaMaskConnector({ chains: getChains() }),
  new CoinbaseWalletConnector({
    chains: getChains(),
    options: {
      appName: config.appName,
    },
  }),
  // FIXME: WebSocket connection
  // - https://github.com/wagmi-dev/wagmi/issues/1964
  new WalletConnectConnector({
    chains: getChains(),
    options: {
      projectId: process.env.NEXT_WALLET_CONNECT_PROJECTID ?? '',
      showQrModal: true,
    },
  }),
  new InjectedConnector({
    chains: getChains(),
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
];

// add mock
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   // create signer
//   const signer = Wallet.createRandom();

//   const mockConn = new MockConnector({
//     chains,
//     options: { signer: signer },
//   });
//   connectors.push(mockConn);
// }

// // client
// export const client = createClient({
//   autoConnect: false,
//   connectors: connectors,
//   provider,
//   //webSocketProvider,
// });
