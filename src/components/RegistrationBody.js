import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PRODUCT_API_ADDRESS } from "../utils/constants";
import Button from "./Button";
import Tag from "./Tag";
import Loading from "./Loading";
import "../assets/styles/registration.css";

const instance = axios.create({
  baseURL: PRODUCT_API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

const PATH = "/products";

const MAX_PRODUCT_NAME_LENGTH = 10;
const MIN_PRODUCT_NAME_LENGTH = 1;
const MAX_PRODUCT_DESCRIPTION_LENGTH = 100;
const MIN_PRODUCT_DESCRIPTION_LENGTH = 10;
const MAX_PRODUCT_TAG_LENGTH = 5;
const MAX_TAG_NUM = 5;

let secondFrameName = false;
let secondFrameDescription = false;
let secondFramePrice = false;
let secondFrameTag = false;

let validName = false;
let validDescription = false;
let validPrice = false;

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
  const [productTags, setProductTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function validateName() {
    const length = productName.toString().trim().length;

    nameClass = `${nameOriginClass} input-invalid`;
    validName = false;

    if (length < MIN_PRODUCT_NAME_LENGTH) {
      return (
        <p className="input-invalid-warn Semibold">1자 이상 입력해주세요</p>
      );
    } else if (MAX_PRODUCT_NAME_LENGTH < length) {
      return (
        <p className="input-invalid-warn Semibold">10자 이내로 입력해주세요</p>
      );
    } else {
      validName = true;
      nameClass = `${nameOriginClass} input-valid`;
    }
  }

  function validateDescription() {
    const length = productDescription.toString().trim().length;

    descriptionClass = `${descriptionOriginClass} input-invalid`;
    validDescription = false;

    if (length < MIN_PRODUCT_DESCRIPTION_LENGTH) {
      return (
        <p className="input-invalid-warn Semibold">10자 이상 입력해주세요</p>
      );
    } else if (MAX_PRODUCT_DESCRIPTION_LENGTH < length) {
      return (
        <p className="input-invalid-warn Semibold">100자 이내로 입력해주세요</p>
      );
    } else {
      validDescription = true;
      descriptionClass = `${descriptionOriginClass} input-valid`;
    }
  }

  function validatePrice() {
    const priceNum = isNaN(productPrice.toString().trim());

    priceClass = `${priceOriginClass} input-invalid`;
    validPrice = false;

    if (priceNum) {
      return <p className="input-invalid-warn Semibold">숫자로 입력해주세요</p>;
    } else if (Number(productPrice) < 0) {
      return (
        <p className="input-invalid-warn Semibold">
          0 이상 숫자로 입력해주세요
        </p>
      );
    } else {
      validPrice = true;
      priceClass = `${priceOriginClass} input-valid`;
    }
  }

  function validateTag() {
    const length = productTag.toString().trim().length;

    tagClass = `${tagOriginClass} input-invalid`;

    if (length > 0 && MAX_TAG_NUM <= productTags.length) {
      return (
        <p className="input-invalid-warn Semibold">
          태그는 최대 5개까지 입력 가능합니다
        </p>
      );
    } else if (MAX_PRODUCT_TAG_LENGTH < length) {
      return (
        <p className="input-invalid-warn Semibold">5글자 이내로 입력해주세요</p>
      );
    } else {
      tagClass = `${tagOriginClass} input-valid`;
    }
  }

  function validateReqData() {
    let btnRegistClass = "btn-registration-74-deactive";

    if (validName && validDescription && validPrice) {
      btnRegistClass = "btn-registration-74-active";
      return <Button className={btnRegistClass} onClick={handleRegistration} />;
    } else {
      return <Button className={btnRegistClass} onClick={doNothing} />;
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
    const newTag = productTag.toString().trim();

    if (
      productTags.length < MAX_TAG_NUM &&
      0 < newTag.length &&
      newTag.length < MAX_PRODUCT_TAG_LENGTH + 1 &&
      !productTags.includes(newTag)
    ) {
      const newTags = [...productTags, newTag];
      setProductTags(newTags);
      setProductTag("");
    } else {
    }
  }

  function handleRegistration() {
    const headers = {
      Authorization: 99,
    };
    const body = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tags: productTags,
      ownerId: 99,
    };

    setLoading(true);

    instance
      .post(PATH, body, { headers })
      .then((res) => {
        setLoading(false);
        const productId = res.data._id;
        const productPath = `/item/${productId}`;
        navigate(productPath);
      })
      .catch((err) => {
        console.log(err.name);
        setLoading(false);
      });
  }

  function deleteTag(tag) {
    console.log("deleteTag " + tag);
    const newTags = productTags.filter((item) => item !== tag);
    setProductTags(newTags);
  }

  function showTags() {
    return (
      <div className="flex-row main__registration-tags">
        {productTags.map((tag) => (
          <Tag key={tag} onXClick={deleteTag}>
            {tag}
          </Tag>
        ))}
      </div>
    );
  }

  function doNothing() {}

  return (
    <main className="main-frame-registration">
      {loading ? <Loading /> : undefined}
      <div className="main__section-registration">
        <div className="flex-row main__registration-top-bar">
          <p className="Text-xl Bold main__registration-text">상품 등록하기</p>
          {validateReqData()}
        </div>
      </div>
      <div className="margin-bottom24">
        <label className="main__registration-label Bold">상품명</label>
        <input
          onChange={handleProductName}
          className={nameClass}
          placeholder="상품명의 입력해주세요"
        ></input>
        {secondFrameName ? validateName() : undefined}
      </div>
      <div className="margin-bottom24">
        <label className="main__registration-label Bold">상품 소개</label>
        <textarea
          onChange={handleProductDescription}
          className={descriptionClass}
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
        {secondFrameDescription ? validateDescription() : undefined}
      </div>
      <div className="margin-bottom24">
        <label className="main__registration-label Bold">판매가격</label>
        <input
          onChange={handleProductPrice}
          className={priceClass}
          placeholder="판매 가격을 입력해주세요"
        ></input>
        {secondFramePrice ? validatePrice() : undefined}
      </div>
      <div>
        <form className="margin-bottom12" onSubmit={submitProductTag}>
          <label className="main__registration-label Bold">태그</label>
          <input
            onChange={handelProductTag}
            value={productTag}
            className={tagClass}
            placeholder="태그를 입력해주세요"
          ></input>
          {secondFrameTag ? validateTag() : undefined}
        </form>
        {showTags()}
      </div>
    </main>
  );
}

export default RegistrationBody;
