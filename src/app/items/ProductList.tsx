"use client";

import { useState, useEffect, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import classNames from "classnames";

import Loading from "../components/Loading";
import Search from "../components/Search";
import ProductPreview from "./ProductPreview";
import { getProducts } from "src/lib/api-product";
import { useDeviceContext } from "../components/DeviceProvider";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "../components/DropDown";
import Pagination from "../components/Pagination";

import {
  ORDER_TEXT,
  ORDER_BY,
  ORDER_BY_RECENT,
  ORDER_BY_FAVORITE,
} from "../constants/sort";
import { PAGE_SIZE } from "../constants/product";
import { PC } from "../constants/device";
import { ProductListProps } from "src/types/product";
import { SearchParamState } from "src/types/param";
import { ProductData, ProductListData } from "src/types/product";

export default function ProductList({
  initList,
  initTotalCount,
}: ProductListProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [params, setParams] = useState<SearchParamState>({
    page: 1,
    pageSize: PAGE_SIZE[PC],
    orderBy: ORDER_BY[ORDER_BY_RECENT],
    keyword: null,
  });

  const [currentOrder, setCurrentOrder] = useState<number>(ORDER_BY_RECENT);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    bestProductPageSize,
    productPageSize,
    bestPostPageSize,
    postPageSize,
  } = useDeviceContext();

  const maxPageNum = useMemo(() => {
    return Math.ceil(initTotalCount / productPageSize);
  }, [initTotalCount]);

  const queryClient = useQueryClient();

  const {
    data = { products: initList, totalCount: initTotalCount },
    isLoading,
    error,
  } = useQuery<ProductListData, Error>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: () => {
      return queryClient.getQueryData(["products", params]);
    },
    staleTime: 5000,
  });

  const list = data?.products ?? initList;
  const totalCount = data?.totalCount ?? initTotalCount;

  const productListClass = classNames("mt-4rem", "mobile:mt-2.4rem");
  const productToolsClass = classNames(
    "flex",
    "flex-row",
    "h-tool42",
    "gap-1.2rem",
    "mobile:h-8.4rem",
    "mobile:flex-wrap",
    "mobile:justify-between"
  );
  const productToolsLabelClass = classNames(
    "mr-search-label",
    "h-tool42",
    "text-left",
    "place-content-center",
    "text-xl",
    "leading-32",
    "font-bold",
    "text-nowrap",
    "tablet:mr-tablet-search-label",
    "mobile:mr-0",
    "mobile:order-1"
  );
  const searchFrameClass = classNames(
    "w-product-search",
    "h-tool42",
    "ml-full",
    "tablet:w-tablet-product-search",
    "mobile:w-mobile-product-search",
    "mobile:order-3"
  );
  const btnLinkRegistFrameClass = classNames(
    "w-btn-link-regist",
    "h-tool42",
    "mobile:order-2"
  );
  const btnLinkRegistClass = classNames(
    "w-btn-link-regist",
    "h-tool42",
    "bg-btn-link-regist"
  );
  const dropdownClass = classNames("mobile:order-4");
  const productListFrame = classNames(
    "mt-2.4rem",
    "grid",
    "grid-cols-5",
    "gap-x-2.4rem",
    "gap-y-4rem",
    "tablet:grid-cols-3",
    "tablet:gap-y-1.6rem",
    "mobile:grid-cols-2",
    "mobile:gap-y-0.8rem"
  );

  const sortByRecent = () => {
    setParams({
      page: 1,
      pageSize: productPageSize,
      orderBy: ORDER_BY[ORDER_BY_RECENT],
      keyword: keyword,
    });
    setCurrentOrder(ORDER_BY_RECENT);
  };

  const sortByFavorite = () => {
    setParams({
      page: 1,
      pageSize: productPageSize,
      orderBy: ORDER_BY[ORDER_BY_FAVORITE],
      keyword: keyword,
    });
    setCurrentOrder(ORDER_BY_FAVORITE);
  };

  const handleSubmit = (searchText: string) => {
    setKeyword(searchText);
    sortByRecent();
  };

  const handlePageMove = (pageNum: number) => {
    setParams({
      page: pageNum,
      pageSize: productPageSize,
      orderBy: ORDER_BY[currentOrder],
      keyword: keyword,
    });
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      pageSize: productPageSize,
    }));
  }, []);

  console.log("list : ", list);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading products</div>;

  return (
    <div className={productListClass}>
      <div className={productToolsClass}>
        <p className={productToolsLabelClass}>판매 중인 상품</p>
        <div className={searchFrameClass}>
          <Search
            placeholder="검색할 상품을 입력해주세요"
            onSearch={handleSubmit}
          />
        </div>
        <Link className={btnLinkRegistFrameClass} href="/registration">
          <button className={btnLinkRegistClass} />
        </Link>
        {
          <Dropdown dropdwonClass={dropdownClass}>
            <DropdownToggle>{ORDER_TEXT[currentOrder]}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={sortByRecent}>
                {ORDER_TEXT[ORDER_BY_RECENT]}
              </DropdownItem>
              <DropdownItem onClick={sortByFavorite}>
                {ORDER_TEXT[ORDER_BY_FAVORITE]}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
      </div>
      <div className={productListFrame}>
        {list.map((item, index) => (
          <ProductPreview
            key={`${item.id}-${index}`}
            productId={item.id}
            img={item.images[0]}
            name={item.name}
            price={item.price}
            favoriteCount={item.favoriteCount}
          />
        ))}
      </div>
      <div>
        <Pagination
          className="main__products-pagination"
          maxPageNum={maxPageNum}
          currentPage={currentPage}
          onClick={handlePageMove}
        />
      </div>
    </div>
  );
}
