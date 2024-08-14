import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import ProductAddForm from "./ProductAddForm";
import { createProduct } from "./createProduct.js";

export default function Registration() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleProductPost = async () => {
    if (isFormValid) {
      try {
        await createProduct({
          name: formValues.productName,
          description: formValues.productIntro,
          price: formValues.productPrice,
          tags: formValues.tags || [],
        });
        navigate("/Product");
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="addBar">
        <p className="textStyleHead">상품 등록하기</p>
        <button
          className={`addBtn ${isFormValid ? "addBtnActive" : ""}`}
          disabled={!isFormValid}
          onClick={handleProductPost}
        >
          등록
        </button>
      </div>
      <ProductAddForm
        onFormChange={setIsFormValid}
        onFormValuesChange={setFormValues}
      />
    </div>
  );
}
