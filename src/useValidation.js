import { useState } from "react";

export function useValidation(initailState) {
  const [values, setValues] = useState(initailState);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "상품명을 입력해주세요.";
        else if (value.length > 10) error = "10자 이내로 입력해주세요.";
        break;
      case "description":
        if (!value) error = "상품 소개를 입력해주세요.";
        else if (value.length < 10 || value.length > 100)
          error = "10자 이상 입력해주세요.";
        break;
      case "price":
        if (!value) error = "판매 가격을 입력해주세요.";
        else if (isNaN(Number(value))) error = "숫자로 입력해주세요.";
        break;
      case "tags":
        if (value.length > 5) error = "5자 이내로 입력해주세요.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    const error = validate(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
}
