import { useBalance } from '../hooks/useBalance';

export function Balance() {
  const { balance } = useBalance(); // accessing account data and connection status

  return <div>balance: {balance ?? '0'}</div>;
}
