import React, { useState, useEffect } from "react";
import { getItems } from "../api.js";
import Product from "./Product.js";

function BestProducts() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("favorite");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getItems(order);
      setProducts(data);
    };

    getProducts();
  }, [order]);

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default BestProducts;
