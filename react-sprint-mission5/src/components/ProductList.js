// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import Pagination from "./Pagination";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchProducts(
          currentPage,
          pageSize,
          sort
        );
        setProducts(fetchedProducts.products);
        setTotalPages(Math.ceil(fetchedProducts.totalCount / pageSize));
        setLoading(false);
      } catch (err) {
        setError("상품을 불러오는 중 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, sort]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Filter onChange={handleSortChange} />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
