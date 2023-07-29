import { version, exchanges, binance } from 'ccxt'

export const ccxtLog = async () => {
  console.log(version, Object.keys(exchanges));

  const symbols = ['ETH/USD', 'ETH/USDC', 'BNB/BUSD', 'BNB/USDC', 'BNB/ETH', 'BNB/USD']
  try {
    const exBinance = new binance()
    for (const symbol of symbols) {
      //console.log(`symbol: ${symbol}`)
      const ticker = await exBinance.fetchTicker(symbol)
      console.log(`[Binance] Current price of ${symbol}: ${ticker.last}`)
      //console.log(ticker)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
};
