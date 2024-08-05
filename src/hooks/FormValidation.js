import { useState } from "react";

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.length >= 1 && value.length <= 10
        ? ""
        : "상품명은 1자리 이상 10자리 이내 입니다.";
    case "decription":
      return value.length >= 10 && value.length <= 100
        ? ""
        : "상품 소개는 10자리 이상 100자리 이내 입니다.";
    case "price":
      return value > 0 ? "" : "판매 가격은 1원 이상입니다.";
    case "tag":
      return value.length <= 5 ? "" : "각 태그는 5자리 이내 입니다.";
    default:
      return "";
  }
};

const useFormValidation = (initialValues, callback) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    // 유효성 검사
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    if (!error) setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 모든 필드 유효성 검사
    const newErrors = {};
    let hasErrors = false;

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setDisabled(true);
      return;
    }
    callback(values);
  };

  return {
    values,
    errors,
    disabled,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
