import { useEffect, useState } from "react";
import "./OnSale.css";
import { getProducts } from "../api";
import searchIcon from "../image/searchIcon.png";
import DropDown from "./OnSaleDropDown";
import Pagination from "./Pagination";

function OnSaleItem({ item = {} }) {
  const thousandPrice = item.price
    ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";

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
  const [userInput, setUserInput] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [resetPageGroup, setResetPageGroup] = useState(false);

  const totalPages = Math.ceil(totalItems / pageSize);

  // 정렬 세팅
  const sortedItems = items.toSorted((a, b) => b[orderBy] - a[orderBy]);
  // 최신순 정렬
  const handleNewestClick = () => {
    setOrderBy("recent");
    setPage(1);
    setResetPageGroup(true);
  };
  // 좋아요순 정렬
  const handleBestClick = () => {
    setOrderBy("favorite");
    setPage(1);
    setResetPageGroup(true);
  };

  const handleLoad = async (options) => {
    const { list, totalCount } = await getProducts(options);
    setItems(list);
    setTotalItems(totalCount);
  };

  // 반응형 웹에 따른 항목 수 변경
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setPageSize(4); // mobile view
      } else if (width <= 1199) {
        setPageSize(6); // tablet view
      } else {
        setPageSize(10); // desktop view
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 검색 기능
  const handleSearch = (e) => {
    setUserInput(e.target.value.toLowerCase());
    setPage(1);
    setResetPageGroup(true);
  };

  const filterItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(userInput)
  );

  // 페이지 변경
  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    setResetPageGroup(false);
  };

  useEffect(() => {
    handleLoad({ orderBy, page, pageSize });
  }, [orderBy, page, pageSize]);

  return (
    <div>
      <div className="OnSaleHeader">
        <h1>판매 중인 상품</h1>
        <div className="searchBox">
          <img id="searchIcon" src={searchIcon} alt="searchIcon" />
          <input
            id="inputSearch"
            placeholder="검색할 상품을 입력해주세요"
            onChange={handleSearch}
          />
        </div>
        <button className="postProduct">상품 등록하기</button>
        <div className="mobileSearchBox">
          <img id="searchIcon" src={searchIcon} alt="searchIcon" />
          <input
            id="inputSearch"
            placeholder="검색할 상품을 입력해주세요"
            onChange={handleSearch}
          />
        </div>
        <DropDown
          selectRecent={handleNewestClick}
          selectFavorite={handleBestClick}
          setPage={setPage}
        />
      </div>
      <ul className="OnSale-list">
        {(userInput ? filterItems : sortedItems).map((item) => {
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
        resetPageGroup={resetPageGroup}
      />
    </div>
  );
}

export default OnSale;
