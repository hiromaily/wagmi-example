import { sepolia, mainnet, bsc, bscTestnet } from 'wagmi/chains'
import type { Chain } from 'wagmi/chains'

const developmentChains = [sepolia, bscTestnet]
const testnetChains = [sepolia, bscTestnet]
const mainnetChains = [mainnet, bsc]

export const getChains = (): Chain[] => {
  if (process.env.NODE_ENV === 'development') return developmentChains
  if (process.env.NODE_ENV === 'test') return testnetChains
  if (process.env.NODE_ENV === 'production') return mainnetChains

  return developmentChains
}