import { useState, useEffect } from 'react'
import { Address, useAccount } from 'wagmi'

import { makeBalanceArgs, fetchBalances } from '../libs/wagmi/balances'

export const useTokenList = () => {
  const { address } = useAccount() // accessing account data and connection status
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // For EVM
  const getBalances = async (address: Address) => {
    console.log('[DEBUG] getBalances in useTokenList')
    const args = makeBalanceArgs(address)
    const result = await fetchBalances(args)
    console.log(result)
    //{1:USDT: '12886671', 56:USDT: '5140477543190855967'}
    // 1:USDT: 12.886671 USDT, 12.89.USD
    // 2: 5.14047 USDT, 0.3001 BNB

    // const token = await fetchToken({
    //   address: address,
    // })
    //tokenData
    // console.log(token)
    // {
    //   address: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    //   decimals: 6,
    //   name: "Test Tether USD",
    //   symbol: "USDT",
    //   totalSupply: {formatted: '2101101.008007039698509161', value: BigNumber}
    // }    

    //setToken(`${token.formatted} ${token.symbol}`)
  }
  
  useEffect(() => {
    if (address) {
      getBalances(address)
      // Object.entries(ethTokenAddresses).forEach(
      //   ([key, value]) => {
      //     console.log(key, value)
      //     getToken(value as `0x${string}`)
      //   }
      // );

      // for (const addr of ethTokenAddresses) {
      //   getToken(addr as `0x${string}`)
      // }
    }  
  }, [address])

  return {
    tokens: null,
  }
}