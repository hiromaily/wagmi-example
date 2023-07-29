import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { jsonrpcFetcher } from '@/libs/fetcher';

// Example
// curl -X POST \
// -H "Content-Type: application/json" \
// --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' \
// "https://mainnet.infura.io/v3/b8d655803ca04f6890611b8a1e43f466"

export const useBlockNumber = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const url = 'https://rpc.ankr.com/eth';
  const method = 'eth_blockNumber';
  const params = [] as any;

  const { data, error } = useSWR(mounted ? [url, method, params] : null, ([url, method, params]) =>
    jsonrpcFetcher(url, method, params),
  );

  return {
    blockNum: error ? 0 : parseInt(data as string, 16),
    error: error,
  };
};
