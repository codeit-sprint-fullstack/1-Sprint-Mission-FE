import React, { useState } from "react";
import useForm from "../hook/form";

const LoginForm = () => {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      email: "",
      password: "",
    });

  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validate = () => {
    let validationErrors = {};

    if (!values.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!values.password) {
      validationErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  // 폼 제출 시 처리하는 함수
  const submitForm = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", values);
      resetForm(); // 폼 리셋
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
