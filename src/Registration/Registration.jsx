import React, { useState } from "react";
import "./Registration.css";
import ProductAddForm from "./ProductAddForm";

export default function Registration() {
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <div className="container">
      <div className="addBar">
        <p className="textStyleHead">상품 등록하기</p>
        <button
          className={`addBtn ${isFormValid ? "addBtnActive" : ""}`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>
      <ProductAddForm onFormChange={setIsFormValid} />
    </div>
  );
}
