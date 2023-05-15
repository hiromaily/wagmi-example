import { Address, erc20ABI, readContracts } from '@wagmi/core'
import { ChainId, isChainIdKey, config, getTokenFromAddr } from '../config'

export type balanceArgs = { tokenAddr: string; userAddr: string; chainId: ChainId }[] 
export const makeBalanceArgs = (userAddr: Address): balanceArgs => {
  // get target network
  let args: balanceArgs = []
  Object.entries(ChainId).forEach(
    ([key, value]) => { // chainName, chainValue
      if (isChainIdKey(key)){
        args.push({ tokenAddr: config.tokens[key].USDC, userAddr: userAddr, chainId: value })
        args.push({ tokenAddr: config.tokens[key].USDT, userAddr: userAddr, chainId: value })  
      }
    }
  )
  return args
}

export const fetchBalances = async (
  args: balanceArgs
): Promise<Record<string, string>> => {
  //console.log('[DEBUG] fetchBalances')

  const balances = await readContracts({
    allowFailure: true,
    contracts: args.map(
      ({ tokenAddr, userAddr, chainId }) =>
        ({
          address: tokenAddr as Address,
          functionName: 'balanceOf',
          args: [userAddr as Address],
          chainId,
          abi: erc20ABI,
        } as const)
    ),
  }).then((values) => values.map((value, i) => ({ ...args[i], value })))

  return Object.fromEntries(
    balances
      .filter(({ value }) => value !== null && value.gt(0))
      .map((balance) => [`${balance.chainId}:${getTokenFromAddr(balance.tokenAddr)}`, balance.value.toString()])
  )
}

// export const fetchBalances = async (
//   args: balanceArgs
// ): Promise<Record<string, string>> => {
//   //console.log('[DEBUG] fetchBalances')

//   const balances = await readContracts({
//     allowFailure: true,
//     contracts: args.map(
//       ({ tokenAddr, userAddr, chainId }) =>
//         ({
//           address: tokenAddr as Address,
//           functionName: 'balanceOf',
//           args: [userAddr as Address],
//           chainId,
//           abi: erc20ABI,
//         } as const)
//     ),
//   }).then((values) => values.map((value, i) => ({ ...args[i], value })))

//   return Object.fromEntries(
//     balances
//       .filter(({ value }) => value !== null && value.gt(0))
//       .map((balance) => [`${balance.chainId}:${balance.tokenAddr}`, balance.value.toString()])
//   )
// }