import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";
import useResize from "../hooks/useResize.js";
import "../styles/BestProducts.css";

function BestProducts() {
  const [products, setProducts] = useState([]);
  const pageSize = useResize(1, 2, 4); // 모바일 태블릿 데스크탑 출력 개수

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(1, pageSize);
      setProducts(data.list);
    };

    getProducts();
  }, [pageSize]);

  return (
    <>
      <h2 className="best-product-title text-xl bold">베스트 상품</h2>
      <div className="best-products">
        {products.map((product) => (
          <Product
            key={`product-${product.id}`}
            product={product}
            className={"best-product"}
          />
        ))}
      </div>
    </>
  );
}

export default BestProducts;
