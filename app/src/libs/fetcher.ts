interface JSONRPCBody {
  jsonrpc: string;
  method: string;
  params: any;
  id: number;
}

interface ErrorResponse {
  code: number;
  message: string;
  data?: any;
}

// return value must be casted as proper type
const jsonrpcFetcher = async (url: string, method: string, params: any): Promise<any> => {
  console.log(url)
  console.log(method)
  console.log(params)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1
    })
  });

  const data = await response.json();

  if ('error' in data) {
    const error: ErrorResponse = data.error;
    throw new Error(`Error ${error.code}: ${error.message}`);
  }

  return data.result
}

export { jsonrpcFetcher }
