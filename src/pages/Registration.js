import React from "react";
import { useState } from "react";
import styles from "./Registration.module.css";

// 컴포넌트
import PageNav from "components/PageNav.js";
import TextBtn from "components/common/TextBtn";
import InputBox from "components/common/InputBox.js";
import TextAreaBox from "components/common/TextAreaBox.js";
import Tags from "components/common/Tags.js";

// 커스텀 훅
import useValidationText from "../hooks/useValidationText.js";

function Registration() {
  const [inputDiscriptionText, setInputDiscriptionText] = useState("");
  const [inputNameText, setinpuNametText] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTagText, setInputTagText] = useState("");
  const [tagList, setTagList] = useState([]);

  const {
    nameError,
    priceError,
    discriptionError,
    tagError,
    submitError,
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputTagText.trim() !== "") {
        setTagList([...tagList, inputTagText]);
        setInputTagText("");
      }
    }
  };
  const tagDelete = (deleteTag) => {
    setTagList(tagList.filter((tag) => tag !== deleteTag));
  };

  return (
    <div className={styles.registrationPage}>
      <nav>
        <PageNav />
      </nav>
      <main className={styles.mainContainer}>
        <header className={styles.registrationHeader}>
          <span className={styles.headerText}>상품 등록하기</span>
          <TextBtn btnActive={!submitError} text={"등록"} />
        </header>
        <section className={styles.inputSection}>
          <InputBox
            headerText={"상품명"}
            inputText={inputNameText}
            handleinputText={handleinpuNametText}
            placeholderText={"상품명를 입력해주세요"}
            inputError={nameError}
            validationMessage={"10자 이내로 입력해주세요"}
          />
          <TextAreaBox
            headerText={"상품 소개"}
            inputText={inputDiscriptionText}
            handleinputText={handleInputDiscriptionText}
            placeholderText={"상품 소개를 입력해주세요"}
            inputError={discriptionError}
            validationMessage={"10자 이상 입력해주세요"}
          />
          <InputBox
            headerText={"판매가격"}
            inputText={inputPrice}
            handleinputText={handleInputPrice}
            placeholderText={"판매 가격을 입력해주세요"}
            inputError={priceError}
            validationMessage={"숫자로 입력해주세요"}
          />
          <InputBox
            headerText={"태그"}
            inputText={inputTagText}
            handleinputText={handleInputTagText}
            placeholderText={"태그를 입력해주세요"}
            handleKeyPress={handleKeyPress}
            inputError={tagError}
            validationMessage={"5글자 이내로 입력해주세요"}
          />
          <Tags tagList={tagList} tagDelete={tagDelete} />
        </section>
      </main>
    </div>
  );
}

export default Registration;
