import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import Footer from "./Footer.js";
import "../styles/SaleProducts.css";
import searchIcon from "../images/searchIcon.png";
import sortIcon from "../images/sortIcon.png";
import arrowDownIcon from "../images/arrowDownIcon.png";
import useResize from "../hooks/useResize.js";

function SaleProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = useResize(4, 6, 10);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(currentPage, pageSize, order, keyword);
      setProducts(data.list);
      setTotalPage(Math.ceil(data.totalCount / pageSize));
    };

    getProducts();
  }, [order, currentPage, keyword, pageSize]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeOrder = (order) => {
    setOrder(order);
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="nav-options">
        <h2 className="sale-product-title Text-xl Bold">판매중인 상품</h2>
        <input
          className="search-product"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={handleSearch}
        />
        <img src={searchIcon} alt="search icon" className="search-icon" />
        <div className="enroll-product Text-lg Semibold">상품 등록하기</div>
        <div
          className="order-select Text-lg Regular"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {order === "recent" ? "최신순" : "좋아요순"}
          <img src={arrowDownIcon} alt="arrowDownIcon" className="arrow-icon" />
        </div>
        <div
          className="order-select mobile-size"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <img src={sortIcon} alt="sortIcon" className="sort-icon" />
        </div>
        {isModalOpen && (
          <div className="order-modal Text-lg Regular">
            <div
              className="modal-option recent"
              onClick={() => handleChangeOrder("recent")}
            >
              최신순
            </div>
            <div
              className="modal-option favorite"
              onClick={() => handleChangeOrder("favorite")}
            >
              좋아요순
            </div>
          </div>
        )}
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
