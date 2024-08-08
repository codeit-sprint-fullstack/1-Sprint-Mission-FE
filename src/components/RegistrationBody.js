import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidateInput from "./hooks/useValidateInput";
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
const WARN_MAX_PRODUCT_NAME_LENGTH = 410;
const MIN_PRODUCT_NAME_LENGTH = 1;
const WARN_MIN_PRODUCT_NAME_LENGTH = 401;
const VALID_DATA = 0;
const MAX_PRODUCT_DESCRIPTION_LENGTH = 100;
const WARN_MAX_PRODUCT_DESCRIPTION_LENGTH = 500;
const MIN_PRODUCT_DESCRIPTION_LENGTH = 10;
const WARN_MIN_PRODUCT_DESCRIPTION_LENGTH = 410;
const MAX_PRODUCT_TAG_LENGTH = 5;
const WARN_NOT_NUMBER = 404;
const WARN_MAX_PRODUCT_TAG_LENGTH = 404;
const MAX_TAG_NUM = 5;
const WARN_MAX_TAG_NUM = 405;

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
  const [productTags, setProductTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function validateName(value) {
    const length = value.length;

    if (length < MIN_PRODUCT_NAME_LENGTH) {
      return WARN_MIN_PRODUCT_NAME_LENGTH;
    } else if (MAX_PRODUCT_NAME_LENGTH < length) {
      return WARN_MAX_PRODUCT_NAME_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const name = useValidateInput(validateName);

  function invalidNameWarn() {
    switch (name.isValid) {
      case WARN_MIN_PRODUCT_NAME_LENGTH: {
        nameClass = `${nameOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">1자 이상 입력해주세요</p>
        );
      }
      case WARN_MAX_PRODUCT_NAME_LENGTH: {
        nameClass = `${nameOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">
            10자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        nameClass = `${nameOriginClass} input-valid`;
        return undefined;
      }
    }
  }

  function validateDsecription(value) {
    const length = value.length;

    if (length < MIN_PRODUCT_DESCRIPTION_LENGTH) {
      return WARN_MIN_PRODUCT_DESCRIPTION_LENGTH;
    } else if (MAX_PRODUCT_DESCRIPTION_LENGTH < length) {
      return WARN_MAX_PRODUCT_DESCRIPTION_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const description = useValidateInput(validateDsecription);

  function invalidDescriptionWarn() {
    switch (description.isValid) {
      case WARN_MIN_PRODUCT_DESCRIPTION_LENGTH: {
        descriptionClass = `${descriptionOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">10자 이상 입력해주세요</p>
        );
      }
      case WARN_MAX_PRODUCT_DESCRIPTION_LENGTH: {
        descriptionClass = `${descriptionOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">
            100자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        descriptionClass = `${descriptionOriginClass} input-valid`;
        return undefined;
      }
    }
  }

  function validatePrice(value) {
    const dotCheck = value.endsWith(".");
    const priceNum = Number(value);
    const isNumber = Number.isInteger(priceNum);

    if (!isNumber || dotCheck) {
      return WARN_NOT_NUMBER;
    } else if (value < 0) {
      return -1;
    } else {
      return 1;
    }
  }

  const price = useValidateInput(validatePrice);

  function invalidPriceWarn() {
    switch (price.isValid) {
      case WARN_NOT_NUMBER: {
        priceClass = `${priceOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">숫자로 입력해주세요</p>
        );
      }
      case -1: {
        priceClass = `${priceOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">
            0 이상 숫자로 입력해주세요
          </p>
        );
      }
      case 1:
      default: {
        priceClass = `${priceOriginClass} input-valid`;
        return undefined;
      }
    }
  }

  function validateTag(value) {
    const length = value.length;

    if (0 < length && MAX_TAG_NUM <= productTags.length) {
      return WARN_MAX_TAG_NUM;
    } else if (MAX_PRODUCT_TAG_LENGTH < length) {
      return WARN_MAX_PRODUCT_TAG_LENGTH;
    } else {
      return VALID_DATA;
    }
  }

  const tag = useValidateInput(validateTag);

  function invalidTagWarn() {
    console.log("tag.isValid " + tag.isValid);
    switch (tag.isValid) {
      case WARN_MAX_TAG_NUM: {
        tagClass = `${tagOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">
            태그는 최대 5개까지 입력 가능합니다
          </p>
        );
      }
      case WARN_MAX_PRODUCT_TAG_LENGTH: {
        tagClass = `${tagOriginClass} input-invalid`;
        return (
          <p className="input-invalid-warn Semibold">
            5글자 이내로 입력해주세요
          </p>
        );
      }
      case VALID_DATA:
      default: {
        tagClass = `${tagOriginClass} input-valid`;
        return undefined;
      }
    }
  }

  function validateReqData() {
    let btnRegistClass = "btn-registration-74-deactive";

    if (name.isValid && description.isValid && price.isValid) {
      btnRegistClass = "btn-registration-74-active";
      return <Button className={btnRegistClass} onClick={handleRegistration} />;
    } else {
      return <Button className={btnRegistClass} onClick={doNothing} />;
    }
  }

  function submitProductTag(e) {
    e.preventDefault();
    const newTag = tag.value;

    if (
      productTags.length < MAX_TAG_NUM &&
      0 < newTag.length &&
      newTag.length < MAX_PRODUCT_TAG_LENGTH + 1 &&
      !productTags.includes(newTag)
    ) {
      const newTags = [...productTags, newTag];
      setProductTags(newTags);
      tag.setValue("");
    } else {
    }
  }

  function handleRegistration() {
    // 권한 테스트를 위한 임시 로직
    const headers = {
      Authorization: 99,
    };
    const body = {
      name: name.value,
      description: description.value,
      price: price.value,
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
          onChange={name.onChange}
          className={nameClass}
          value={name.value}
          placeholder="상품명의 입력해주세요"
        ></input>
        {invalidNameWarn()}
      </div>
      <div className="margin-bottom24">
        <label className="main__registration-label Bold">상품 소개</label>
        <textarea
          onChange={description.onChange}
          className={descriptionClass}
          value={description.value}
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
        {invalidDescriptionWarn()}
      </div>
      <div className="margin-bottom24">
        <label className="main__registration-label Bold">판매가격</label>
        <input
          onChange={price.onChange}
          className={priceClass}
          value={price.value}
          placeholder="판매 가격을 입력해주세요"
        ></input>
        {invalidPriceWarn()}
      </div>
      <div>
        <form className="margin-bottom12" onSubmit={submitProductTag}>
          <label className="main__registration-label Bold">태그</label>
          <input
            onChange={tag.onChange}
            className={tagClass}
            value={tag.value}
            placeholder="태그를 입력해주세요"
          ></input>
          {invalidTagWarn()}
        </form>
        {showTags()}
      </div>
    </main>
  );
}

export default RegistrationBody;
