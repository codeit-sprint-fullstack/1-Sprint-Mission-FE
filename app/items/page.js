import FleaMarketDetail from "./FleaMarketDetail";
import { getProducts } from "@/lib/api-codeit-product";
import classNames from "classnames";

import { ORDER_BY_RECENT, ORDER_BY } from "../constants/sort";

export default async function FleaMarketPage() {
  const data = await getProducts({
    page: 1,
    pageSize: 10,
    orderBy: ORDER_BY[ORDER_BY_RECENT],
  });

  const { list = [], totalCount = 0 } = data;

  const mainClass = classNames(
    "mt-header",
    "pt-4rem",
    "mx-auto",
    "w-pc-content",
    "tablet:w-tablet-content",
    "mobile:w-mobile-content"
  );

  return (
    <div className={mainClass}>
      <FleaMarketDetail initList={list} initTotalCount={totalCount} />
    </div>
  );
}
