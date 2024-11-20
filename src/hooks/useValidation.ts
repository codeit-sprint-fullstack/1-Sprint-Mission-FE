import { useState } from "react";

interface ProductFormValues {
  productName: string;
  productIntro: string;
  productPrice: string;
}

interface ProductErrors {
  productName?: string;
  productIntro?: string;
  productPrice?: string;
}

export function useProductValidation(initialState: ProductFormValues) {
  const [values, setValues] = useState<ProductFormValues>(initialState);
  const [errors, setErrors] = useState<ProductErrors>({});

  const validate = (name: keyof ProductFormValues, value: string): string => {
    let error = "";
    if (name === "productName") {
      if (!value.trim()) {
        error = "상품명을 입력해주세요.";
      } else if (value.length < 1 || value.length > 10) {
        error = "상품명은 1자 이상 10자 이하로 입력해주세요.";
      }
    } else if (name === "productIntro") {
      if (!value.trim()) {
        error = "상품 소개를 입력해주세요.";
      } else if (value.length < 10 || value.length > 200) {
        error = "상품 소개는 10자 이상 200자 이하로 입력해주세요.";
      }
    } else if (name === "productPrice") {
      if (!value.trim()) {
        error = "판매 가격을 입력해주세요.";
      } else if (!/^[0-9]+$/.test(value)) {
        error = "판매 가격은 숫자만 입력 가능합니다.";
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
    validate(name as keyof ProductFormValues, value);
  };

  return {
    values,
    errors,
    handleChange,
    setValues,
  };
}
