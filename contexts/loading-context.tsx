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

let _animateIn = false;

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [animateIn, setAnimateIn] = useState(_animateIn);
  return (
    <LoadingContext.Provider value={{ animateIn, triggerAnimateIn: () => { _animateIn = true; setAnimateIn(true); } }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
