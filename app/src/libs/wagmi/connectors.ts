import type { Address } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MockConnector } from 'wagmi/connectors/mock';
import { foundry, goerli } from 'wagmi/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import type { WalletClient } from 'viem';
import type { Connector } from 'wagmi/connectors';

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

export const getMockWalletClient = () => {
  /*
   * @example
   * // Local Account
   * import { createWalletClient, custom } from 'viem'
   * import { privateKeyToAccount } from 'viem/accounts'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createWalletClient({
   *   account: privateKeyToAccount('0x…')
   *   chain: mainnet,
   *   transport: http(),
   * })
   */
  const account = privateKeyToAccount(
    (process.env.NEXT_MOCK_PRIVATE_KEY ?? generatePrivateKey()) as Address,
  );

  return createWalletClient({
    transport: http(),
    //transport: http(foundry.rpcUrls.default.http[0]),
    chain: goerli, // default chain
    name: 'Mock Wallet',
    account: account,
    //pollingInterval: 100,
  });
};

export const mockConnector: MockConnector = new MockConnector({
  options: {
    walletClient: getMockWalletClient(),
    chainId: goerli.id,
    flags: {
      isAuthorized: true,
    },
  },
});

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
