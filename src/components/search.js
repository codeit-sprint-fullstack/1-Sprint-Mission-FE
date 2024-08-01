import { useState } from "react";
import "../css/serach.css";
import ic_search from "../image/ic_search.png";
import ic_arrow_down from "../image/ic_arrow_down.png";
import ic_sort from "../image/ic_sort.png";

function DropDownBox({ onOrderChange, order, isMobile = false }) {
  const [dropView, setDropView] = useState(false);
  const viewDropbox = () => {
    setDropView((e) => !e);
  };
  const handleOrderChange = (e) => onOrderChange(e);
  const dropDownBox = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  return (
    <div>
      <div className="serach_order_container" onClick={viewDropbox}>
        <button className="order_drop_btn">
          {isMobile ? null : dropDownBox[order]}
        </button>
        <img
          className="ic_arrow_down"
          src={isMobile ? ic_sort : ic_arrow_down}
          alt="드롭다운아이콘"
        ></img>
      </div>
      {dropView && (
        <div className="dropbox_list">
          <button
            className="firstdrop"
            name="order"
            value="recent"
            onClick={handleOrderChange}
          >
            {dropDownBox.recent}
          </button>
          <button
            className="lastdrop"
            name="order"
            value="favorite"
            onClick={handleOrderChange}
          >
            {dropDownBox.favorite}
          </button>
        </div>
      )}
    </div>
  );
}

function Search({ onChange, order, isMobile = false }) {
  const [keyword, setKeyword] = useState();

  const onOrderChange = (e) => {
    const name = [e.target.name];
    const value = [e.target.value];
    onChange(name, value);
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange("keyword", keyword);
  };

  return (
    <div className="serach_container">
      <div className="first_block">
        <h2>판매 중인 상품</h2>
        {isMobile ? (
          <button className="add_product_btn">상품 등록하기</button>
        ) : null}
      </div>
      <div className="serach_query_container">
        <div className="input_and_icon">
          <img className="ic_search" alt="돋보기아이콘" src={ic_search}></img>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleKeyword}
              name="keyword"
              className="keyword"
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </form>
        </div>
        {!isMobile && (
          <button className="add_product_btn">상품 등록하기</button>
        )}
        <DropDownBox
          onOrderChange={onOrderChange}
          order={order}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default Search;
