import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import "../styles/BestProducts.css";

function BestProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("favorite");
  const PAGE_SIZE = 4;

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(1, PAGE_SIZE, order);
      setProducts(data);
    };

    getProducts();
  }, [order]);

  return (
    <>
      <h2 className="best-product-title Text-xl Bold">베스트 상품</h2>
      <div className="best-products">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default BestProducts;
