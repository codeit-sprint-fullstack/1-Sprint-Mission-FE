import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import Footer from "./Footer.js";
import "../styles/SaleProducts.css";

function SaleProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");

  const PAGE_SIZE = 10;

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(1, PAGE_SIZE, order);
      setProducts(data.list);
    };

    getProducts();
  }, [order]);

  return (
    <>
      <div className="sale-product-nav">
        <h2 className="sale-product-title Text-xl Bold">판매중인 상품</h2>
        <div className="nav-options">
          <div>검색창</div>
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
        <Footer />
      </div>
    </>
  );
}

export default SaleProducts;
