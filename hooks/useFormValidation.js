import { useState, useEffect } from "react";

export default function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // 실시간 검사
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true, // 필드가 포커스를 잃으면 true로 설정
    });
  };

  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  return {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  };
}
