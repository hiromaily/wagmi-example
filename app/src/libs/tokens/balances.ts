import { Address, erc20ABI, readContracts } from '@wagmi/core';
import { ChainId, isChainIdKey, ChainTokenAddresses } from '@/libs/chains/config';
import type { ChainIdKey } from '@/libs/chains/config';

export type balanceArgs = {
  tokenAddr: string;
  userAddr: string;
  chainId: ChainId;
}[];

export const makeBalanceArgs = (
  userAddr: Address,
  tokenAddresses: ChainTokenAddresses,
): balanceArgs => {
  let args: balanceArgs = [];
  Object.entries(ChainId).forEach(([chainName, chainId]) => {
    if (isChainIdKey(chainName) && tokenAddresses.hasOwnProperty(chainName)) {
      for (const tokenName of Object.keys(tokenAddresses[chainName])) {
        args.push({
          tokenAddr: tokenAddresses[chainName][tokenName],
          userAddr: userAddr,
          chainId: chainId,
        });
      }
    }
  });
  return args;
};

// Return value would be
// {
//   '1:USDT': '12886671',
//   '1:USDC': '1391',
//   '56:USDT': '140477543190855967'
// }
export const fetchBalances = async (
  args: balanceArgs,
  tokenAddresses: ChainTokenAddresses,
): Promise<Record<string, string>> => {
  console.debug('[DEBUG] fetchBalances');

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
        }) as const,
    ),
  }).then((values) => values.map((value, i) => ({ ...args[i], value })));
  // Note: when error happened, error is set in value as the following
  // [
  //   {
  //     tokenAddr: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //     userAddr: '0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1',
  //     chainId: 1,
  //     value: {
  //       error: Error: No wagmi config found. Ensure you have set up a config: https://wagmi.sh/react/config
  // When succeeded, response would be
  // [
  //   {
  //     tokenAddr: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //     userAddr: '0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1',
  //     chainId: 1,
  //     value: { result: 12886671n, status: 'success' }
  //   },

  // Debug code for error
  console.debug('[DEBUG] balances after calling readContracts');
  //console.debug(balances);
  balances.forEach((balance) => {
    if (balance.value && balance.value.error) {
      console.debug(balance.value.error);
      throw balance.value.error
    }
  });

  return Object.fromEntries(
    balances
      .filter(({ value }) => value?.result !== undefined && value.result > 0)
      .map((balance) => [
        `${balance.chainId}:${getTokenFromAddr(balance.tokenAddr as Address, tokenAddresses)}`,
        balance.value.result?.toString() ?? '0',
      ]),
  );
};

export const getTokenFromAddr = (addr: Address, tokenAddresses: ChainTokenAddresses): string => {
  for (const chain of Object.keys(tokenAddresses) as ChainIdKey[]) {
    const tokens = tokenAddresses[chain];
    for (const symbol of Object.keys(tokens)) {
      const tokenAddress = tokens[symbol];
      if (tokenAddress === addr) {
        return symbol;
      }
    }
  }
  return '';
};
