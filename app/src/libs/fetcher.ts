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
  console.debug(`url: ${url}, method: ${method}, params: ${params}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1,
    }),
  });

  const data = await response.json();
  //console.debug(data)

  // There must be 2 type errors
  // - HTTP Error by 500
  // - json response includes error
  if (!response.ok) {
    throw new Error(`Error code: ${response.status}: ${data.errorMessage}`);
  }

  if ('error' in data) {
    const error: ErrorResponse = data.error;
    throw new Error(`Error ${error.code}: ${error.message}`);
  }

  return data.result;
};

export { jsonrpcFetcher };
