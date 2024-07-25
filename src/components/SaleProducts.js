import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import Footer from "./Footer.js";
import "../styles/SaleProducts.css";
import searchIcon from "../images/searchIcon.png";

function SaleProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const PAGE_SIZE = 10;

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(currentPage, PAGE_SIZE, order, keyword);
      setProducts(data.list);
      setTotalPage(Math.ceil(data.totalCount / PAGE_SIZE));
    };

    getProducts();
  }, [order, currentPage, keyword]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="sale-product-nav">
        <h2 className="sale-product-title Text-xl Bold">판매중인 상품</h2>
        <div className="nav-options">
          <input
            className="search-product"
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={keyword}
            onChange={handleSearch}
          />
          <img src={searchIcon} alt="search icon" className="search-icon" />
          <div>상품등록하기</div>
          <div>정렬선택하기</div>
        </div>
      </div>
      <div className="sale-products">
        {products.map((product) => (
          <Product
            key={product.id}
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
