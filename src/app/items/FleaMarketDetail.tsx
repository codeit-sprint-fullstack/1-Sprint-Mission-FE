"use client";

import { createContext } from "react";
import useCheckWidth from "../hooks/useCheckWidth";
import ProductList from "./ProductList";

import { FleaMarketDetailProps } from "src/types/product";

export const deviceContext = createContext<number | undefined>(undefined);

export default function FleaMarketDetail({
  initList,
  initTotalCount,
}: FleaMarketDetailProps) {
  const device = useCheckWidth();

  return (
    <deviceContext.Provider value={device}>
      <ProductList initList={initList} initTotalCount={initTotalCount} />
    </deviceContext.Provider>
  );
}
