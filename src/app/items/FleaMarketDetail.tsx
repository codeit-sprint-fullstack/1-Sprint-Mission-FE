"use client";

import ProductList from "./ProductList";

import { ProductData } from "src/types/product";

export interface FleaMarketDetailProps {
  bestProductList: ProductData[];
  productList: ProductData[];
  productTotalCount: number;
}

export default function FleaMarketDetail({
  bestProductList,
  productList,
  productTotalCount,
}: FleaMarketDetailProps) {
  return (
    <>
      <ProductList
        productList={productList}
        productTotalCount={productTotalCount}
      />
    </>
  );
}
