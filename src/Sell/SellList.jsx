// SellList.js
import React, { useState, useEffect } from "react";
import { useFetchProducts } from "../Product/useFetchProducts";
import { Shift } from "../Pagination/Pagination";
import { formatPrice } from "../common/Util";
import { useDeviceType } from "../common/usePageSize";
import { DesktopSearchBar } from "./DesktopSearchBar";
import { MobileSearchBar } from "./MobileSearchBar";
import "./SellList.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const deviceType = useDeviceType();

  const { products, totalPages } = useFetchProducts({
    orderBy: sortOrder,
    pageSize: deviceType === "mobile" ? 4 : deviceType === "tablet" ? 6 : 10,
    page: currentPage,
    keyword: searchKeyword,
  });

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeywordSearch = () => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleKeywordSearch();
    }
  };

  return (
    <>
      {deviceType === "mobile" ? (
        <MobileSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      ) : (
        <DesktopSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}

      {/* 판매 중인 상품 리스트 */}
      <div className="sell">
        <div className="sellProductList">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((item) => (
              <div key={item.id} className="sellProductItem">
                <img
                  className="sellProduct"
                  src={item?.images?.[0] ?? "No image"}
                  alt={item.name ?? "Product image"}
                />
                <p className="itemName">{item.name ?? "No name"}</p>
                <p className="itemPrice">
                  {item.price ? `${formatPrice(item.price)} 원` : "No price"}
                </p>
                <p className="itemFavoriteCnt">♡ {item.favoriteCount ?? "0"}</p>
              </div>
            ))
          )}
        </div>
        <Shift
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default SellList;
