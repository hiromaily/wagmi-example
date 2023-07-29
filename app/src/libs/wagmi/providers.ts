import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

export const getProviders = (): any[] => {
  let providers = [publicProvider()];
  if (process.env.NEXT_PUBLIC_INFRA_API_KEY) {
    // set Infra Provider
    providers.push(infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFRA_API_KEY }));
  }
  console.log(`[DEBUG] providers.length is ${providers.length}`);
  return providers;
};
