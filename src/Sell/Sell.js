import { useState, useEffect } from "react";
import { useFetchProducts } from "../Product/Product";
import { Shift } from "../PageShift/PageShift";
import CustomDropdown from "./CustomDropdown";
import "./Sell.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent"); // 정렬 상태 추가(기본: 최신순)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth)); // 브라우저 사이즈
  const [keyword, setKeyword] = useState(""); // 검색어 상태 추가
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색에 사용될 키워드 상태 추가

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

  // 가격 천단위 포맷
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // 정렬 기준 바꾸기
  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // 정렬 기준 변경 시 페이지를 1로 초기화
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value); // 검색어 상태 업데이트
  };

  const handleKeywordSearch = () => {
    setSearchKeyword(keyword); // 실제 검색에 사용될 키워드 업데이트
    setCurrentPage(1); // 검색어 변경 시 페이지를 1로 초기화
  };

  // 엔터 입력
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
          value={keyword} // 검색어 상태 바인딩
          onChange={handleKeywordChange} // 검색어 변경 핸들러 추가
          onKeyDown={handleKeyDown} // 엔터키 입력 핸들러
        />
        <button className="btnAdd">상품 등록하기</button>
        <CustomDropdown //Custom Select
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
            value={keyword} // 검색어 상태 바인딩
            onChange={handleKeywordChange} // 검색어 변경 핸들러 추가
            onKeyDown={handleKeyDown} // 엔터키 입력 핸들러
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
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((item) => (
              <div key={item.id} className="sellProductItem">
                <img
                  className="sellProduct"
                  src={item.images[0] || "No image"}
                  alt={item.name || "Product image"}
                />
                <p className="itemName">{item.name || "No name"}</p>
                <p className="itemPrice">
                  {item.price ? `${formatPrice(item.price)} 원` : "No price"}
                </p>
                <p className="itemFavoriteCnt">♡ {item.favoriteCount || "0"}</p>
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
