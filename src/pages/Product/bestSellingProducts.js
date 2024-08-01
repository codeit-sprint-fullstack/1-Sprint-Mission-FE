import * as Product from "API/ProductService.js";
import React, { useState, useEffect, useRef } from "react";
import usePageSize from "hooks/usePageSize";
import ProductCard from "components/ProductCard";
import "assets/styles/App.css";

function BestMarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef(0);

  const getPageSize = usePageSize({
    breakpoints: { mobile: 743, tablet: 1199, default: 9999 },
    sizes: { mobile: 1, tablet: 2, default: 4 },
  });

  const pageSize = getPageSize();

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
