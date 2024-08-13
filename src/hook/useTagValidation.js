import { useState } from 'react';

const useTagValidation = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const validate = (value) => {
    if (value.length === 0 || value.length <= 5) {
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
    if (value.length > 0 && value.length > 5) {
      setIsValid(false);
    }
  };

  return {
    value,
    isValid,
    isTouched,
    handleChange,
    handleBlur,
    setValue,
  };
};

export default useTagValidation;
