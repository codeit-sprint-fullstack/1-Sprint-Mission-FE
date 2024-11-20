import { useState } from 'react';

// 제네릭을 사용하여 initialValues의 타입을 지정합니다.
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 입력값 변경 시 호출되는 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit =
    (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
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
