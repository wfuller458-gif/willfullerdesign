'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Panel = 'about' | 'resume' | null;

interface PanelContextType {
  openPanel: Panel;
  setOpenPanel: (panel: Panel) => void;
}

const PanelContext = createContext<PanelContextType>({ openPanel: null, setOpenPanel: () => {} });

export function PanelProvider({ children }: { children: ReactNode }) {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  return (
    <PanelContext.Provider value={{ openPanel, setOpenPanel }}>
      {children}
    </PanelContext.Provider>
  );
}

export const usePanel = () => useContext(PanelContext);
