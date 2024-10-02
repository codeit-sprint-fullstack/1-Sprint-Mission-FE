import { useState } from "react";

export function useValidateForm(initialState, validations) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    const rules = validations[name];

    if (rules) {
      if (rules.required && !value) {
        error = "필수 항목입니다.";
      } else if (rules.minLength && value.length < rules.minLength) {
        error = `${rules.minLength}자 이상 입력해주세요`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        error = `${rules.maxLength}자 이하로 입력해주세요`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        error = "유효한 형식이 아닙니다.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    let isValid = true;
    for (const name in validations) {
      const error = validate(name, values[name]);
      if (error) {
        isValid = false;
      }
    }
    if (isValid) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  };
}
