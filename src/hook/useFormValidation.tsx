import { FormErrors, FormValues, ValidateFunction } from "@/types/Types";
import { useState } from "react";

export default function useFormValidation(
  initialState: FormValues,
  validate: ValidateFunction
) {
  const [values, setValues] = useState<FormValues>(initialState); // 입력 필드의 값 관리
  const [errors, setErrors] = useState<FormErrors>({}); // 유효성 검사 에러 메시지 관리

  // 입력 필드 값 변경 처리 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit =
    (onSubmit: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
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
