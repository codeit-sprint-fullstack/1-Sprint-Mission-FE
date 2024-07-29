import * as Product from "API/ProductService.mjs";
import React, { useState, useEffect, useCallback, useRef } from "react";
import useViewportSize from "hooks/useViewportSize";
import ProductCard from "components/ProductCard";
import "assets/styles/App.css";

function BestMarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useViewportSize();
  const [pageSize, setPageSize] = useState(4);
  const requestIdRef = useRef(0);

  const getPageSize = useCallback(() => {
    if (width <= 743) {
      return 1; // mobile 상태
    } else if (width <= 1199) {
      return 2; // tablet 상태
    } else {
      return 4; // default 상태
    }
  }, [width]);

  useEffect(() => {
    const newPageSize = getPageSize();
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [width, getPageSize, pageSize]);

  useEffect(() => {
    const fetchProducts = async () => {
      const requestId = ++requestIdRef.current;
      try {
        const productsFromAPI = await Product.getProductList({
          page: 1,
          pageSize: pageSize,
          keyword: "",
          orderBy: "favorite",
        });

        if (requestId === requestIdRef.current) {
          setProducts(productsFromAPI.list);
          setLoading(false);
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [pageSize]);

  if (loading) {
    return <div>해당 화면이 지속될경우, 새로고침 해주세요!</div>;
  }

  return (
    <div className="best-selling-market-container">
      <div className="hot-section-title">베스트 상품</div>
      <div className="best-selling-market-display">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="best-product-card-image"
          />
        ))}
      </div>
    </div>
  );
}

export default BestMarketPlace;
