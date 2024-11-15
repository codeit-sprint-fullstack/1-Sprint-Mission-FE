"use client";

import { useState, useEffect, useMemo } from "react";
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
import { SearchParamState } from "src/types/param";
import { ProductData } from "src/types/product";

interface ProductListData {
  totalCount: number;
  products: ProductData[];
}

interface ProductListProps {
  productList: ProductData[];
  productTotalCount: number;
}

export default function ProductList({
  productList,
  productTotalCount,
}: ProductListProps) {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [params, setParams] = useState<SearchParamState>({
    page: 1,
    pageSize: PAGE_SIZE[PC],
    orderBy: ORDER_BY[ORDER_BY_RECENT],
    keyword: undefined,
  });
  const [currentOrder, setCurrentOrder] = useState<number>(ORDER_BY_RECENT);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { productPageSize } = useDeviceContext();

  const queryClient = useQueryClient();

  const {
    data = { products: productList, totalCount: productTotalCount },
    isLoading,
    error,
  } = useQuery<ProductListData, Error>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: () => {
      return queryClient.getQueryData(["products", params]);
    },
    staleTime: 5000, // 임시 5초 설정. 추후 상수로 관리 예정
  });

  const list = data?.products ?? productList;

  const maxPageNum = useMemo(() => {
    return Math.ceil((data?.totalCount ?? productTotalCount) / productPageSize);
  }, [data?.totalCount, productTotalCount, productPageSize]);

  const productListClass = classNames("mt-[4rem]", "mo:mt-[2.4rem]");
  const productToolsClass = classNames(
    "flex",
    "flex-row",
    "h-[4.2rem]",
    "gap-[1.2rem]",
    "mo:h-[8.4rem]",
    "mo:flex-wrap",
    "mo:justify-between"
  );
  const productToolsLabelClass = classNames(
    "mr-[46.3rem]",
    "h-full",
    "text-left",
    "place-content-center",
    "text-xl",
    "leading-[3.2rem]",
    "font-bold",
    "text-nowrap",
    "ta:mr-[3.8rem]",
    "mo:mr-0",
    "mo:order-1"
  );
  const searchFrameClass = classNames(
    "w-[32.5rem]",
    "h-full",
    "ml-full",
    "ta:w-[24.2rem]",
    "mo:w-[28.8rem]",
    "mo:order-3"
  );
  const btnLinkRegistFrameClass = classNames(
    "w-[13.3rem]",
    "h-[4.2rem]",
    "mo:order-2"
  );
  const btnLinkRegistClass = classNames(
    "w-[13.3rem]",
    "h-full",
    "bg-btn-link-regist"
  );
  const dropdownClass = classNames("mo:order-4");
  const productListFrame = classNames(
    "mt-[2.4rem]",
    "grid",
    "grid-cols-5",
    "gap-x-[2.4rem]",
    "gap-y-[4rem]",
    "ta:grid-cols-3",
    "ta:gap-y-[1.6rem]",
    "mo:grid-cols-2",
    "mo:gap-y-[0.8rem]"
  );
  const paginationBarClass = classNames(
    "mb-[14rem]",
    "ta:mb-[16.5rem]",
    "mo:mb-[13.5rem]"
  );

  const sortByRecent = () => {
    setParams({
      page: 1,
      pageSize: productPageSize,
      orderBy: ORDER_BY[ORDER_BY_RECENT],
      keyword: keyword,
    });
    setCurrentOrder(ORDER_BY_RECENT);
    setCurrentPage(1);
  };

  const sortByFavorite = () => {
    setParams({
      page: 1,
      pageSize: productPageSize,
      orderBy: ORDER_BY[ORDER_BY_FAVORITE],
      keyword: keyword,
    });
    setCurrentOrder(ORDER_BY_FAVORITE);
    setCurrentPage(1);
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
      <div className={paginationBarClass}>
        <Pagination
          maxPageNum={maxPageNum}
          currentPage={currentPage}
          onClick={handlePageMove}
        />
      </div>
    </div>
  );
}
