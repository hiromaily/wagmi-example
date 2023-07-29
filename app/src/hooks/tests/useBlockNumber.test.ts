import { renderHook, waitFor } from '@testing-library/react';
import 'cross-fetch/polyfill';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { useBlockNumber } from '@/hooks/useBlockNumber';
import { createTestConfig } from '@/libs/test-utils/wagmi';
import { noCacheConfig } from '@/libs/test-utils/swr-dom';

// npx jest ./src/hooks/tests/useBlockNumber.test.ts

const server = setupServer();
// const server = setupServer(
//   rest.post(
//     'https://rpc.ankr.com/eth',
//     (req, res, ctx) => {
//       const response = '0x10f991e'; //17799454

//       // get request body
//       req.json().then((body) => {
//         console.debug(body)
//       });

//       return res(
//         ctx.status(200),
//         //ctx.json({ jsonrpc: "2.0", id: 1, result: JSON.parse(response) }),
//         ctx.json({ jsonrpc: "2.0", id: 1, result: response }),
//       );
//     },
//   ),
// );

beforeAll(() => {
  server.listen();
  return createTestConfig();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useBlockNumber', () => {
  it('must return proper value', async () => {
    server.use(
      rest.post('https://rpc.ankr.com/eth', (req, res, ctx) => {
        const response = '0x10f991e'; //17799454

        // get request body
        req.json().then((body) => {
          console.debug(body);
        });
        return res(
          ctx.status(200),
          //ctx.json({ jsonrpc: "2.0", id: 1, result: JSON.parse(response) }),
          ctx.json({ jsonrpc: '2.0', id: 1, result: response }),
        );
      }),
    );

    const { result } = renderHook(() => useBlockNumber(), {
      wrapper: noCacheConfig,
    });

    await waitFor(
      () => {
        //expect(result.current?.blockNum).toBeGreaterThan(17799398);
        expect(result.current?.error).toBeFalsy();
        expect(result.current?.blockNum).toBe(17799454);
      },
      { timeout: 1000 },
    );
  });

  it('must handle error', async () => {
    server.use(
      rest.post('https://rpc.ankr.com/eth', (req, res, ctx) => {
        // get request body
        req.json().then((body) => {
          console.debug(body);
        });
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: `Something happened`,
          }),
        );
      }),
    );

    const { result } = renderHook(() => useBlockNumber(), {
      wrapper: noCacheConfig,
    });

    await waitFor(
      () => {
        //expect(result.current?.blockNum).toBeGreaterThan(17799398);
        expect(result.current?.error).not.toBeFalsy();
      },
      { timeout: 1000 },
    );
  });
});
