import { SellProduct } from "./Product";
import "./Sell.css";

export function SellList() {
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
          <select>
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
        <SellProduct />
      </div>
    </div>
  );
}
