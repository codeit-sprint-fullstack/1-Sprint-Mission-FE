"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import classNames from "classnames";

import Loading from "../components/Loading";
import Search from "../components/Search";
import ProductPreview from "./ProductPreview";
import { getProducts } from "@/lib/api-codeit-product";

import {
  ORDER_TEXT,
  ORDER_BY,
  ORDER_BY_RECENT,
  ORDER_BY_FAVORITE,
} from "../constants/sort";
import { PAGE_SIZE } from "../constants/product";

import style from "./product-list.module.css";

export default function ProductList({ initList, initTotalCount }) {
  let device = useContext(deviceContext);
  let maxPageNum = Math.ceil(initTotalCount / PAGE_SIZE[device]);
  const [keyword, setKeyword] = useState("");
  let currentOrder = ORDER_BY_RECENT;
  let currentPage = 1;
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    orderBy: ORDER_BY[ORDER_BY_RECENT],
    keyword: null,
  });

  const {
    data = { list: initList, totalCount: initTotalCount },
    isLoading,
    error,
  } = useQuery(["products", params], () => getProducts(params), {
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading products</div>;

  const { list, totalCount } = data;

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
    "h-tool42",
    "text-left",
    "place-content-center",
    "text-xl",
    "leading-32",
    "font-bold",
    "mobile:order-1"
  );
  const searchFrameClass = classNames(
    "w-product-search",
    "h-tool42",
    "tablet:tablet-product-search",
    "mobile:mobile-product-search",
    // "order-2",
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
    style["btn-link-regist"]
  );
  const dropdownClass = classNames("mobile:order-4");
  const productListFrame = className(
    "mt-2.4rem",
    "grid-cols-5",
    "gap-y-4rem",
    "tablet:grid-cols-3",
    "tablet:gap-y-1.6rem",
    "mobile:grid-cols-2",
    "mobile:gap-y-0.8rem"
  );

  const sortByRecent = () => {
    setParams({
      page: 1,
      pageSize: PAGE_SIZE[device],
      orderBy: ORDER_BY[ORDER_BY_RECENT],
      keyword: keyword,
    });
    currentOrder = ORDER_BY_RECENT;
  };

  const sortByFavorite = () => {
    setParams({
      page: 1,
      pageSize: PAGE_SIZE[device],
      orderBy: ORDER_BY[ORDER_BY_FAVORITE],
      keyword: keyword,
    });
    currentOrder = ORDER_BY_FAVORITE;
  };

  const handleSubmit = (searchText) => {
    setKeyword(searchText);
    sortByRecent();
  };

  const handlePageMove = (pageNum) => {
    setParams({
      page: pageNum,
      pageSize: PAGE_SIZE[device],
      orderBy: ORDER_BY[currentOrder],
      keyword: keyword,
    });
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    setParams({
      page: currentPage,
      pageSize: PAGE_SIZE[device],
      orderBy: ORDER_BY[currentOrder],
      keyword: keyword,
    });
    maxPageNum = Math.ceil(initTotalCount / PAGE_SIZE[device]);
  }, [device]);

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
        {list.map((item) => (
          <ProductPreview
            productId={"?"}
            img={item.images[0]}
            title={item.name}
            price={item.price}
            favoriteCount={item.favoriteCount}
          />
        ))}
      </div>
      <div>
        <Pagination
          className="main__products-pagination"
          maxPageNum={maxPageNum}
          totalCount={totalCount}
          currentPage={currentPage}
          onClick={handlePageMove}
        />
      </div>
    </div>
  );
}
