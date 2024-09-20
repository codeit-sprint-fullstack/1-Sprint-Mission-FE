"use client";

import { useState, useEffect } from "react";

const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // 필드 터치여부

  // 필드가 터치된 경우에만 유효성 검사를 실행
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [values, touched]);

  // 유효성 검사
  const validate = () => {
    const newErrors = {};

    // 필드별 유효성 검사
    if (
      touched.name &&
      (!values.name || values.name.length < 1 || values.name.length > 10)
    ) {
      newErrors.name = "상품명은 1자 이상 10자 이내로 입력해주세요.";
    }

    if (
      touched.description &&
      (!values.description ||
        values.description.length < 10 ||
        values.description.length > 100)
    ) {
      newErrors.description =
        "상품 소개는 10자 이상 100자 이내로 입력해주세요.";
    }

    if (
      touched.price &&
      (!values.price || isNaN(values.price) || values.price <= 0)
    ) {
      newErrors.price = "판매 가격은 1자 이상, 숫자로 입력해주세요.";
    }

    if (touched.tags && values.tags && values.tags.length > 5) {
      newErrors.tags = "태그는 5자 이하로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 필드 터치 상태 업데이트 함수
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  return { values, setValues, errors, validate, handleBlur };
};

export default useFormValidation;
