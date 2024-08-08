import React, { useState } from "react";
import { postItem } from "../api.js";
import "../styles/Registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id.replace("product-", "")]: value, // 인풋 id의 "product-"를 제거
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postItem(formData);
      console.log("post success", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration-body">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="register-title-container">
          <h2 className="register-title text-xl bold">상품 등록하기</h2>
          <button className="register text-lg semibold" type="submit">
            등록
          </button>
        </div>
        <div className="product-name input">
          <label htmlFor="product-name" className="text-2lg bold">
            상품명
          </label>
          <input
            type="text"
            id="product-name"
            placeholder="상품명을 입력해주세요"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="product-description input">
          <label htmlFor="product-description" className="text-2lg bold">
            상품 소개
          </label>
          <textarea
            id="product-description"
            placeholder="상품 소개를 입력해주세요"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="product-price input">
          <label htmlFor="product-price" className="text-2lg bold">
            판매가격
          </label>
          <input
            type="text"
            id="product-price"
            placeholder="판매 가격을 입력해주세요"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="product-tag input">
          <label htmlFor="product-tag" className="text-2lg bold">
            태그
          </label>
          <input
            type="text"
            id="product-tag"
            placeholder="태그를 입력해주세요"
          />
          <div className="tag-box">#태그1</div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
