import { useBlockNumber } from '../hooks/useBlockNumber'

export function RequestSample() {
  const { blockNum } = useBlockNumber() // accessing account data and connection status

  return (
    <div>
      blockNum: {blockNum ?? 0}
    </div>
  )
}
