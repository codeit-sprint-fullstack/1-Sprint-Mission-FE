import { useState, useCallback, useEffect } from "react";
import { validateField, validateForm } from "@/utils/validation";

export const useForm = (mode) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const newData = { ...prev, [name]: value };
        const newErrors = validateForm(newData, mode);
        setErrors(newErrors);
        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
        return newData;
      });
    },
    [mode]
  );

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  useEffect(() => {
    const newErrors = validateForm(formData, mode);
    setErrors(newErrors);

    const fieldsToValidate =
      mode === "login"
        ? ["email", "password"]
        : ["email", "password", "confirmPassword", "nickname"];

    const isValid = fieldsToValidate.every(
      (field) => formData[field].trim() !== "" && !newErrors[field]
    );

    setIsFormValid(isValid);
  }, [formData, mode]);

  return { formData, handleChange, handleBlur, errors, touched, isFormValid };
};
