import { configureChains, createConfig } from 'wagmi';
//import { goerli, mainnet } from 'wagmi/chains'

import { getChains } from './chains';
import { getProviders } from './providers';

// would be `development` when running by `npm run dev`
console.log(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`[DEBUG] INFRA_API_KEY: ${process.env.NEXT_PUBLIC_INFRA_API_KEY}`);

const { chains, publicClient } = configureChains(getChains(), getProviders());

export const wagmiConfig = createConfig({
  publicClient,
});
