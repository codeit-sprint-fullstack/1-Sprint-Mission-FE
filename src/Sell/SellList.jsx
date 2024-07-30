import { useState, useEffect } from "react";
import { useFetchProducts } from "../Product/useFetchProducts";
import { Shift } from "../Pagination/Pagination";
import CustomDropdown from "./CustomDropdown";
import "./SellList.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  function getPageSize(width) {
    if (width < 743) return 4; // Mobile
    if (width < 1199) return 6; // Tablet
    return 10; // Desktop
  }

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 파라미터 기준으로 API 데이터 가져오기
  const { products, loading, totalPages } = useFetchProducts({
    orderBy: sortOrder,
    page: currentPage,
    pageSize: pageSize,
    keyword: searchKeyword,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

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
      {/* 데스크탑, 태블릿 사이즈 searchBar */}
      <div className="searchBar">
        <p className="fontStyle">판매 중인 상품</p>
        <input
          className="inputSearch"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btnAdd">상품 등록하기</button>
        <CustomDropdown
          selectedOption={sortOrder}
          onOptionChange={handleSortChange}
        />
      </div>

      {/* 모바일 searchBar */}
      <div className="mobileSearchBar">
        <div className="mobileBar">
          <p className="fontStyle">판매 중인 상품</p>
          <button className="btnAdd">상품 등록하기</button>
        </div>
        <div className="mobileBar">
          <input
            className="inputSearch"
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
          />
          <CustomDropdown
            selectedOption={sortOrder}
            onOptionChange={handleSortChange}
          />
        </div>
      </div>

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
