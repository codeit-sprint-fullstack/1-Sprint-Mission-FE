import React, { useState } from "react";

interface Props {
  initialValues: {};
  tags: string[];
}

interface Values {
  [key: string]: string | number;
}

const useFormValidation = (
  initialValues: Values,
  callback: any,
  tags: string[] = []
) => {
  const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [chips, setChips] = useState<string[]>(tags);
  const [disabled, setDisabled] = useState<boolean>(true);

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case "email":
        if (typeof value !== "string" || value.length < 1) {
          return "이메일을 입력해주세요";
        }
        return emailPattern.test(value) ? "" : "이메일형식을 확인해주세요";

      case "password":
        if (typeof value !== "string" || value.length < 1) {
          return "비밀번호를 입력해주세요";
        }
        return passwordPattern.test(value)
          ? ""
          : "비밀번호는 영문 + 숫자 + 특수기호 8자리 이상입니다.";

      case "passwordConfirmation":
        if (typeof value !== "string") {
          return "비밀번호를 확인해주세요"; // 에러 메시지 추가
        }
        return values.password !== value ? "비밀번호가 일치하지 않습니다" : "";

      case "title":
      case "name":
      case "nickname":
        if (typeof value !== "string") {
          return "유효한 값을 입력해주세요"; // 에러 메시지 추가
        }
        const length = value.length;
        if (name === "title") {
          return length >= 1 && length <= 15
            ? ""
            : "제목은 1자리 이상 15자리 이내 입니다.";
        } else if (name === "name" || name === "nickname") {
          return length >= 1 && length <= 10
            ? ""
            : "상품명은 1자리 이상 10자리 이내 입니다.";
        }
        break;

      case "description":
      case "content":
        if (typeof value !== "string") {
          return "유효한 값을 입력해주세요"; // 에러 메시지 추가
        }
        const contentLength = value.length;
        return contentLength >= 10 && contentLength <= 100
          ? ""
          : "내용은 10자리 이상 100자리 이내 입니다.";

      case "price":
        if (typeof value !== "number" || value <= 0) {
          return "판매 가격은 1원 이상입니다.";
        }
        return "";

      case "tags":
        if (typeof value !== "string") {
          return "유효한 태그를 입력해주세요"; // 에러 메시지 추가
        }
        const tags = value.split(","); // 문자열을 태그 배열로 분리 (예: "tag1,tag2")
        return tags.length <= 5 ? "" : "각 태그는 5자리 이내 입니다.";

      default:
        return "";
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    // 유효성 검사
    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
    setDisabled(!!error);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 모든 필드 유효성 검사
    const newErrors = {};
    let hasErrors = false;

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setDisabled(true);
      return;
    }
    callback(values);
  };

  const handleChips = (e) => {
    if (errors.tags) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() !== "") {
        setChips((prev) => [...prev, e.target.value]);
        values.tags = "";
      }
    }
  };

  const handleRemoveChip = (index) => {
    setChips((prev) => prev.filter((_, id) => id !== index));
  };

  return {
    values,
    errors,
    disabled,
    chips,
    handleChange,
    handleSubmit,
    handleChips,
    handleRemoveChip,
    setErrors,
  };
};

export default useFormValidation;
