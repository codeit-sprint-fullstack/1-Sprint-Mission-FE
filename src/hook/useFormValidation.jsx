import { useState } from 'react';

function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (value.length < 1 || value.length > 10) {
          error = '10자 이내로 입력해주세요';
        }
        break;

      case 'description':
        if (value.length < 10 || value.length > 100) {
          error = '10자 이상 입력해주세요';
        }
        break;

      case 'price':
        if (!value || isNaN(value)) {
          error = '숫자로 입력해주세요';
        }
        break;

      case 'tag':
        if (value.length > 5 || value.length < 1) {
          error = '5글자 이내로 입력해주세요';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  return { errors, validate };
}

export default useFormValidation;
