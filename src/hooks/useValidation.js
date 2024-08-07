import { useState } from 'react';

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!values.name || values.name.length > 10) {
      newErrors.name = '10자 이내로 입력해주세요';
    }

    if (!values.description || values.description.length < 10) {
      newErrors.description = '10자 이상 입력해주세요';
    }

    if (!values.price || isNaN(values.price)) {
      newErrors.price = '숫자로 입력해주세요';
    }

    if (!values.tags || values.tags.some(tag => tag.length > 5)) {
      newErrors.tags = '5글자 이내로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;

