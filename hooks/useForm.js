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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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

    setTouched((prevTouched) => {
      const newTouched = { ...prevTouched };
      Object.keys(formData).forEach((field) => {
        if (formData[field] !== "") {
          newTouched[field] = true;
        }
      });
      return newTouched;
    });
  }, [formData, mode]);

  return { formData, handleChange, handleBlur, errors, touched, isFormValid };
};
