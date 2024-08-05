import React, { useState, useEffect } from "react";
import "./ProductAddForm.css";

function ProductAddForm({ onFormChange }) {
  const [productName, setProductName] = useState("");
  const [productIntro, setProductIntro] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTag, setProductTag] = useState("");

  useEffect(() => {
    // 입력 필드가 모두 채워졌는지 확인
    const isFormValid =
      productName.trim() !== "" &&
      productIntro.trim() !== "" &&
      productPrice.trim() !== "" &&
      productTag.trim() !== "";
    onFormChange(isFormValid);
  }, [productName, productIntro, productPrice, productTag, onFormChange]);

  return (
    <form className="productForm">
      <label htmlFor="productName" className="labelText">
        상품명
      </label>
      <input
        type="text"
        className="inputStyle"
        id="productName"
        placeholder="상품명을 입력해주세요"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <p className="inputCheck" id="productNameCheck">
        10자 이내로 입력해주세요
      </p>

      <label htmlFor="productIntro" className="labelText">
        상품 소개
      </label>
      <textarea
        className="inputStyle textareaStyle"
        id="productIntro"
        placeholder="상품 소개를 입력해주세요"
        value={productIntro}
        onChange={(e) => setProductIntro(e.target.value)}
      ></textarea>
      <p className="inputCheck" id="productIntroCheck">
        10자 이상 입력해주세요
      </p>

      <label htmlFor="productPrice" className="labelText">
        판매가격
      </label>
      <input
        type="text"
        className="inputStyle"
        id="productPrice"
        placeholder="판매 가격을 입력해주세요"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <p className="inputCheck" id="productPriceCheck">
        숫자로 입력해주세요
      </p>

      <label htmlFor="productTag" className="labelText">
        태그
      </label>
      <input
        type="text"
        className="inputStyle"
        id="productTag"
        placeholder="태그를 입력해주세요"
        value={productTag}
        onChange={(e) => setProductTag(e.target.value)}
      />
      <p className="inputCheck" id="productTagCheck">
        5글자 이내로 입력해주세요
      </p>
    </form>
  );
}

export default ProductAddForm;
