import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import ProductAddForm from "./ProductAddForm";

export default function Registration() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleProductPost = async () => {
    if (isFormValid) {
      try {
        const response = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formValues.productName,
            description: formValues.productIntro,
            price: formValues.productPrice,
            tags: formValues.productTag ? [formValues.productTag] : [],
          }),
        });

        if (response.ok) {
          navigate("/Product");
        } else {
          const errorData = await response.json();
          console.error("Failed to submit form", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
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
