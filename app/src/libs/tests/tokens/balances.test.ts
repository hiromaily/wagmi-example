/**
 * @jest-environment node
 */

import type { Address } from '@wagmi/core';
import 'cross-fetch/polyfill';
import { makeBalanceArgs, fetchBalances, getTokenFromAddr } from '@/libs/tokens/balances';
import type { ChainTokenAddresses } from '@/libs/chains/config';
import { createTestConfig } from '@/libs/test-utils/wagmi';

const tokenAddrs: ChainTokenAddresses = {
  ETHEREUM: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  BSC: {
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  },
  SEPOLIA: {
    USDT: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
    USDC: '0x8267cF9254734C6Eb452a7bb9AAF97B392258b21',
  },
  BSC_TESTNET: {
    USDT: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
    USDC: '0x64544969ed7EBf5f083679233325356EbE738930',
  },
} as const;

const userAddr = '0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1';

beforeAll(() => {
  return createTestConfig();
});

describe('makeBalanceArgs', () => {
  it('makes sure response is valid', () => {
    // const expected = `
    // [{
    //   "chainId": 1,
    //   "tokenAddr": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 1,
    //   "tokenAddr": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 56,
    //   "tokenAddr": "0x55d398326f99059fF775485246999027B3197955",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 56,
    //   "tokenAddr": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 97,
    //   "tokenAddr": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 97,
    //   "tokenAddr": "0x64544969ed7EBf5f083679233325356EbE738930",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 11155111,
    //   "tokenAddr": "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }, {
    //   "chainId": 11155111,
    //   "tokenAddr": "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21",
    //   "userAddr": "0xc1f3a7613c70BBf1Bd8C4924192Bd75451fE0dd1"
    // }]
    // `;

    const result = makeBalanceArgs(userAddr, tokenAddrs);
    expect(result.length).toBe(8);
    for (const item of result) {
      expect(item.userAddr).toBe(userAddr);
    }

    const ethAddrs = result.filter((item) => item.chainId === 1);
    expect(ethAddrs.length).toBe(2);

    const {
      ETHEREUM: { USDT: usdtAddr, USDC: usdcAddr },
    } = tokenAddrs;
    expect(ethAddrs[0].tokenAddr).toBe(usdtAddr);
    expect(ethAddrs[1].tokenAddr).toBe(usdcAddr);
  });

  it('is valid even if passing empty parameter ChainTokenAddresses', () => {
    const result = makeBalanceArgs(userAddr, {});
    expect(result.length).toBe(0);
  });
});

describe('getTokenFromAddr', () => {
  it('makes sure response is valid', () => {
    const tableTest: Record<Address, string> = {};
    Object.values(tokenAddrs).forEach((chain) => {
      Object.entries(chain).forEach(([token, address]) => {
        tableTest[address] = token;
      });
    });
    // const tableTest: Record<string, string> = {
    //   "0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT",
    //   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",
    //   "0x55d398326f99059fF775485246999027B3197955": "USDT",
    //   "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": "USDC",
    //   "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06": "USDT",
    //   "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21": "USDC",
    //   "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd": "USDT",
    //   "0x64544969ed7EBf5f083679233325356EbE738930": "USDC",
    // };

    for (const [addr, expectedTokenName] of Object.entries(tableTest)) {
      const tokenName = getTokenFromAddr(addr as Address, tokenAddrs);
      expect(tokenName).toBe(expectedTokenName);
    }
  });

  it("makes sure response is empty when passing '0x' as token address", () => {
    const tokenName = getTokenFromAddr('0x', tokenAddrs);
    expect(tokenName).toBe('');
  });

  it('makes sure response is empty when passing {} as token addresses', () => {
    const {
      ETHEREUM: { USDC: ethUsdcAddr },
    } = tokenAddrs;

    const tokenName = getTokenFromAddr(ethUsdcAddr, {});
    expect(tokenName).toBe('');
  });
});

// TODO: add test assertion after mock is ready
// all network must be configured in createTestConfig() for tokenAddrs
describe('fetchBalances', () => {
  it('makes sure response is valid', async () => {
    const args = makeBalanceArgs(userAddr, tokenAddrs);
    try {
      const result = await fetchBalances(args, tokenAddrs);
      console.log(result);
    } catch (e) {
      // instead of missing fail()
      expect(e).toBeUndefined();
    }
  });
});
