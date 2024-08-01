import React from "react";
import { useEffect, useState } from "react";

import ProductRender from "./Product";
import getProductList from "../api/getproducts";

import "./ProductList.css";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [nowPage, setPage] = useState(1);

  useEffect(() => {
    getProductList(nowPage, 4, "favorite")
      .then((data) => {
        const { list } = data;
        setProductList(list);
        console.log(productList);
      })
      .catch((error) => console.error(error));
  }, [nowPage]);

  const renderProducts = () => {
    return productList.map((product) => (
      <ProductRender key={product.id} product={product} />
    ));
  };

  return <ul className="favoriteProductsList">{renderProducts()}</ul>;
}

export default ProductList;

// const { id, images, name, description, price, favoriteCount } = productList[0];
// console.log(name)
// console.log(id)
// console.log(images)
// const [ image ] = images
// console.log(image)
