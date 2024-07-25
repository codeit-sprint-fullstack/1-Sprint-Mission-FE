import { useState } from "react";
import "../css/serach.css";
import ic_search from "../image/ic_search.png";
import ic_arrow_down from "../image/ic_arrow_down.png";

function DropDownBox({ onOrderChange, order }) {
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
        <button className="order_drop_btn">{dropDownBox[order]}</button>
        <img
          className="ic_arrow_down"
          src={ic_arrow_down}
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

function Serach({ onChange, order }) {
  const onOrderChange = (e) => {
    console.log(e.target);
    const name = [e.target.name];
    const value = [e.target.value];
    console.log(name, value);
    onChange(name, value);
  };

  return (
    <div className="serach_container">
      <h2>판매 중인 상품</h2>
      <div className="serach_query_container">
        <div>
          <img className="ic_search" alt="돋보기아이콘" src={ic_search}></img>
          <input
            className="keyword"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <button className="add_product_btn">상품 등록하기</button>
        <DropDownBox onOrderChange={onOrderChange} order={order} />
      </div>
    </div>
  );
}

export function MobileSearch({ onChange, order }) {
  const onOrderChange = (e) => {
    console.log(e.target);
    const name = [e.target.name];
    const value = [e.target.value];
    console.log(name, value);
    onChange(name, value);
  };

  return (
    <div className="serach_container">
      <div className="first_block">
        <h2>판매 중인 상품</h2>
        <button className="add_product_btn">상품 등록하기</button>
      </div>
      <div className="serach_query_container">
        <div className="input_and_icon">
          <img className="ic_search" alt="돋보기아이콘" src={ic_search}></img>
          <input
            className="keyword"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <DropDownBox onOrderChange={onOrderChange} order={order} />
      </div>
    </div>
  );
}

export default Serach;
