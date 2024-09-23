import { useState } from "react";

export function validateForm(formData) {
  const errors = {};
  if (!formData.title || formData.title.trim() === "") {
    errors.title = "제목을 입력해주세요";
  }
  if (!formData.content || formData.content.trim() === "") {
    errors.content = "내용을 입력해주세요";
  }

  return errors;
}

export function validateCreateForm(formData) {
  const initialState = {
    productName: "",
    productIntro: "",
    productPrice: "",
    productTag: "",
    productImage: "",
  };

  const validations = {
    productName: {
      required: true,
      minLength: 1,
      maxLength: 10,
    },
    productIntro: {
      required: true,
      minLength: 10,
      maxLength: 100,
    },
    productPrice: {
      required: true,
      pattern: /^[0-9]+$/,
    },
    productTag: {
      maxLength: 5,
    },
    productImage: {
      required: true,
    },
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    if (validations[name]) {
      if (
        validations[name].minLength &&
        value.length < validations[name].minLength
      ) {
        error = `${validations[name].minLength}자 이상 입력해주세요`;
      } else if (
        validations[name].maxLength &&
        value.length > validations[name].maxLength
      ) {
        error = `${validations[name].maxLength}자 이하로 입력해주세요`;
      } else if (
        validations[name].pattern &&
        !validations[name].pattern.test(value)
      ) {
        error = "숫자로 입력해주세요";
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
