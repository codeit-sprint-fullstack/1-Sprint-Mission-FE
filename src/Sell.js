import { useFetchProducts } from "./Product";
import { useState } from "react";
import "./Sell.css";

export function SellList() {
  const [sortOrder, setSortOrder] = useState("recent"); // 초기 정렬 기준
  const { products, loading } = useFetchProducts({
    orderBy: sortOrder,
  });

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // 드롭다운에서 선택된 값으로 상태 업데이트
  };

  return (
    <div className="sell">
      <div className="searchBar">
        <p className="fontStyle" style={{ marginTop: 5 }}>
          판매 중인 상품
        </p>
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
        {products.length === 0 ? (
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
              <p className="itemPrice">{item.price || "No price"} 원</p>
              <p className="itemFavoriteCnt">
                ♡ {item.favoriteCount || "No likes"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
