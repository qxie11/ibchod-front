'use client';

import { Provider } from 'react-redux';

import { useRef } from 'react';

import { AppStore, makeStore } from '../shared/lib/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
