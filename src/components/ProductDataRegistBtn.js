import React from "react";
import { Link } from "react-router-dom";
import "./ProductDataRegistBtn.css";

// 이미지

function ProductDataRegistBtn({ registerBtnActive = false }) {
  return (
    registerBtnActive 
    ? <button className="ProductDataRegistBtn"><Link to="/register" >등록</Link></button>
    : <button className="ProductDataRegistBtnActive"><Link to="/register" >등록</Link></button>
  );
}

export default ProductDataRegistBtn;
