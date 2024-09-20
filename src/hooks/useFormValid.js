import { useState, useEffect } from "react";

function useFormValid(formData) {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.length < 1) {
      newErrors.name = "상품명은 1자 이상 입력해야 합니다.";
    } else if (formData.name.length > 10) {
      newErrors.name = "상품명은 10자 이내여야 합니다.";
    }

    if (formData.description.length < 10) {
      newErrors.description = "상품 소개는 10자 이상 입력해야 합니다.";
    } else if (formData.description.length > 100) {
      newErrors.description = "상품 소개는 100자 이내여야 합니다.";
    }

    if (!formData.price) {
      newErrors.price = "판매 가격을 입력해야 합니다.";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "판매 가격은 숫자로 입력해야 합니다.";
    }

    if (formData.tags.some((tag) => tag.length > 5)) {
      newErrors.tags = "태그는 5글자 이내여야 합니다.";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  return { errors, isValid };
}

export default useFormValid;
