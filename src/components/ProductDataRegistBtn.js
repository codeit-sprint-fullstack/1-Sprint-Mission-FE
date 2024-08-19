import React from "react";
import { Link } from "react-router-dom";
import "./ProductDataRegistBtn.css";


function ProductDataRegistBtn({ registerBtnActive = false }) {
  return (
    registerBtnActive 
    ? <button className="ProductDataRegistBtnActive"><Link to="/register" >등록</Link></button>
    : <button className="ProductDataRegistBtn" disabled={true}>등록</button>
  );
}

export default ProductDataRegistBtn;
