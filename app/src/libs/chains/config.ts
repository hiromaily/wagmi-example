import { mainnet, goerli, bsc, bscTestnet, sepolia } from 'wagmi/chains';
import type { Address } from '@wagmi/core';
import type { Chain as TChain } from 'wagmi/chains';

// define only universal chain information
// this data structure is based on `https://chainid.network/chains.json`

export const ChainId = {
  ETHEREUM: 1,
  GOERLI: 5,
  BSC: 56,
  BSC_TESTNET: 97,
  SEPOLIA: 11155111,
} as const;
export type ChainId = (typeof ChainId)[keyof typeof ChainId];
// e.g. ChainId type accepts 1, 5, 56, 97, or 11155111.

export type ChainIdKey = keyof typeof ChainId;

// type guard
export const isChainIdKey = (arg: any): arg is ChainIdKey => {
  let result = false;
  Object.entries(ChainId).forEach(([key, value]) => {
    // chainName, chainValue
    if (key === arg) result = true;
  });
  return result;
};

export const ChainGroup = {
  EVM: 1,
  COSMOS: 2,
} as const;
export type ChainGroup = (typeof ChainGroup)[keyof typeof ChainGroup];
// e.g. ChainId type accepts 1, 2

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export const NetworkType = {
  Mainnet: 'mainnet',
  Testnet: 'testnet',
  Localnet: 'localnet',
} as const;
export type NetworkType = (typeof NetworkType)[keyof typeof NetworkType];

export interface Explorer {
  name: string;
  url: string;
  icon?: string;
}

export interface Chain {
  name: string;
  chain: string;
  shortName: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  explorers?: Explorer[];
  nativeCurrency: NativeCurrency;
  chainId: ChainId;
  chainGroup: ChainGroup;
  networkType?: NetworkType;
  wagmiChain?: TChain;
}

export interface ChainMap {
  [name: number]: Chain;
}

// WIP: add or modify as needed
export const chainMap: ChainMap = {
  [ChainId.ETHEREUM]: {
    name: 'Ethereum',
    chain: 'ETH',
    shortName: 'eth',
    rpc: [],
    faucets: [],
    explorers: [
      {
        name: 'etherscan',
        url: 'https://etherscan.io',
      },
    ],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: ChainId.ETHEREUM,
    chainGroup: ChainGroup.EVM,
    networkType: NetworkType.Mainnet,
    wagmiChain: mainnet,
  },
  [ChainId.GOERLI]: {
    name: 'Goerli',
    chain: 'ETH',
    shortName: 'gor',
    rpc: [],
    faucets: [],
    explorers: [
      {
        name: 'etherscan-goerli',
        url: 'https://goerli.etherscan.io',
      },
    ],
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: ChainId.GOERLI,
    chainGroup: ChainGroup.EVM,
    networkType: NetworkType.Testnet,
    wagmiChain: goerli,
  },
  [ChainId.BSC]: {
    name: 'Binance Smart Chain Mainnet',
    chain: 'BSC',
    shortName: 'bnb',
    rpc: [],
    faucets: [],
    explorers: [
      {
        name: 'bscscan',
        url: 'https://bscscan.com',
      },
    ],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    chainId: ChainId.BSC,
    chainGroup: ChainGroup.EVM,
    networkType: NetworkType.Mainnet,
    wagmiChain: bsc,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'Binance Smart Chain Testnet',
    chain: 'BSC',
    shortName: 'bnbt',
    rpc: [],
    faucets: [],
    explorers: [
      {
        name: 'bscscan-testnet',
        url: 'https://testnet.bscscan.com',
      },
    ],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    chainId: ChainId.BSC_TESTNET,
    chainGroup: ChainGroup.EVM,
    networkType: NetworkType.Testnet,
    wagmiChain: bscTestnet,
  },
  [ChainId.SEPOLIA]: {
    name: 'Sepolia',
    chain: 'ETH',
    shortName: 'sep',
    rpc: [],
    faucets: [],
    explorers: [
      {
        name: 'etherscan-sepolia',
        url: 'https://sepolia.etherscan.io',
      },
    ],
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: ChainId.SEPOLIA,
    chainGroup: ChainGroup.EVM,
    networkType: NetworkType.Testnet,
    wagmiChain: sepolia,
  },
};

export interface ChainTokenAddresses {
  [chain: string]: {
    [symbol: string]: Address;
  };
}

// example of type ChainTokenAddresses
// export const dummyTokens: ChainTokenAddresses = {
//   ETHEREUM: {
//     'USDT':'0xdAC17F958D2ee523a2206206994597C13D831ec7',
//     'USDC':'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
//   },
//   BSC: {
//     'USDT':'0x55d398326f99059fF775485246999027B3197955',
//     'USDC':'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
//   },
//   SEPOLIA: {
//     'USDT':'0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
//     'USDC':'0x8267cF9254734C6Eb452a7bb9AAF97B392258b21',
//   },
//   BSC_TESTNET: {
//     'USDT':'0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
//     'USDC':'0x64544969ed7EBf5f083679233325356EbE738930',
//   }
// } as const;
