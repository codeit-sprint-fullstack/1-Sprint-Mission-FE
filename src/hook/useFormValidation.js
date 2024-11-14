import { useState } from "react";

export default function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState); // 입력 필드의 값 관리
  const [errors, setErrors] = useState({}); // 유효성 검사 에러 메시지 관리

  // 입력 필드 값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 입력 값 업데이트
    setValues({
      ...values,
      [name]: value,
    });
    const n = name;

    // 실시간 유효성 검사
    const error = validate(name, value, values);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit();
    // const newErrors = {};

    // // 모든 필드 유효성 검사 실행
    // for (const key in values) {
    //   const error = validate(key, values[key], values);
    //   if (error) {
    //     newErrors[key] = error;
    //   }
    // }

    // // 에러가 있으면 상태에 저장, 없으면 onSubmit 함수 호출
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   onSubmit();
    // }
  };

  return {
    initialState,
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  };
}
