import FleaMarketDetail from "./FleaMarketDetail";
import { getProducts } from "src/lib/api-product";
import classNames from "classnames";

import {
  BEST_PRODUCT_PAGE_SIZE,
  PRODUCT_PAGE_SIZE,
  PC,
} from "../constants/device";
import {
  ORDER_BY_RECENT,
  ORDER_BY_FAVORITE,
  ORDER_BY,
} from "../constants/sort";

export default async function ProductsPage() {
  const productListData = await getProducts({
    page: 1,
    pageSize: PRODUCT_PAGE_SIZE[PC],
    orderBy: ORDER_BY[ORDER_BY_RECENT],
  });

  const productList = productListData?.products || [];
  const productTotalCount = productListData?.totalCount || 0;

  const bestProductListData = await getProducts({
    page: 1,
    pageSize: BEST_PRODUCT_PAGE_SIZE[PC],
    orderBy: ORDER_BY[ORDER_BY_FAVORITE],
  });

  const bestProductList = bestProductListData?.products || [];

  const mainClass = classNames(
    "mt-header",
    "pt-[4rem]",
    "mx-auto",
    "w-pc-content",
    "ta:w-ta-content",
    "mo:w-mo-content"
  );

  return (
    <div className={mainClass}>
      <FleaMarketDetail
        bestProductList={bestProductList}
        productList={productList}
        productTotalCount={productTotalCount}
      />
    </div>
  );
}
