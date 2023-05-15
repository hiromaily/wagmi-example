import { useTokenList } from '../hooks/useTokenList'

export function TokenList() {
  const { tokens } = useTokenList()

  return (
    <div>
      tokens: {tokens ?? 0}
    </div>
  )
}
