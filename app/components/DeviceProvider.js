"use client";

import { createContext } from "react";
import useCheckWidth from "@/app/hooks/useCheckWidth";

export const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  return (
    <DeviceContext.Provider value={{ device: useCheckWidth() }}>
      {children}
    </DeviceContext.Provider>
  );
}
