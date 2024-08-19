import React from "react";
import { Link } from 'react-router-dom';
import "./ProductHeaderRegistBtn.css";


// 이미지

function ProductHeaderRegistBtn( ) {
  return <button className="registerBtn"><Link to ="/register">상품 등록하기</Link></button>

}

export default ProductHeaderRegistBtn