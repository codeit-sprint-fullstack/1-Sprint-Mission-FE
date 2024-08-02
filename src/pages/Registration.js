import React from "react";
import useFormValidation from "../hooks/FormValidation.js";

function Registration() {
  const { values, errors, handleChange, handleSubmit } = useFormValidation({
    email: "",
    password: "",
    username: "",
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>삼품명</label>
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
        />
        {/* 유효성 검사 메시지 표시 */}
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>상품 소개</label>
        <input
          type="text"
          name="decription"
          value={values.decription || ""}
          onChange={handleChange}
        />
        {/* 유효성 검사 메시지 표시 */}
        {errors.decription && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div>
        <label>판매가격</label>
        <input
          type="text"
          name="price"
          value={values.price || ""}
          onChange={handleChange}
        />
        {/* 유효성 검사 메시지 표시 */}
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <div>
        <label>태그</label>
        <input
          type="text"
          name="tag"
          value={values.tag || ""}
          onChange={handleChange}
        />
        {/* 유효성 검사 메시지 표시 */}
        {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
export default Registration;
