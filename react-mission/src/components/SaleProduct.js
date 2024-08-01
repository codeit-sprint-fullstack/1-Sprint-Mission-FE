import { useState, useEffect, useCallback } from "react";
import useResize from "./hook/useResize";
import Pagination from "react-js-pagination"; //라이브러리 다운 받았습니다
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";
import Registration from "./Registration";
import OrderChange from "./OrderChange";
import api from "./api";
import searchIcon from "./img/searchIcon.png";
import useAsync from "./hook/useAsync";

function SaleProduct() {
  const [items, setItems] = useState([]);
  const [logingError, logingErrorTag, apiAsync] = useAsync(api);
  const [order, setOrder] = useState("recent");
  const [orderName, setOrderName] = useState("최신순");
  const [search, setSeaerch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(null);

  // 스크린 크기에 따른 이미지 갯수 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 1200) {
      setPageSize(10);
    } else if (length < 1200 && length >= 768) {
      setPageSize(6);
    } else if (length >= 375 && length < 768) {
      setPageSize(4);
    }
  }, []);

  useResize(handleResize);

  //첫 랜더링 시 실행
  useEffect(() => {
    //api 호출
    const handleItemList = async (params) => {
      const result = await apiAsync(params);

      if (!result) {
        return;
      } else {
        const { totalCount, list } = result;
        setItems(list);
        setTotal(totalCount);
      }
    };

    if (productSearch === "") {
      handleItemList({ orderBy: order, page: page, pageSize: pageSize });
    } else {
      handleItemList({ keyword: productSearch });
    }
  }, [order, page, pageSize, productSearch, apiAsync]);

  //order 변경 함수
  const handleOrderChange = {
    orderChangeRecent: function () {
      setOrder("recent");
      setOrderName("최신순");
    },

    orderChangeFavorite: function () {
      setOrder("favorite");
      setOrderName("좋아요순");
    },
  };

  //search input value 변경 함수
  const handleSearch = (e) => {
    setSeaerch(e.target.value);
  };

  //search input에서 enterKey누를 때 검색 함수
  const keyDownSearch = (e) => {
    if (e.key === "Enter") {
      setProductSearch(search);
    }
  };

  //페이지 변경 함수
  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  return (
    <>
      {logingError?.message && <span>{logingError.message}</span>}
      {logingErrorTag || (
        <div className="ProductMobile">
          <div className="saleProductContaner">
            <div className="saleProductParts">
              <div className="productFont_Registration">
                <h2 className="productFont saleProductFont">판매 중인 상품</h2>
                <div className="mobileRegistration">
                  <Registration />
                </div>
              </div>
              <div className="saleProductFrom">
                <div className="searchFromPositin">
                  <img
                    className="readingGlasses"
                    src={searchIcon}
                    alt="돋보기"
                  />
                  <SearchForm
                    value={search}
                    onChange={handleSearch}
                    onKeyPress={keyDownSearch}
                  />
                </div>
                <div className="usuallyRegistration">
                  <Registration />
                </div>
                <OrderChange
                  orderName={orderName}
                  onClick={handleOrderChange}
                />
              </div>
            </div>
            <ProductCard items={items} variant="sale" />
            <Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={pageSize} // 한 페이지랑 보여줄 아이템 갯수
              totalItemsCount={total} // 총 아이템 갯수
              pageRangeDisplayed={5} // paginator의 페이지 범위
              prevPageText={"‹"} // "이전"을 나타낼 텍스트
              nextPageText={"›"} // "다음"을 나타낼 텍스트
              onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SaleProduct;
