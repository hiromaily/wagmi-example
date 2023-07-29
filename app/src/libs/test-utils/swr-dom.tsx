import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const noCacheConfig = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);
