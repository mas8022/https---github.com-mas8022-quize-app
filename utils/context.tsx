"use client";
import { createContext, useState } from "react";

const context = createContext();

import React from "react";

const ContextProvider = ({ children }: { children: any }) => {
  const [playersId, setPlayersId] = useState({});

  return (
    <context.Provider value={{ playersId, setPlayersId }}>
      {children}
    </context.Provider>
  );
};

export { ContextProvider, context };
