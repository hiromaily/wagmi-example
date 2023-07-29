import { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import "cross-fetch/polyfill";
import { useBalance } from "@/hooks/useBalance";
import { createTestConfig } from "@/libs/test-utils/wagmi";
import { wagmiConfig } from "@/libs/test-utils/wagmi-dom";

// npx jest ./src/hooks/tests/useBalance.test.ts

beforeAll(() => {
  return createTestConfig();
});

describe("useBalance", () => {
  it("must return proper value", async () => {
    // FIXME
    // - Error: Uncaught [Error: `useConfig` must be used within `WagmiConfig`.
    //const { result } = renderHook(() => useBalance());
    const { result } = renderHook(() => useBalance(), {
      wrapper: wagmiConfig,
    });

    await waitFor(
      () => {
        expect(result.current).toEqual({"balance": "0 ETH"}); 
      },
      { timeout: 1000 },
    );
  });
});