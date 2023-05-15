import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { fetchBalance } from '@wagmi/core'

export const useBalance = () => {
  // evm address
  const { address } = useAccount() // accessing account data and connection status
  const { chain } = useNetwork()
  const [mounted, setMounted] = useState(false)
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    setMounted(true)
  }, [])

  // For EVM
  const getBalance = async (address: `0x${string}`) => {
    const balanceData = await fetchBalance({
      address: address,
    })
    //balanceData
    //{decimals: 18, formatted: '0.5', symbol: 'SEP', value: BigNumber}
    // balanceData.value.toString()

    setBalance(`${balanceData.formatted} ${balanceData.symbol}`)
  }
  
  useEffect(() => {
    if (address) getBalance(address)
  }, [address, chain?.id])

  return {
    balance: balance,
  }
}
