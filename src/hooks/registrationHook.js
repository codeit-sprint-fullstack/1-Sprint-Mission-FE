import { useState, useEffect } from 'react';

const validatePrice = {
  pattern: /^[0-9,]+$/,
};

const useValidation = (values) => {
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  useEffect(() => {
    const validate = () => {
      let errors = {};

      // 상품명 검증
      if (values.name.length < 1 || values.name.length > 10) {
        errors.name = '상품명은 1자 이상 10자 이내여야 합니다.';
      }

      // 상품 소개 검증
      if (values.description.length < 10 || values.description.length > 100) {
        errors.description = '상품 소개는 10자 이상 100자 이내여야 합니다.';
      }

      // 판매 가격 검증
      if (!validatePrice.pattern.test(values.price)) {
        errors.price = '숫자로 입력해 주세요';
      }

      if (values.tags.length > 5) {
        errors.tags = '태그는 5글자 이내여야 합니다.';
      }

      setErrors(errors);
    };

    validate();
  }, [values]);

  return errors;
};

export default useValidation;
