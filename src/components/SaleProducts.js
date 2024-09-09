import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../api.js";
import Product from "./Product.js";
import Footer from "./Pagination.js";
import "../styles/SaleProducts.css";
import searchIcon from "../images/searchIcon.png";
import sortIcon from "../images/sortIcon.png";
import arrowDownIcon from "../images/arrowDownIcon.png";
import usePageSize from "../hooks/usePageSize.js";

function SaleProducts({ activePath, setActivePath }) {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const pageSize = usePageSize(4, 6, 10); // 모바일 태블릿 데스크탑 출력 개수

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(currentPage, pageSize, keyword);
      setProducts(data.products);
      setTotalPage(Math.ceil(data.totalProducts / pageSize));
    };

    getProducts();
  }, [currentPage, keyword, pageSize]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="sale-product-options">
        <h2 className="sale-product-title text-xl bold">판매중인 상품</h2>
        <input
          className="search-product"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={handleSearch}
        />
        <img src={searchIcon} alt="search icon" className="search-icon" />
        <div className="register-product text-lg semibold">
          <Link
            to="/registration"
            className={activePath === "/registration" ? "active" : ""}
            onClick={() => setActivePath("/registration")}
          >
            상품 등록하기
          </Link>
        </div>
        <div className="order-select text-lg regular">
          최신순
          <img src={arrowDownIcon} alt="arrowDownIcon" className="arrow-icon" />
        </div>
        <div className="order-select mobile-size">
          <img src={sortIcon} alt="sortIcon" className="sort-icon" />
        </div>
      </div>
      <div className="sale-products">
        {products.map((product) => (
          <Product
            key={`product-${product._id}`}
            product={product}
            className="sale-product"
          />
        ))}
      </div>
      <div className="sale-product-footer">
        <Footer
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={handleChangePage}
        />
      </div>
    </>
  );
}

export default SaleProducts;
