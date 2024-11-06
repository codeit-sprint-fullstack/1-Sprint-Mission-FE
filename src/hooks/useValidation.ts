import { useState } from "react";
import { FormValues, ValidationRules } from "@/types/Types";

export function useValidateForm(
  initialState: FormValues,
  validations: ValidationRules
) {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (name: string, value: any): string => {
    let error = "";
    const rules = validations[name];

    if (rules) {
      if (
        rules.required &&
        (typeof value === "string" ? !value.trim() : value.length === 0)
      ) {
        error = "필수 항목입니다.";
      } else if (typeof value === "string") {
        if (rules.minLength && value.length < rules.minLength) {
          error = `${rules.minLength}자 이상 입력해주세요`;
        } else if (rules.maxLength && value.length > rules.maxLength) {
          error = `${rules.maxLength}자 이하로 입력해주세요`;
        } else if (rules.pattern && !rules.pattern.test(value)) {
          error = "유효한 형식이 아닙니다.";
        }
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
    validate(name, value);
  };

  const handleSubmit =
    (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
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
