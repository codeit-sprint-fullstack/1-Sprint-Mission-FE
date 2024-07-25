import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import "../styles/BestProducts.css";

function BestProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("favorite");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(order);
      setProducts(data.slice(0, 4));
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
