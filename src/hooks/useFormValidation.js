import { useState, useEffect } from 'react';

const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate(); // 입력 값에 따라 유효성 검사 실시
  }, [values]);

  // 유효성 검사
  const validate = () => {
    const newErrors = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      newErrors.name = '상품명은 1자 이상 10자 이내로 입력해주세요.';
    }

    if (!values.description || values.description.length < 10 || values.description.length > 100) {
      newErrors.description = '상품 소개는 10자 이상 100자 이내로 입력해주세요.';
    }

    if (!values.price || isNaN(values.price) || values.price <= 0) {
      newErrors.price = '판매 가격은 1자 이상, 숫자로 입력해주세요.';
    }

    if (values.tags && values.tags.length > 5) {
      newErrors.tags = '태그는 5자 이하로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, setValues, errors, validate };
};

export default useFormValidation;