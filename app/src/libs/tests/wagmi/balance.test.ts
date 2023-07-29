/**
 * @jest-environment node
 */

import type { Address } from '@wagmi/core';
import 'cross-fetch/polyfill';
import { getBalance } from '@/libs/wagmi/balance';
import { createTestConfig } from '@/libs/test-utils/wagmi';

const userAddr = '0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1';

beforeAll(() => {
  return createTestConfig();
});

describe('fetchBalances', () => {
  it('makes sure response is valid', async () => {
    const result = await getBalance(userAddr);
    console.log(result);
  });
});
