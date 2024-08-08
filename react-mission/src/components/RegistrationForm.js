import "./RegistrationForm.css";
// import { postApi } from "../api/api";
import { useState } from "react";
import useRegistationBlur from "./hook/useRegistationBlur";
import tegDeleteImg from "./img/tagDeleteImg.png";

function RegistrationForm() {
  const [values, setValues] = useState({
    name: "",
    introduction: "",
    price: "",
    tag: "",
  });
  const [tagArray, setTageArray] = useState([]);
  const [conditionError, inputClassName, handleBlurTrue, handleBlurFalse] =
    useRegistationBlur();
  const [buttonClass, setButtonClass] = useState("productRegistrationButton");

  // input 값
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  // 유효성 검사 함수
  const handleBlur = (e) => {
    const { name, value } = e.target;
    //target이 name일때
    if (name === "name") {
      if (value.length > 10) {
        handleBlurFalse(name);
      } else if (conditionError.name && value.length <= 10) {
        handleBlurTrue(name);
      }
      //target이 introduction일때
    } else if (name === "introduction" && e.key !== 'Tab') {
      if (value.length < 10) {
        handleBlurFalse(name);
      } else if (conditionError.introduction && value.length >= 10) {
        handleBlurTrue(name);
      }
      //target이 price일때
    } else if (name === "price") {
      if (!/^\d*$/.test(value) && value !== "") {
        handleBlurFalse(name);
      } else if (
        conditionError.price &&
        (value === "" || /^\d*$/.test(value))
      ) {
        handleBlurTrue(name);
      }
      //target이 tag일때
    } else if (name === "tag") {
      if (value.length > 5) {
        handleBlurFalse(name);
      } else if (conditionError.tag && value.length <= 5) {
        handleBlurTrue(name);
      }
    }
  };

  // Enter 누를시 재로딩 방지 함수함수
  const handleNoSubmit = (e) => {
    e.preventDefault();
  };

  // Enter 누를시 tag 추가
  const handleAddTagArray = (e) => {
    const tag = values.tag;

    // 태그 중복 방지
    const noDuplication = tagArray.find((findTag) => findTag === tag);

    if (e.key === "Enter" && tag !== "" && tag.length <= 5 && !noDuplication) {
      setTageArray((preTagArray) => [...preTagArray, tag]);
      setValues((preValues) => ({
        ...preValues,
        tag: "",
      }));
    }
  };

  //태그 삭제 함수
  const handleDeleteTagArray = (e) => {
    const liElement = e.target.closest("li"); //event가일어난 요소부터 시작하여 가장 가까운 li 요소
    const tagText = liElement.textContent.trim().slice(1); // li요소의 모든 텍스트 콘텐츠에서 # 과 양옆의 공백을 제외한 가져온다.

    const newTagArray = tagArray.filter((tag) => tag !== tagText);
    setTageArray(newTagArray);
  };

  //버튼 활성화 함수
  const activateButton = () => {
    const { name, introduction, price, tag } = values;
    if (
      name.length > 0 &&
      name.length <= 10 &&
      introduction.length >= 10 &&
      introduction.length <= 100 &&
      price.length >= 1 &&
      price >= 0 &&
      (tag.length <= 5 || (tagArray && tag.length <= 5))
    ) {
      setButtonClass("productRegistrationButtonAtivate");
    } else {
      setButtonClass("productRegistrationButton");
    }
  };

  const handleKeyUp = (e) => {
    handleBlur(e);
    activateButton();
  };

  return (
    <form className="RegistrationFormContaner" onSubmit={handleNoSubmit}>
      <div className="productRegistration">
        <p className="productRegistrationLabel">상품 등록하기</p>
        <button className={buttonClass}>등록</button>
      </div>
      <div id="registrationName" className="Registrationbox">
        <label htmlFor="productName" className="RegistrationLabel">
          상품명
        </label>
        <input
          name="name"
          value={values.name}
          id="productName"
          className={inputClassName.name}
          placeholder="상품명을 입력해주세요"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      {conditionError.name && (
        <div className="validConditionsContaner">
          <p className="validConditions">10자 이내로 입력해주세요</p>
        </div>
      )}
      <div id="registrationIntroduction" className="Registrationbox">
        <label htmlFor="productIntroduction" className="RegistrationLabel">
          상품 소개
        </label>
        <textarea
          name="introduction"
          value={values.introduction}
          id="productIntroduction"
          className={inputClassName.introduction}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      {conditionError.introduction && (
        <div className="validConditionsContaner">
          <p className="validConditions">10자 이상 입력해주세요</p>
        </div>
      )}
      <div className="Registrationbox">
        <label htmlFor="productPrice" className="RegistrationLabel">
          판매가격
        </label>
        <input
          name="price"
          value={values.price}
          id="productPrice"
          className={inputClassName.price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      {conditionError.price && (
        <div className="validConditionsContaner">
          <p className="validConditions">숫자로 입력해주세요</p>
        </div>
      )}
      <div className="Registrationbox">
        <label htmlFor="productTag" className="RegistrationLabel">
          태그
        </label>
        <input
          name="tag"
          value={values.tag}
          id="productTag"
          className={inputClassName.tag}
          placeholder="태그를 입력해주세요"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleAddTagArray}
        />
      </div>
      {conditionError.tag && (
        <div className="validConditionsContaner">
          <p className="validConditions">5글자 이내로 입력해주세요</p>
        </div>
      )}
      <ol>
        {tagArray.map((tags) => {
          return (
            <li>
              {`#${tags}`}
              <img
                src={tegDeleteImg}
                alt="X버튼"
                onClick={handleDeleteTagArray}
              />
            </li>
          );
        })}
      </ol>
    </form>
  );
}

export default RegistrationForm;
