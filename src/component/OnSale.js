import { useEffect, useState } from "react";
import "./OnSale.css";
import { getProducts } from "../api";
import searchIcon from "../image/searchIcon.png";
import DropDown from "./OnSaleDropDown";
import Pagination from "./Pagination";

function OnSaleItem({ item }) {
  const thousandPrice = item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="OnSaleItem">
      <img className="OnSaleItem-img" src={item.images} alt={item.name} />
      <p>{item.name}</p>
      <h1>{thousandPrice}원</h1>
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
  const [page, setPage] = useState(1);
  const totalPages = 5;

  // 정렬 세팅
  const sortedItems = items.toSorted((a, b) => b[orderBy] - a[orderBy]);
  // 최신순 정렬
  const handleNewestClick = () => setOrderBy("recent");
  // 좋아요순 정렬
  const handleBestClick = () => setOrderBy("favorite");

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    setItems(list);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    handleLoad({ orderBy, page: pageNum, pageSize: 10 });
  };

  useEffect(() => {
    handleLoad({ orderBy, page, pageSize: 10 });
  }, [orderBy, page]);

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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default OnSale;
