'use client';

import { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  animateIn: boolean;
  triggerAnimateIn: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  animateIn: false,
  triggerAnimateIn: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [animateIn, setAnimateIn] = useState(false);
  return (
    <LoadingContext.Provider value={{ animateIn, triggerAnimateIn: () => setAnimateIn(true) }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
