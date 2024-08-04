// src/components/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api";

function ProductDetail() {
  const { id } = useParams(); // URL에서 상품 ID를 가져옴
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const products = await fetchProducts(); // 모든 상품 데이터를 불러옴
      const selectedProduct = products.find((p) => p.id === parseInt(id));
      setProduct(selectedProduct);
    };

    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.images[0]} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price.toLocaleString()}원</p>
      <p>Manufacturer: {product.manufacturer}</p>
      <p>Favorites: {product.favoriteCount}</p>
    </div>
  );
}

export default ProductDetail;
