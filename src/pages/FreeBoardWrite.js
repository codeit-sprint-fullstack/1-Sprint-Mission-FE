import React from "react";
import { useState } from "react";
import styles from "./FreeBoardWrite.module.css";

// 컴포넌트
import PageNav from "components/PageNav.js";
import TextBtn from "components/common/TextBtn";
import InputBox from "components/common/InputBox.js";
import TextAreaBox from "components/common/TextAreaBox.js";
import Tags from "components/common/Tags.js";

// 커스텀 훅
import useValidationText from "../hooks/useValidationText.js";

function FreeBoardWrite() {
  const [inputDiscriptionText, setInputDiscriptionText] = useState("");
  const [inputNameText, setinpuNametText] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTagText, setInputTagText] = useState("");
  const [tagList, setTagList] = useState([]);

  const {
    nameValidation,
    priceValidation,
    discriptionValidation,
    tagValidation,
    validationForm,
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
        <PageNav loginState={true}/>
      </nav>
      <main className={styles.mainContainer}>
        <header className={styles.registrationHeader}>
          <span className={styles.headerText}>게시글 쓰기</span>
          <TextBtn btnActive={validationForm} text={"등록"} />
        </header>
        <section className={styles.inputSection}>
          <InputBox
            headerText={"*제목"}
            inputText={inputNameText}
            handleinputText={handleinpuNametText}
            placeholderText={"상품명를 입력해주세요"}
            validationActive={nameValidation}
            validationMessage={"10자 이내로 입력해주세요"}
          />
          <TextAreaBox
            headerText={"*내용"}
            inputText={inputDiscriptionText}
            handleinputText={handleInputDiscriptionText}
            placeholderText={"상품 소개를 입력해주세요"}
            validationActive={discriptionValidation}
            validationMessage={"10자 이상 입력해주세요"}
          />
        </section>
      </main>
    </div>
  );
}

export default FreeBoardWrite;
