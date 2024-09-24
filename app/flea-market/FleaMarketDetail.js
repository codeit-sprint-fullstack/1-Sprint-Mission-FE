"use client";

import useCheckWidth from "../hooks/useCheckWidth";
import ProductList from "./ProductList";

export const deviceContext = createContext();

export default function FleaMarketDetail({ initList, initTotalCount }) {
  const [device] = useCheckWidth();

  return (
    <deviceContext.Provider value={device}>
      <ProductList initList={initList} initTotalCount={initList} />
    </deviceContext.Provider>
  );
}
