import React from "react";

function Registration() {
  return (
    <div className="registration-body">
      <h2>상품 등록하기</h2>
      <form className="registration-form">
        <div className="product-name-input">
          <label htmlFor="product-name">상품명</label>
          <input
            type="text"
            id="product-name"
            placeholder="상품명을 입력해주세요"
          />
        </div>
        <div className="product-description-input">
          <label htmlFor="product-description">상품 소개</label>
          <textarea
            id="product-description"
            placeholder="상품 소개를 입력해주세요"
          ></textarea>
        </div>
        <div className="product-price-input">
          <label htmlFor="product-price">판매가격</label>
          <input
            type="text"
            id="product-price"
            placeholder="판매 가격을 입력해주세요"
          />
        </div>
        <div className="product-tag-input">
          <label htmlFor="product-tag">태그</label>
          <input
            type="text"
            id="product-tag"
            placeholder="태그를 입력해주세요"
          />
          <div className="tag-box">태그1</div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
