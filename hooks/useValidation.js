import { useState } from "react";

export function useValidateForm() {
  const initialState = {
    title: "",
    content: "",
  };

  const validations = {
    title: {
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    content: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    if (validations[name]) {
      if (validations[name].required && !value) {
        error = "필수 입력 항목입니다.";
      } else if (
        validations[name].minLength &&
        value.length < validations[name].minLength
      ) {
        error = `${validations[name].minLength}자 이상 입력해주세요`;
      } else if (
        validations[name].maxLength &&
        value.length > validations[name].maxLength
      ) {
        error = `${validations[name].maxLength}자 이하로 입력해주세요`;
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
