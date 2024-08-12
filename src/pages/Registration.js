import React, { useEffect } from "react";
import { useState } from "react";
import "./Registration.css";

//렌더링 컴포넌트
import HomepageRenderHeader from "../components/HomepageRenderHeader.js";

import ProductHeaderText from "../components/ProductHeaderText.js";
import ProductDataRegistBtn from "../components/ProductDataRegistBtn.js";

// 커스텀 훅
import useProductData from "../hooks/useProductData.js";
import useWindowWidhtSize from "../hooks/useWindowWidhtSize.js";

function Registration() {
  const [inputDiscriptionText, setInputDiscriptionText] = useState("");
  const [inputNameText, setInputNameText] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTagText, setInputTagText] = useState("");

  const handleinputNameText = (e) => {
    setInputNameText(e.target.value);
  };

  const handleInputDiscriptionText = (e) => {
    setInputDiscriptionText(e.target.value);
  };

  const handleInputPrice = (e) => {
    setInputPrice(e.target.value);
  };

  const handleInputTagText = (e) => {
    setInputTagText(e.target.value);
  };

  return (
    <div className="registrationPage">
      <HomepageRenderHeader marketBoardActive={true} />
      <div className="mainSectionSet">
        <main>
          <section className="registrationHeader">
            <ProductHeaderText headerText={"상품 등록하기"} />
            <ProductDataRegistBtn registerBtnActive={false} />
          </section>
          <section className="inputContainer">
            <div className="inputHeader">
              <span>상품명</span>
            </div>
            <div>
              <input
                className="productNameInput"
                type="text"
                value={inputNameText}
                onChange={handleinputNameText}
                placeholder="상품명을 입력해주세요"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Registration;

// <div className="inputContainer">
// <span className="inputHeader">상품 소개</span>
// <input
//   className="productdiscriptionInput"
//   type="text"
//   value={inputDiscriptionText}
//   onChange={handleInputDiscriptionText}
//   placeholder="상품 소개를 입력해주세요"
// />
// </div>
// <div className="inputContainer">
// <span className="inputHeader">판매가격</span>
// <input
//   className="productPriceInput"
//   type="number"
//   value={inputPrice}
//   onChange={handleInputPrice}
//   placeholder="판매가격을 입력해주세요"
// />
// </div>
// <div className="inputContainer">
// <span className="inputHeader">태그</span>
// <input
//   className="productTagInput"
//   type="number"
//   value={inputTagText}
//   onChange={handleInputTagText}
//   placeholder="판매가격을 입력해주세요"
// />
// </div>
