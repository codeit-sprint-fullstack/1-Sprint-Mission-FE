import React, { useEffect } from "react";
import { useState } from "react";
import "./Registration.css";

//렌더링 컴포넌트
import HomepageRenderHeader from "../components/HomepageRenderHeader.js";

import ProductHeaderText from "../components/ProductHeaderText.js";
import ProductDataRegistBtn from "../components/ProductDataRegistBtn.js";

import RegistrationInput from "../components/RegistrationInput.js";
import RegistrationTextArea from "../components/RegistrationTextArea.js";

// 커스텀 훅
import useValidationText from "../hooks/useValidationText.js";

function Registration() {
  const [inputDiscriptionText, setInputDiscriptionText] = useState("");
  const [inputNameText, setinpuNametText] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTagText, setInputTagText] = useState("");

  const {
    nameValidation,
    priceValidation,
    discriptionValidation,
    tagValidation,
    validationForm
  } = useValidationText(
    inputNameText,
    inputPrice,
    inputDiscriptionText,
    inputTagText
  );

  const handleinpuNametText = (e) => {
    setinpuNametText(e.target.value);
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
      <nav>
        <HomepageRenderHeader marketBoardActive={true} />
      </nav>
      <main>
        <header className="registrationHeader">
          <ProductHeaderText headerText={"상품 등록하기"} />
          <ProductDataRegistBtn registerBtnActive={validationForm} />
        </header>
        <section className="mainInputSectionSet">
          <RegistrationInput
            headerText={"상품명"}
            inputText={inputNameText}
            handleinputText={handleinpuNametText}
            placeholderText={"상품명를 입력해주세요"}
            validationActive={nameValidation}
            validationMessage={"10자 이내로 입력해주세요"}
          />
          <RegistrationTextArea
            headerText={"상품 소개"}
            inputText={inputDiscriptionText}
            handleinputText={handleInputDiscriptionText}
            placeholderText={"상품 소개를 입력해주세요"}
            validationActive={discriptionValidation}
            validationMessage={"10자 이상 입력해주세요"}
          />
          <RegistrationInput
            headerText={"판매가격"}
            inputText={inputPrice}
            handleinputText={handleInputPrice}
            placeholderText={"판매 가격을 입력해주세요"}
            validationActive={priceValidation}
            validationMessage={"숫자로 입력해주세요"}
          />
          <RegistrationInput
            headerText={"태그"}
            inputText={inputTagText}
            handleinputText={handleInputTagText}
            placeholderText={"태그를 입력해주세요"}
            validationActive={tagValidation}
            validationMessage={"5글자 이내로 입력해주세요"}
          />
        </section>
      </main>
    </div>
  );
}

export default Registration;