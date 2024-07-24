import { useState } from "react";
import { useFetchProducts } from "../Product/Product";
import { Shift } from "../PageShift/PageShift";
import "./Sell.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, totalPages } = useFetchProducts({
    orderBy: sortOrder,
    page: currentPage,
    pageSize: 10,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // 정렬 기준 변경 시 페이지를 1로 초기화
  };

  return (
    <div className="sell">
      <div className="searchBar">
        <p className="fontStyle">판매 중인 상품</p>
        <input
          className="inputSearch"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
        />
        <button className="btnSearch">상품 등록하기</button>
        <div className="custom-dropdown">
          <select onChange={handleSortChange} value={sortOrder}>
            <option className="customOption" value="recent">
              최신순
            </option>
            <option className="customOption" value="favorite">
              좋아요순
            </option>
          </select>
        </div>
      </div>
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
              <p className="itemFavoriteCnt">
                ♡ {item.favoriteCount || "No likes"}
              </p>
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
  );
}
