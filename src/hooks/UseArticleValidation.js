import { useState, useCallback } from "react";

const validationRules = {
  name: (value) =>
    value.length >= 1 && value.length <= 10 ? "" : "10자 이내로 입력해주세요",
  description: (value) =>
    value.length >= 10 && value.length <= 100 ? "" : "10자 이상 입력해주세요",
  price: (value) => (!isNaN(value) && value ? "" : "숫자로 입력해주세요"),
  tag: (value) =>
    value.length >= 1 && value.length <= 5 ? "" : "1~5자 이내로 입력해주세요",
};

function useFormValidation() {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (field, value) => {
    const errorMessage = validationRules[field]?.(value) || "";
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const validateAllFields = useCallback((fieldValues) => {
    const allFieldsValid = Object.keys(validationRules).every((field) => {
      return field === "tag" || !validationRules[field](fieldValues[field]);
    });
    setIsFormValid(allFieldsValid);
  }, []);

  return { errors, validateField, validateAllFields, isFormValid };
}

export default useFormValidation;
