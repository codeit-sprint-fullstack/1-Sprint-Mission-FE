import { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { useValidation } from "../useValidation";

const BASE_URL = "https://product-api-shiu.onrender.com/products";

function Registration() {
  // useNavigate 훅 초기화
  const navigate = useNavigate();

  const {
    values: formData,
    errors,
    handleChange,
  } = useValidation({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).some((key) => errors[key])) {
      console.log("Validation failed");
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register product");
      }

      const result = await response.json();
      console.log("Product registered successfully:", result);
      // 등록 성공 후 상세 페이지로 이동
      navigate(`/products/${result._id}`);
    } catch (error) {
      console.error("Error registering product:", error.message);
    }
  };

  const isFormValid = !errors.name && !errors.description && !errors.price;

  return (
    <div>
      <div className="reg-header">
        <h1 className="reg-title">상품 등록하기</h1>
        <button
          className="reg-button"
          onClick={handleSubmit}
          disabled={!isFormValid} // name, description, price가 채워지지 않으면 버튼 비활성화
        >
          등록
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reg-input-box">
          <label>상품명</label>
          <input
            className={errors.name ? "error" : ""}
            placeholder="상품명을 입력해주세요"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="reg-input-box">
          <label>상품 소개</label>
          <textarea
            className={errors.description ? "error" : ""}
            placeholder="상품 소개를 입력해주세요"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>
        <div className="reg-input-box">
          <label>판매 가격</label>
          <input
            className={errors.price ? "error" : ""}
            placeholder="판매 가격을 입력해주세요"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <div className="reg-input-box">
          <label>태그</label>
          <input
            className={errors.tags ? "error" : ""}
            placeholder="태그를 입력해주세요"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
          {errors.tags && <p className="error-message">{errors.tags}</p>}
        </div>
      </form>
    </div>
  );
}

export default Registration;
