import { useState } from 'react';

const useTitleValidation = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false); // 초기 상태를 false로 설정
  const [isTouched, setIsTouched] = useState(false);

  const validate = (value) => {
    if (value.length >= 1 && value.length <= 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
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
    handleChange,
    handleBlur,
  };
};

export default useTitleValidation;
