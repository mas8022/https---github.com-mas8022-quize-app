"use client";
import React, { createContext } from "react";

const context = createContext();

const ContextProvider = ({ children }) => {
  return <context.Provider value={{}}>{children}</context.Provider>;
};

export { ContextProvider, context };
