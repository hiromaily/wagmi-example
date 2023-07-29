import { createConfig, configureChains, Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, goerli, bsc, bscTestnet, sepolia } from 'wagmi/chains';
import { mockConnector } from '@/libs/wagmi/connectors';

export const createTestConfig = () => {
  const { chains, publicClient } = configureChains([goerli], [publicProvider()]);

  const config = createConfig({
    autoConnect: true,
    connectors: [mockConnector],
    publicClient,
  });

  return config;
};
