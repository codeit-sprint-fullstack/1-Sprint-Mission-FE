import { useState, useEffect } from 'react';

const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate(); // 입력 값에 따라 유효성 검사 실시
  }, [values]);

};

export default useFormValidation;