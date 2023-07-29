import { fetchBalance } from '@wagmi/core';
import type { FetchBalanceResult } from '@wagmi/core';
import type { Address } from 'wagmi';

// Not used anywhere

// get balance from connected chain
export const getBalance = async (address: Address): Promise<FetchBalanceResult> => {
  const balance = await fetchBalance({
    address: address,
  });
  console.log(`balance: ${balance}`);
  return balance;
};
