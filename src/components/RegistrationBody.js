import { useState, useEffect } from "react";
import Button from "./Button";
import "../assets/styles/registration.css";

const MAX_PRODUCT_NAME_LENGTH = 10;
const MIN_PRODUCT_NAME_LENGTH = 1;
const MAX_PRODUCT_DESCRIPTION_LENGTH = 100;
const MIN_PRODUCT_DESCRIPTION_LENGTH = 10;
const MAX_PRODUCT_TAG_LENGTH = 5;
const MAX_TAG_NUM = 5;
let tags = [];
let secondFrameName = false;
let secondFrameDescription = false;
let secondFramePrice = false;
let secondFrameTag = false;

const nameOriginClass =
  "Text-lg-line-height24 Regular main__registration-input-small";
let nameClass = nameOriginClass;

const descriptionOriginClass =
  "Text-lg-line-height24 Regular main__registration-input-big";
let descriptionClass = descriptionOriginClass;

const priceOriginClass =
  "Text-lg-line-height24 Regular main__registration-input-small";
let priceClass = priceOriginClass;

const tagOriginClass =
  "Text-lg-line-height24 Regular main__registration-input-small";
let tagClass = tagOriginClass;

export function RegistrationBody() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productTag, setProductTag] = useState("");

  function validateName() {
    const length = productName.toString().trim().length;

    nameClass = `${nameOriginClass} input-invalid`;

    if (length < MIN_PRODUCT_NAME_LENGTH) {
      return (
        <p className="input-invalid-warn Semibold">1자 이상 입력해주세요</p>
      );
    } else if (MAX_PRODUCT_NAME_LENGTH < length) {
      return (
        <p className="input-invalid-warn Semibold">10자 이내로 입력해주세요</p>
      );
    } else {
      nameClass = `${nameOriginClass} input-valid`;
    }
  }

  function validateDescription() {
    const length = productDescription.toString().trim().length;

    descriptionClass = `${descriptionOriginClass} input-invalid`;

    if (length < MIN_PRODUCT_DESCRIPTION_LENGTH) {
      return (
        <p className="input-invalid-warn Semibold">10자 이상 입력해주세요</p>
      );
    } else if (MAX_PRODUCT_DESCRIPTION_LENGTH < length) {
      return (
        <p className="input-invalid-warn Semibold">100자 이내로 입력해주세요</p>
      );
    } else {
      descriptionClass = `${descriptionOriginClass} input-valid`;
    }
  }

  function validatePrice() {
    const priceNum = isNaN(productPrice.toString().trim());

    priceClass = `${priceOriginClass} input-invalid`;

    if (priceNum) {
      return <p className="input-invalid-warn Semibold">숫자로 입력해주세요</p>;
    } else if (Number(productPrice) < 0) {
      return (
        <p className="input-invalid-warn Semibold">
          0 이상 숫자로 입력해주세요
        </p>
      );
    } else {
      priceClass = `${priceOriginClass} input-valid`;
    }
  }

  function validateTag() {
    const length = productTag.toString().trim().length;

    tagClass = `${tagOriginClass} input-invalid`;

    if (MAX_PRODUCT_TAG_LENGTH < length) {
      console.log("5자 이내로 입력해주세요");
      return (
        <p className="input-invalid-warn Semibold">5글자 이내로 입력해주세요</p>
      );
    } else {
      tagClass = `${tagOriginClass} input-valid`;
    }
  }

  function handleProductName(e) {
    secondFrameName = true;
    setProductName(e.target.value);
  }

  function handleProductDescription(e) {
    secondFrameDescription = true;
    setProductDescription(e.target.value);
  }

  function handleProductPrice(e) {
    secondFramePrice = true;
    setProductPrice(e.target.value);
  }

  function handelProductTag(e) {
    secondFrameTag = true;
    setProductTag(e.target.value);
  }

  function submitProductTag(e) {
    e.preventDefault();

    if (
      tags.length < MAX_TAG_NUM &&
      e.target.value.toString().trim() < MAX_PRODUCT_TAG_LENGTH
    ) {
      tags.push(productTag);
      setProductTag("");
    } else {
    }
    console.log(tags);
  }

  function handleRegistration() {
    alert("registration");
    const body = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tag: [tags],
    };
  }

  useEffect(() => {}, [productTag]);

  let btnRegistClass = "btn-registration-74-decative";

  return (
    <main className="main-frame-registration">
      <div className="main__section-registration">
        <div className="flex-row main__registration-top-bar">
          <p className="Text-xl Bold main__registration-text">상품 등록하기</p>
          <Button className={btnRegistClass} onClick={handleRegistration} />
        </div>
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">상품명</label>
        <input
          onChange={handleProductName}
          className={nameClass}
          placeholder="상품명의 입력해주세요"
        ></input>
        {secondFrameName ? validateName() : undefined}
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">상품 소개</label>
        <textarea
          onChange={handleProductDescription}
          className={descriptionClass}
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
        {secondFrameDescription ? validateDescription() : undefined}
      </div>
      <div className="main__registration-input-margin">
        <label className="main__registration-label">판매가격</label>
        <input
          onChange={handleProductPrice}
          className={priceClass}
          placeholder="판매 가격을 입력해주세요"
        ></input>
        {secondFramePrice ? validatePrice() : undefined}
      </div>
      <form
        className="main__registration-input-margin"
        onSubmit={submitProductTag}
      >
        <label className="main__registration-label">태그</label>
        <input
          onChange={handelProductTag}
          value={productTag}
          className={tagClass}
          placeholder="태그를 입력해주세요"
        ></input>
        {secondFrameTag ? validateTag() : undefined}
      </form>
    </main>
  );
}

export default RegistrationBody;
