'use client';

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
  isPageLoading: boolean;
  setIsPageLoading: (v: boolean) => void;
}>({ isPageLoading: false, setIsPageLoading: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const usePageLoading = () => useContext(LoadingContext);
