import { useState } from "react";

const validateField = (name, value) => {
  switch (name) {
    case "title":
      return value.length >= 1 && value.length <= 15
        ? ""
        : "제목은 1자리 이상 15자리 이내 입니다.";
    case "name":
      return value.length >= 1 && value.length <= 10
        ? ""
        : "상품명은 1자리 이상 10자리 이내 입니다.";
    case "description":
      return value.length >= 10 && value.length <= 100
        ? ""
        : "내용은 10자리 이상 100자리 이내 입니다.";
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
  const [chips, setChips] = useState([]);
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
    setDisabled(!!error);
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

  const handleChips = (e) => {
    if (errors.tag) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() !== "") {
        setChips((prev) => [...prev, e.target.value]);
        values.tag = "";
      }
    }
  };

  const handleRemoveChip = (index) => {
    setChips((prev) => prev.filter((_, id) => id !== index));
  };

  return {
    values,
    errors,
    disabled,
    chips,
    handleChange,
    handleSubmit,
    handleChips,
    handleRemoveChip,
  };
};

export default useFormValidation;
