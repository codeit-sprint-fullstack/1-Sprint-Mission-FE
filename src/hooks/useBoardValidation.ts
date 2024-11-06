// useBoardValidation.ts
import { useState } from "react";

interface FormValues {
  title: string;
  content: string;
}

interface ValidationErrors {
  title?: string;
  content?: string;
}

export function useBoardValidation(initialState: FormValues) {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // 유효성 검사 규칙 정의
  const validations = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 10,
      errorMessage: {
        required: "제목은 필수 항목입니다.",
        minLength: "제목은 최소 3자 이상이어야 합니다.",
        maxLength: "제목은 최대 10자 이하여야 합니다.",
      },
    },
    content: {
      required: true,
      minLength: 10,
      maxLength: 100,
      errorMessage: {
        required: "내용은 필수 항목입니다.",
        minLength: "내용은 최소 10자 이상이어야 합니다.",
        maxLength: "내용은 최대 100자 이하여야 합니다.",
      },
    },
  };

  const validateField = (name: keyof FormValues, value: string) => {
    let error = "";
    const rules = validations[name];

    if (rules) {
      if (rules.required && !value.trim()) {
        error = rules.errorMessage.required;
      } else if (rules.minLength && value.length < rules.minLength) {
        error = rules.errorMessage.minLength;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        error = rules.errorMessage.maxLength;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    validateField(name as keyof FormValues, value);
  };

  return {
    values,
    errors,
    handleChange,
    setValues,
  };
}
