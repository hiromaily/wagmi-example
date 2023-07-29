import { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { createTestConfig } from './wagmi'

const config = createTestConfig()

export const wagmiConfig = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
