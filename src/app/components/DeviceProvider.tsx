"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  PC,
  ta,
  mo,
  BEST_PRODUCT_PAGE_SIZE,
  PRODUCT_PAGE_SIZE,
  BEST_POST_PAGE_SIZE,
  POST_PAGE_SIZE,
  PC_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  MOBILE_MIN_WIDTH,
} from "../constants/device";

interface DeviceContextType {
  bestProductPageSize: number;
  productPageSize: number;
  bestPostPageSize: number;
  postPageSize: number;
}

const DeviceContext = createContext<DeviceContextType>({
  bestProductPageSize: BEST_PRODUCT_PAGE_SIZE[PC],
  productPageSize: PRODUCT_PAGE_SIZE[PC],
  bestPostPageSize: BEST_POST_PAGE_SIZE[PC],
  postPageSize: POST_PAGE_SIZE[PC],
});

function setPageSizes(device: number) {
  return {
    bestProductPageSize: BEST_PRODUCT_PAGE_SIZE[device],
    productPageSize: PRODUCT_PAGE_SIZE[device],
    bestPostPageSize: BEST_POST_PAGE_SIZE[device],
    postPageSize: POST_PAGE_SIZE[device],
  };
}

function getPageSizes(width: number) {
  if (PC_MIN_WIDTH <= width) {
    return setPageSizes(PC);
  }

  if (TABLET_MIN_WIDTH <= width) {
    return setPageSizes(ta);
  }

  if (MOBILE_MIN_WIDTH <= width) {
    return setPageSizes(mo);
  }

  return setPageSizes(PC);
}

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [pageSizes, setPageSizes] = useState<DeviceContextType>(
    getPageSizes(typeof window !== "undefined" ? window.innerWidth : 0)
  );

  useEffect(() => {
    const handleResize = () => {
      setPageSizes(getPageSizes(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DeviceContext.Provider value={pageSizes}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = () => useContext(DeviceContext);
