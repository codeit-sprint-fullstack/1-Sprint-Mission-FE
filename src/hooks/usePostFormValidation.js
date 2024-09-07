import { useState, useEffect } from "react";

export default function usePostFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validate();
    }
  }, [values, touched]);

  const validate = () => {
    const newErrors = {};

    if (
      touched.title &&
      (!values.title || values.title.length < 1 || values.title.length > 20)
    ) {
      newErrors.title = "제목은 1자 이상 20자 이내로 입력해주세요."; // name -> title
    }

    if (
      touched.content &&
      (!values.content ||
        values.content.length < 10 ||
        values.content.length > 100)
    ) {
      newErrors.content = "내용은 10자 이상 100자 이내로 입력해주세요."; // description -> content
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  return { values, setValues, errors, validate, handleBlur };
}
