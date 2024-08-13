import { useState } from 'react';

const usePriceValidation = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false); // 초기 상태를 false로 설정
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (value) => {
    if (value.length === 0) {
      setIsValid(false);
      setErrorMessage('가격을 입력해주세요');
    } else if (!/^\d+$/.test(value)) {
      setIsValid(false);
      setErrorMessage('숫자로 입력해주세요');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue);
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate(value);
  };

  return {
    value,
    isValid,
    isTouched,
    errorMessage,
    handleChange,
    handleBlur,
    setValue,
  };
};

export default usePriceValidation;
