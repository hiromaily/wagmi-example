import { useAccount, useEnsName } from 'wagmi';

export function Account() {
  const { address } = useAccount(); // accessing account data and connection status
  const { data: ensName } = useEnsName({ address }); // fetching address for ENS name

  return (
    <div>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </div>
  );
}
