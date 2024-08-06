// SellList.js
import React, { useState } from "react";
import { useFetchProducts } from "../common/useFetchProducts";
import Pagination from "../Pagination/Pagination";
import { formatPrice } from "../common/Util";
import { useDeviceType } from "../common/useDeviceType";
import { DesktopSearchBar } from "./DesktopSearchBar";
import { MobileSearchBar } from "./MobileSearchBar";
import "./SellList.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const deviceType = useDeviceType();

  console.log("SellList rendered");

  // useFetchProducts 훅을 사용하여 데이터 가져오기
  const { products, totalPages, loading } = useFetchProducts({
    orderBy: sortOrder,
    pageSize: deviceType === "mobile" ? 4 : deviceType === "tablet" ? 6 : 10,
    page: currentPage,
    keyword: searchKeyword,
  });

  // 정렬 기준 변경 핸들러
  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  // 검색 키워드 변경 핸들러
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 검색 실행 핸들러
  const handleKeywordSearch = () => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  // 검색 엔터키 이벤트 핸들러
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

      <div className="sell">
        <div className="sellProductList">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
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
                <p className="itemPrice">{`${formatPrice(item.price)} 원`}</p>
                <p className="itemFavoriteCnt">♡ {item.favoriteCount ?? "0"}</p>
              </div>
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default SellList;
