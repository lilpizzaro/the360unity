'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Import DisableDevTools with no SSR to ensure it only runs on the client
const DisableDevTools = dynamic(() => import("@/components/DisableDevTools"), { ssr: false });

export default function DevToolsProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <DisableDevTools />
      {children}
    </>
  );
} 