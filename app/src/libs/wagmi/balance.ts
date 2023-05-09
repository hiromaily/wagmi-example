import { fetchBalance } from '@wagmi/core'
import type { FetchBalanceResult }  from '@wagmi/core'

// get balance from connected chain
export const getBalance = async (address: `0x${string}`): Promise<FetchBalanceResult> => {
  const balance = await fetchBalance({
    address: address,
  })
  console.log(`balance: ${balance}`)
  return balance
}
