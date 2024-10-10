"use client";
import { createContext, useState, ReactNode } from "react";

interface ContextType {
  playersId: Record<string, any>;
  setPlayersId: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}
const context = createContext<ContextType | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [playersId, setPlayersId] = useState<Record<string, any>>({});

  return (
    <context.Provider value={{ playersId, setPlayersId }}>
      {children}
    </context.Provider>
  );
};

export { ContextProvider, context };
