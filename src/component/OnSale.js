import { useEffect, useState } from "react";
import "./OnSale.css";
import { getProducts } from "../api";
import searchIcon from "../image/searchIcon.png";
import DropDown from "./OnSaleDropDown";

function OnSaleItem({ item }) {
  return (
    <div className="OnSaleItem">
      <img className="OnSaleItem-img" src={item.images} alt={item.name} />
      <p>{item.name}</p>
      <h1>{item.price}원</h1>
      <div className="like">
        <p>♡</p>
        <p>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function OnSale() {
  const [orderBy, setOrderBy] = useState("recent");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  // 정렬 세팅
  const sortedItems = items.toSorted((a, b) => b[orderBy] - a[orderBy]);
  // 최신순 정렬
  const handleNewestClick = () => setOrderBy("recent");
  // 좋아요순 정렬
  const handleBestClick = () => setOrderBy("favorite");

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    if (options.page === 0) {
      setItems(list);
    } else {
      setItems([...list]);
    }
    setPage(options.page + 1);
  };

  const handleLoadNext = () => {
    handleLoad({ orderBy, page, pageSize: 10 });
  };

  useEffect(() => {
    handleLoad({ orderBy, page: 1, pageSize: 10 });
  }, [orderBy]);

  return (
    <div>
      <div className="OnSaleHeader">
        <h1>판매 중인 상품</h1>
        <div className="searchBox">
          <img id="searchIcon" src={searchIcon} alt="searchIcon" />
          <input id="inputSearch" placeholder="검색할 상품을 입력해주세요" />
        </div>
        <button className="postProduct">상품 등록하기</button>
        <DropDown
          selectRecent={handleNewestClick}
          selectFavorite={handleBestClick} 
        />
        {/* 결합해서 js로 구현 */}
        {/* <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>좋아요순</button> */}
        {/* footer로 기능 옮기기 */}
        <button onClick={handleLoadNext}>next</button>
      </div>
      <ul className="OnSale-list">
        {sortedItems.map((item) => {
          return (
            <li key={item.id}>
              <OnSaleItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OnSale;
