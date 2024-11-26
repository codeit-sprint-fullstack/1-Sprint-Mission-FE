"use client";

import BestProductList from "./BestProductList";
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
      <BestProductList bestProductList={bestProductList} />
      <ProductList
        productList={productList}
        productTotalCount={productTotalCount}
      />
    </>
  );
}
