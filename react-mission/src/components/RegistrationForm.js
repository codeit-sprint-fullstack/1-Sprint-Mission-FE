import "./RegistrationForm.css";
import { postApi } from "../api/api";
import { useState } from "react";
import useRegistationBlur from "./hook/useRegistationBlur";

function RegistrationForm() {
  const [values, setValues] = useState({
    name: "",
    introduction: "",
    price: "",
    tag: "",
  });
  const [tagArray, setTageArray] = useState([]);
  // const [conditionError, setConditionError] = useState({
  //   name: false,
  //   introduction: false,
  //   price: false,
  //   tag: false,
  // });
  // const [inputClassName, setInputClassName] = useState({
  //   name: "productInput borderNone",
  //   introduction: "productInput borderNone",
  //   price: "productInput borderNone",
  //   tag: "productInput borderNone",
  // });

  const [conditionError, inputClassName, handleBlurTrue, handleBlurFalse] =
    useRegistationBlur;

  // input 값
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  // 포커스 이동 시 에러 함수 (간소화 가능할 듯)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (value.length > 10) {
        // setConditionError((preConditionError) => ({
        //   ...preConditionError,
        //   name: true,
        // }));
        // setInputClassName((preInputClassName) => ({
        //   ...preInputClassName,
        //   name: "productInput borderError",
        // }));
        handleBlurFalse(name);
      } else if (conditionError.name && value.length <= 10) {
        //   setConditionError((preConditionError) => ({
        //     ...preConditionError,
        //     name: false,
        //   }));
        //   setInputClassName((preInputClassName) => ({
        //     ...preInputClassName,
        //     name: "productInput borderNone",
        //   }));
        // }
        handleBlurTrue(name);
      } else if (name === "introduction") {
        if (value.length < 10) {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   introduction: true,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   introduction: "productInput borderError",
          // }));
          handleBlurFalse(name);
        } else if (conditionError.introduction && value.length >= 10) {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   introduction: false,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   introduction: "productInput borderNone",
          // }));
          handleBlurTrue(name);
        }
      } else if (name === "price") {
        if (!/^\d*$/.test(value) && value !== "") {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   price: true,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   price: "productInput borderError",
          // }));
          handleBlurFalse(name);
        } else if (
          conditionError.price &&
          (value === "" || /^\d*$/.test(value))
        ) {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   price: false,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   price: "productInput borderNone",
          // }));
          handleBlurTrue(name);
        }
      } else if (name === "tag") {
        if (value.length > 5) {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   tag: true,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   tag: "productInput borderError",
          // }));
          handleBlurFalse(name);
        } else if (conditionError.introduction && value.length <= 5) {
          // setConditionError((preConditionError) => ({
          //   ...preConditionError,
          //   tag: false,
          // }));
          // setInputClassName((preInputClassName) => ({
          //   ...preInputClassName,
          //   tag: "productInput borderNone",
          // }));
          handleBlurTrue(name);
        }
      }
    }
  }; //고쳐야함

  return (
    <form className="RegistrationFormContaner">
      <div className="productRegistration">
        <p className="productRegistrationLabel">상품 등록하기</p>
        <button className="productRegistrationButton">등록</button>
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
        />
      </div>
      {conditionError.tag && (
        <div className="validConditionsContaner">
          <p className="validConditions">5글자 이내로 입력해주세요</p>
        </div>
      )}
    </form>
  );
}

export default RegistrationForm;
