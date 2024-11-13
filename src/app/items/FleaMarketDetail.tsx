"use client";

import ProductList from "./ProductList";

import { FleaMarketDetailProps } from "src/types/product";

export default function FleaMarketDetail({
  initList,
  initTotalCount,
}: FleaMarketDetailProps) {
  return (
    <>
      <ProductList initList={initList} initTotalCount={initTotalCount} />
    </>
  );
}
