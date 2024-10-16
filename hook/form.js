import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 변경 시 호출되는 함수
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    callback();
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setValues(initialValues);
    setIsSubmitting(false);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    isSubmitting,
    setValues,
  };
};

export default useForm;
