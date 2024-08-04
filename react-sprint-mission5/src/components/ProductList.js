// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("createdAt"); // 정렬 상태 추가

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(1, 10, sort); // 정렬 기준 추가
      setProducts(fetchedProducts);
    };

    getProducts();
  }, [sort]); // 정렬 상태 변경 시 데이터 재로드

  const handleSortChange = (event) => {
    setSort(event.target.value); // 정렬 기준 업데이트
  };

  return (
    <div>
      <Filter onChange={handleSortChange} />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
