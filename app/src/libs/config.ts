export const ChainId = {
  ETHEREUM: 1,
  BSC: 56,
  BSC_TESTNET: 97,
  SEPOLIA: 11155111,
} as const
export type ChainId = (typeof ChainId)[keyof typeof ChainId]
export type ChainIdKey = keyof typeof ChainId;

// type guard
export const isChainIdKey = (arg: any): arg is ChainIdKey => {
  let result = false
  Object.entries(ChainId).forEach(
    ([key, value]) => { // chainName, chainValue
      if (key === arg) result=true
    }
  )
  return result
}

// Ethereum: 
// [USDT]: decimal: 6
// [USDC]: decimal: 6
// BSC:
// [USDT]: decimal: 18
// [USDC]: decimal: 18

export const config = {
  appName: "BridgeApp",
  tokens: {
    ETHEREUM: {
      'USDT':'0xdAC17F958D2ee523a2206206994597C13D831ec7',
      'USDC':'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    BSC: {
      'USDT':'0x55d398326f99059fF775485246999027B3197955',
      'USDC':'0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    SEPOLIA: {
      'USDT':'0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
      'USDC':'0x8267cF9254734C6Eb452a7bb9AAF97B392258b21',
    },
    BSC_TESTNET: {
      'USDT':'0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
      'USDC':'0x64544969ed7EBf5f083679233325356EbE738930',
    }
  },
}

export const getTokenFromAddr = (addr: string): string => {
  let result = ''
  Object.entries(config.tokens).forEach(
    ([key, value]) => { // chainName, chainValue
      Object.entries(config.tokens[key as ChainIdKey]).forEach(
        ([key2, value2]) => { // chainName, chainValue
            if (value2 == addr) {
              result = key2
              return
            }
        }
      )
      if (result) return            
    }
  )
  return result
}  